import { supabase } from '@/lib/supabase'
import { Database } from '@/lib/database.types'
import { Calendar, Image as ImageIcon } from 'lucide-react'

type Gallery = Database['public']['Tables']['gallery']['Row']

function getGalleryDescription(value: unknown) {
  if (typeof value === 'string') return value
  if (value && typeof value === 'object' && 'description' in value && typeof value.description === 'string') return value.description
  return ''
}

async function getGalleryItems() {
  const { data, error } = await supabase
    .from('gallery')
    .select('*')
    .eq('is_published', true)
    .order('display_order', { ascending: true })

  if (error) {
    console.error('Error fetching gallery:', error)
    return []
  }

  return data
}

export default async function GalleryPage() {
  const galleryItems = await getGalleryItems()

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Gallery
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A collection of moments, memories, and visual stories
          </p>
        </div>

        {/* Gallery Grid */}
        {galleryItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Image Container */}
                <div className="relative h-64 bg-gray-100 overflow-hidden">
                  {item.image_path ? (
                    <img
                      src={item.image_path}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <ImageIcon size={48} className="text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  
                  {getGalleryDescription(item.description) && (
                    <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                      {getGalleryDescription(item.description)}
                    </p>
                  )}

                  {item.date && (
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar size={16} />
                      <time dateTime={item.date}>
                        {new Date(item.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <ImageIcon size={64} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              No Gallery Items Yet
            </h2>
            <p className="text-gray-600">
              Check back soon for visual stories and moments!
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
