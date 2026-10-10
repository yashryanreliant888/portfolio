'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Database } from '@/lib/database.types'
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Eye, 
  EyeOff, 
  Image as ImageIcon,
  Upload,
  Calendar,
  ArrowUp,
  ArrowDown
} from 'lucide-react'

type Gallery = Database['public']['Tables']['gallery']['Row']
type GalleryInsert = Database['public']['Tables']['gallery']['Insert']
type GalleryUpdate = Database['public']['Tables']['gallery']['Update']
const GALLERY_BUCKET = 'portfolio-media'

export default function GalleryPage() {
  const [galleries, setGalleries] = useState<Gallery[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<Gallery | null>(null)
  const [uploading, setUploading] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_path: '',
    date: '',
    is_published: true,
    display_order: 0
  })

  useEffect(() => {
    fetchGalleries()
  }, [])

  const fetchGalleries = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('display_order', { ascending: true })

      if (error) throw error
      setGalleries(data || [])
    } catch (error) {
      console.error('Error fetching galleries:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.image_path.startsWith('file://')) {
      alert('Local file paths cannot be used. Choose the file with Browse or enter a public URL.')
      return
    }
    try {
      if (editingItem) {
        const { error } = await supabase
          .from('gallery')
          .update(formData as GalleryUpdate)
          .eq('id', editingItem.id)

        if (error) throw error
      } else {
        const { error } = await supabase
          .from('gallery')
          .insert([formData as GalleryInsert])

        if (error) throw error
      }

      await fetchGalleries()
      closeModal()
    } catch (error) {
      console.error('Error saving gallery item:', error)
      alert('Failed to save gallery item')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this gallery item?')) return

    try {
      const { error } = await supabase
        .from('gallery')
        .delete()
        .eq('id', id)

      if (error) throw error
      await fetchGalleries()
    } catch (error) {
      console.error('Error deleting gallery item:', error)
      alert('Failed to delete gallery item')
    }
  }

  const togglePublished = async (item: Gallery) => {
    try {
      const { error } = await supabase
        .from('gallery')
        .update({ is_published: !item.is_published })
        .eq('id', item.id)

      if (error) throw error
      await fetchGalleries()
    } catch (error) {
      console.error('Error toggling published status:', error)
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setUploading(true)
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
      const filePath = `${fileName}`

      // Store gallery images in the configured public media bucket.
      const { error: uploadError } = await supabase.storage
        .from(GALLERY_BUCKET)
        .upload(`gallery/${filePath}`, file)

      if (uploadError) throw uploadError

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(GALLERY_BUCKET)
        .getPublicUrl(`gallery/${filePath}`)

      setFormData(prev => ({ ...prev, image_path: publicUrl }))
    } catch (error) {
      console.error('Error uploading file:', error)
      alert('Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  const updateSortOrder = async (id: string, direction: 'up' | 'down') => {
    const currentIndex = galleries.findIndex(g => g.id === id)
    if (currentIndex === -1) return
    
    const swapIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1
    if (swapIndex < 0 || swapIndex >= galleries.length) return

    const current = galleries[currentIndex]
    const swap = galleries[swapIndex]

    try {
      await Promise.all([
        supabase.from('gallery').update({ display_order: swap.display_order }).eq('id', current.id),
        supabase.from('gallery').update({ display_order: current.display_order }).eq('id', swap.id)
      ])
      await fetchGalleries()
    } catch (error) {
      console.error('Error updating sort order:', error)
    }
  }

  const openModal = (item?: Gallery) => {
    if (item) {
      setEditingItem(item)
      setFormData({
        title: item.title,
        description: item.description || '',
        image_path: item.image_path,
        date: item.date || '',
        is_published: item.is_published,
        display_order: item.display_order
      })
    } else {
      setEditingItem(null)
      setFormData({
        title: '',
        description: '',
        image_path: '',
        date: new Date().toISOString().split('T')[0],
        is_published: true,
        display_order: galleries.length
      })
    }
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingItem(null)
    setFormData({
      title: '',
      description: '',
      image_path: '',
      date: '',
      is_published: true,
      display_order: 0
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading gallery...</div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gallery Management</h1>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus size={20} />
          Add Gallery Item
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleries.map((item, index) => (
          <div key={item.id} className="overflow-hidden rounded-cards border border-ash/20 bg-iron text-almost-white">
            <div className="relative h-48 bg-gray-100">
              {item.image_path ? (
                <img
                  src={item.image_path}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <ImageIcon size={48} className="text-gray-400" />
                </div>
              )}
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={() => togglePublished(item)}
                  className={`p-2 rounded-full ${
                    item.is_published ? 'bg-green-500' : 'bg-gray-500'
                  } text-white`}
                  title={item.is_published ? 'Published' : 'Unpublished'}
                >
                  {item.is_published ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
              </div>
            </div>

            <div className="p-4">
              <h3 className="mb-2 text-lg font-bold text-almost-white">{item.title}</h3>
              {item.description && (
                <p className="mb-2 line-clamp-2 text-sm text-steel">
                  {item.description}
                </p>
              )}
              {item.date && (
                <div className="mb-3 flex items-center gap-1 text-sm text-steel">
                  <Calendar size={14} />
                  {new Date(item.date).toLocaleDateString()}
                </div>
              )}

              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <button
                    onClick={() => updateSortOrder(item.id, 'up')}
                    disabled={index === 0}
                    className="rounded p-1 text-steel hover:bg-near-black hover:text-almost-white disabled:opacity-30"
                    title="Move up"
                  >
                    <ArrowUp size={16} />
                  </button>
                  <button
                    onClick={() => updateSortOrder(item.id, 'down')}
                    disabled={index === galleries.length - 1}
                    className="rounded p-1 text-steel hover:bg-near-black hover:text-almost-white disabled:opacity-30"
                    title="Move down"
                  >
                    <ArrowDown size={16} />
                  </button>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => openModal(item)}
                    className="rounded p-2 text-steel hover:bg-near-black hover:text-almost-white"
                    title="Edit"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 hover:bg-red-50 text-red-600 rounded"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {galleries.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <ImageIcon size={48} className="mx-auto mb-4 text-gray-400" />
          <p>No gallery items yet. Add your first one!</p>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-near-black/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-cards border border-ash/30 bg-iron text-almost-white">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">
                {editingItem ? 'Edit Gallery Item' : 'Add Gallery Item'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-soft-white">Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="admin-input"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-soft-white">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="admin-input"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-soft-white">Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="admin-input"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-soft-white">Image *</label>
                  <div className="space-y-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="admin-input file:mr-3 file:rounded-buttons file:border-0 file:bg-lavender-mist file:px-3 file:py-1.5 file:text-sm file:text-near-black"
                      disabled={uploading}
                    />
                    {uploading && <p className="text-sm text-lavender-mist">Uploading...</p>}
                    {formData.image_path && !formData.image_path.startsWith('file://') && (
                      <div className="relative h-32 bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={formData.image_path}
                          alt="Preview"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                    <input
                      type="text"
                      value={formData.image_path}
                      onChange={(e) => setFormData({ ...formData, image_path: e.target.value })}
                      placeholder="Or enter image URL manually"
                      className="admin-input text-sm"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-soft-white">Sort Order</label>
                  <input
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                    className="admin-input"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="is_published"
                    checked={formData.is_published}
                    onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                    className="mr-2"
                  />
                  <label htmlFor="is_published" className="text-sm font-medium text-soft-white">
                    Published
                  </label>
                </div>

                <div className="flex gap-2 justify-end pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="rounded-buttons border border-ash/30 px-4 py-2 text-sm text-steel transition-colors hover:border-almost-white hover:text-almost-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="admin-primary"
                  >
                    {editingItem ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
