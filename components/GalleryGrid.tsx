'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Heart,
  MessageCircle,
  Bookmark,
  Send,
  Grid,
  Film,
  Tag,
  MoreHorizontal,
  X,
  ExternalLink,
  CheckCircle2,
  Smile,
  Compass,
  MapPin,
} from 'lucide-react';
import type { Database } from '@/lib/database.types';

export type DbGalleryItem = Database['public']['Tables']['gallery']['Row'];

export interface GalleryItem {
  id: string;
  title: string;
  description: string | null;
  image_path: string;
  date: string | null;
  display_order?: number;
  is_published?: boolean;
  category?: 'field-notes' | 'campaigns' | 'archive';
  likes_count?: number;
  comments_count?: number;
  location?: string;
}

export interface ProfileInfo {
  full_name?: string | null;
  headline?: string | null;
  profile_image_path?: string | null;
  instagram_url?: string | null;
  location?: string | null;
  biography?: string | null;
}

interface GalleryGridProps {
  items: DbGalleryItem[];
  profile?: ProfileInfo | null;
}

const CURATED_ARCHIVE: GalleryItem[] = [
  {
    id: 'post-curated-1',
    title: 'Marketing Automation Engine',
    description: 'Workflow design and automated campaign architecture. Optimizing conversion cycles with predictive triggers and organic SEO foundations.',
    image_path: '/Projects/posters/AUTOMATION.png',
    date: '2026-08-14',
    category: 'campaigns',
    likes_count: 184,
    comments_count: 12,
    location: 'Digital Lab',
  },
  {
    id: 'post-curated-2',
    title: 'Campaign Architecture Blueprint',
    description: 'Omnichannel performance marketing blueprint. Aligning organic visibility with multi-tier paid acquisition funnels.',
    image_path: '/Projects/posters/Final.png',
    date: '2026-07-22',
    category: 'campaigns',
    likes_count: 312,
    comments_count: 27,
    location: 'Campaign HQ',
  },
  {
    id: 'post-curated-3',
    title: 'Kashi Art & Cultural Narrative',
    description: 'Atmospheric framing, cultural visual cues, and heritage branding studies in historic Fort Kochi.',
    image_path: '/Projects/posters/KASHI.png',
    date: '2026-06-30',
    category: 'field-notes',
    likes_count: 421,
    comments_count: 38,
    location: 'Fort Kochi',
  },
  {
    id: 'post-curated-4',
    title: 'Audience Referral & Growth Loops',
    description: 'Referral incentive design, social proof loops, and community-driven acquisition strategy.',
    image_path: '/Projects/posters/Refer a friend.png',
    date: '2026-05-18',
    category: 'campaigns',
    likes_count: 165,
    comments_count: 14,
    location: 'Performance Lab',
  },
  {
    id: 'post-curated-5',
    title: 'Field Studies & Visual Artifacts',
    description: 'Observational notes on customer engagement, brand typography, and physical-to-digital conversions.',
    image_path: '/Gallery/gallery1.jpg',
    date: '2026-04-12',
    category: 'archive',
    likes_count: 289,
    comments_count: 22,
    location: 'Kerala, India',
  },
  {
    id: 'post-curated-6',
    title: 'Students Day Creative Outreach',
    description: 'Vibrant youth engagement vector, social storytelling, and high-conversion visual design.',
    image_path: '/Projects/posters/Students Day.jpg',
    date: '2026-03-25',
    category: 'campaigns',
    likes_count: 198,
    comments_count: 16,
    location: 'Campus Network',
  },
  {
    id: 'post-curated-7',
    title: 'Brand Sentiment & Reputation Audit',
    description: 'Aggregating client reviews, trust signals, and conversion metrics into structured growth assets.',
    image_path: '/Projects/posters/REVIEW.jpg',
    date: '2026-02-19',
    category: 'archive',
    likes_count: 142,
    comments_count: 9,
    location: 'Analytics Suite',
  },
  {
    id: 'post-curated-8',
    title: 'Seamless Social Connect',
    description: 'Interactive QR-assisted offline to digital bridges for events and live lead generation.',
    image_path: '/Projects/posters/Insta QR.jpg',
    date: '2026-01-10',
    category: 'archive',
    likes_count: 275,
    comments_count: 31,
    location: 'Social Gateway',
  },
];

const STORY_HIGHLIGHTS = [
  { id: 'h1', title: 'Eth Kochi', icon: '📍', category: 'field-notes' },
  { id: 'h2', title: 'Campaigns', icon: '🎯', category: 'campaigns' },
  { id: 'h3', title: 'SEO Systems', icon: '⚡', category: 'campaigns' },
  { id: 'h4', title: 'Analytics', icon: '📊', category: 'archive' },
  { id: 'h5', title: 'Creative', icon: '🎨', category: 'field-notes' },
];

export function GalleryGrid({ items, profile }: GalleryGridProps) {
  // Merge DB items with curated archive ensuring no duplicates
  const allPosts: GalleryItem[] = React.useMemo(() => {
    const dbPosts: GalleryItem[] = items.map((item, idx) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      image_path: item.image_path,
      date: item.date,
      display_order: item.display_order,
      is_published: item.is_published,
      category: idx % 2 === 0 ? 'field-notes' : 'campaigns',
      likes_count: 210 + (idx * 37),
      comments_count: 18 + (idx * 4),
      location: 'Kochi, Kerala',
    }));

    // Filter curated posts so total looks like a real 9+ grid
    const existingPaths = new Set(dbPosts.map((p) => p.image_path));
    const uniqueCurated = CURATED_ARCHIVE.filter((p) => !existingPaths.has(p.image_path));

    return [...dbPosts, ...uniqueCurated];
  }, [items]);

  const [activeTab, setActiveTab] = useState<'all' | 'campaigns' | 'archive'>('all');
  const [selectedPost, setSelectedPost] = useState<GalleryItem | null>(null);
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [savedPosts, setSavedPosts] = useState<Record<string, boolean>>({});
  const [postComments, setPostComments] = useState<Record<string, string[]>>({});
  const [commentInput, setCommentInput] = useState('');

  // Filter posts based on active tab
  const filteredPosts = React.useMemo(() => {
    if (activeTab === 'campaigns') {
      return allPosts.filter((p) => p.category === 'campaigns');
    }
    if (activeTab === 'archive') {
      return allPosts.filter((p) => p.category === 'archive' || savedPosts[p.id]);
    }
    return allPosts;
  }, [allPosts, activeTab, savedPosts]);

  // Modal ESC handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedPost(null);
    };
    if (selectedPost) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedPost]);

  const toggleLike = (postId: string) => {
    setLikedPosts((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const toggleSave = (postId: string) => {
    setSavedPosts((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim() || !selectedPost) return;
    const postId = selectedPost.id;
    setPostComments((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), commentInput.trim()],
    }));
    setCommentInput('');
  };

  const avatarSrc = profile?.profile_image_path || '/main-pic.png';
  const fullName = profile?.full_name || 'Yash Ryan Reliant';
  const instagramUrl = profile?.instagram_url || 'https://instagram.com';

  return (
    <div className="mx-auto max-w-4xl px-2 sm:px-6">
      {/* ── INSTAGRAM PROFILE HEADER ── */}
      <header className="border-b border-white/10 pb-10 pt-4">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-12">
          {/* Avatar with Animated Story Gradient Ring */}
          <div className="relative shrink-0">
            <div className="relative rounded-full p-[3px] bg-gradient-to-tr from-[#af50ff] via-[#d946ef] to-[#f43f5e] shadow-[0_0_25px_rgba(175,80,255,0.4)]">
              <div className="h-24 w-24 sm:h-36 sm:w-36 rounded-full overflow-hidden bg-[#090909] p-[2px]">
                <img
                  src={avatarSrc}
                  alt={fullName}
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
            </div>
            {/* Live Story Badge */}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full bg-[#af50ff] px-2 py-0.5 text-[9px] font-whyte-mono uppercase tracking-wider text-white border border-[#090909]">
              LIVE
            </div>
          </div>

          {/* Profile Meta & Actions */}
          <div className="flex-1 text-center sm:text-left">
            {/* Username & Action Buttons */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4">
              <div className="flex items-center gap-1.5">
                <h1 className="text-xl sm:text-2xl font-whyte font-semibold text-almost-white tracking-[-0.02em]">
                  yashryan.reliant
                </h1>
                <CheckCircle2 size={18} className="text-[#af50ff] fill-[#af50ff]/20" />
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href="/contact"
                  className="rounded-lg bg-white/[0.1] px-4 py-1.5 text-xs font-whyte font-medium text-almost-white border border-white/15 hover:bg-white/[0.18] transition-colors"
                >
                  Message
                </Link>
                <Link
                  href="/projects"
                  className="rounded-lg bg-signal-violet px-4 py-1.5 text-xs font-whyte font-medium text-almost-white hover:bg-[#c275ff] transition-colors shadow-[0_0_15px_rgba(175,80,255,0.3)]"
                >
                  Work ↗
                </Link>
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-white/[0.06] p-1.5 text-steel border border-white/15 hover:text-almost-white hover:bg-white/[0.12] transition-colors"
                  aria-label="Open Instagram"
                >
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>

            {/* Counts Row */}
            <div className="mt-5 flex items-center justify-center sm:justify-start gap-7 text-sm font-whyte">
              <div>
                <span className="font-semibold text-almost-white">{allPosts.length}</span>{' '}
                <span className="text-steel">posts</span>
              </div>
              <div>
                <span className="font-semibold text-almost-white">1.8k</span>{' '}
                <span className="text-steel">signals</span>
              </div>
              <div>
                <span className="font-semibold text-almost-white">SEO · PAID</span>{' '}
                <span className="text-steel">focus</span>
              </div>
            </div>

            {/* Bio Details */}
            <div className="mt-4 text-xs sm:text-sm font-whyte leading-relaxed text-soft-white space-y-1">
              <p className="font-semibold text-almost-white">{fullName}</p>
              <p className="text-steel text-xs font-whyte-mono uppercase tracking-wider">
                Digital Creator · Marketing & Search Architecture
              </p>
              <p className="text-almost-white/90">
                Turning audience insight into clear, measurable growth. SEO · Performance · Content.
              </p>
              <div className="flex items-center justify-center sm:justify-start gap-1 pt-1 text-xs text-lavender-mist">
                <MapPin size={12} className="text-[#af50ff]" />
                <span>Kerala, India & Global</span>
              </div>
            </div>
          </div>
        </div>

        {/* Story Highlights Bar */}
        <div className="mt-8 flex items-center justify-start sm:justify-start gap-4 sm:gap-6 overflow-x-auto pb-2 scrollbar-none">
          {STORY_HIGHLIGHTS.map((h) => (
            <button
              key={h.id}
              onClick={() => {
                if (h.category === 'campaigns') setActiveTab('campaigns');
                else if (h.category === 'archive') setActiveTab('archive');
                else setActiveTab('all');
              }}
              className="group flex flex-col items-center gap-1.5 shrink-0 focus:outline-none"
            >
              <div className="rounded-full p-[2px] border border-white/20 group-hover:border-[#af50ff] transition-colors">
                <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-[#14141a] text-xl transition-transform group-hover:scale-105">
                  {h.icon}
                </div>
              </div>
              <span className="text-[11px] font-whyte text-steel group-hover:text-almost-white transition-colors">
                {h.title}
              </span>
            </button>
          ))}
        </div>
      </header>

      {/* ── INSTAGRAM TAB SWITCHER ── */}
      <nav className="flex items-center justify-center gap-10 sm:gap-16 border-b border-white/10 text-xs font-whyte font-semibold uppercase tracking-[0.12em]">
        <button
          onClick={() => setActiveTab('all')}
          className={`flex items-center gap-2 py-3 border-t-2 transition-all ${
            activeTab === 'all'
              ? 'border-almost-white text-almost-white'
              : 'border-transparent text-steel hover:text-soft-white'
          }`}
        >
          <Grid size={13} />
          <span>Posts</span>
        </button>
        <button
          onClick={() => setActiveTab('campaigns')}
          className={`flex items-center gap-2 py-3 border-t-2 transition-all ${
            activeTab === 'campaigns'
              ? 'border-almost-white text-almost-white'
              : 'border-transparent text-steel hover:text-soft-white'
          }`}
        >
          <Film size={13} />
          <span>Campaigns</span>
        </button>
        <button
          onClick={() => setActiveTab('archive')}
          className={`flex items-center gap-2 py-3 border-t-2 transition-all ${
            activeTab === 'archive'
              ? 'border-almost-white text-almost-white'
              : 'border-transparent text-steel hover:text-soft-white'
          }`}
        >
          <Tag size={13} />
          <span>Archive</span>
        </button>
      </nav>

      {/* ── INSTAGRAM 3-COLUMN SQUARE GRID ── */}
      <main className="mt-4 pb-20">
        <div className="grid grid-cols-3 gap-1 sm:gap-4 md:gap-6">
          {filteredPosts.map((post) => {
            const isLiked = likedPosts[post.id];
            const likesCount = (post.likes_count || 140) + (isLiked ? 1 : 0);
            const commentsCount = (post.comments_count || 12) + (postComments[post.id]?.length || 0);

            return (
              <div
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="group relative aspect-square overflow-hidden cursor-pointer bg-[#121217] rounded-sm sm:rounded-md border border-white/5 transition-all"
              >
                {/* Main Image */}
                <img
                  src={post.image_path}
                  alt={post.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />

                {/* Multiple/Carousel Indicator icon on top right */}
                {post.category === 'campaigns' && (
                  <div className="absolute top-2 right-2 rounded bg-black/60 p-1 text-white backdrop-blur-sm opacity-90">
                    <Film size={12} />
                  </div>
                )}

                {/* Hover Overlay with Likes and Comments */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] opacity-0 transition-opacity duration-200 group-hover:opacity-100 flex flex-col items-center justify-center gap-3 text-white px-2 text-center">
                  <div className="flex items-center gap-5 sm:gap-7 text-xs sm:text-base font-semibold font-whyte">
                    <span className="flex items-center gap-1.5">
                      <Heart size={16} className={isLiked ? 'fill-[#f43f5e] text-[#f43f5e]' : 'fill-white'} />
                      <span>{likesCount}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MessageCircle size={16} className="fill-white" />
                      <span>{commentsCount}</span>
                    </span>
                  </div>
                  <p className="line-clamp-2 text-[11px] sm:text-xs text-soft-white/80 font-whyte max-w-[85%] hidden sm:block">
                    {post.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* ── INSTAGRAM POST MODAL / LIGHTBOX ── */}
      {selectedPost && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={selectedPost.title}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-[#090909]/92 backdrop-blur-md"
            onClick={() => setSelectedPost(null)}
          />

          {/* Modal Card: Instagram Split Pane */}
          <div className="relative z-10 flex flex-col md:flex-row w-full max-w-4xl max-h-[92vh] overflow-hidden rounded-xl border border-white/15 bg-[#0e0e12] shadow-2xl">
            {/* Close Button top right on mobile */}
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-3 right-3 z-20 md:hidden flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white"
              aria-label="Close"
            >
              <X size={16} />
            </button>

            {/* Left Pane: Large Image Preview */}
            <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[300px] md:min-h-[520px]">
              <img
                src={selectedPost.image_path}
                alt={selectedPost.title}
                className="max-h-[70vh] md:max-h-[580px] w-auto max-w-full object-contain select-none"
              />
            </div>

            {/* Right Pane: Instagram Comments & Details Sidebar */}
            <div className="w-full md:w-[380px] flex flex-col border-t md:border-t-0 md:border-l border-white/10 bg-[#0e0e12]">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full overflow-hidden border border-[#af50ff]/60 shrink-0">
                    <img src={avatarSrc} alt={fullName} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-whyte font-semibold text-xs text-almost-white">
                        yashryan.reliant
                      </span>
                      <CheckCircle2 size={13} className="text-[#af50ff]" />
                    </div>
                    <span className="text-[10px] font-whyte text-steel block">
                      {selectedPost.location || 'Kochi, Kerala'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="hidden md:flex h-8 w-8 items-center justify-center rounded-lg text-steel hover:text-almost-white transition-colors"
                    aria-label="Close"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Scrollable Caption & Comments Body */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs font-whyte leading-relaxed max-h-[240px] md:max-h-none">
                {/* Author Caption */}
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full overflow-hidden shrink-0 mt-0.5">
                    <img src={avatarSrc} alt={fullName} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-soft-white">
                      <strong className="text-almost-white font-semibold mr-1.5">yashryan.reliant</strong>
                      {selectedPost.description || selectedPost.title}
                    </p>
                    <p className="mt-2 text-[#af50ff] text-[11px] font-whyte-mono">
                      #digitalmarketing #seo #performance #campaigns #kerala
                    </p>
                    {selectedPost.date && (
                      <time className="mt-2 block text-[10px] uppercase tracking-wider text-ash font-whyte-mono">
                        {new Date(selectedPost.date).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </time>
                    )}
                  </div>
                </div>

                {/* User added comments */}
                {(postComments[selectedPost.id] || []).map((cmt, cIdx) => (
                  <div key={cIdx} className="flex items-start gap-3 pt-2">
                    <div className="h-7 w-7 rounded-full bg-white/10 flex items-center justify-center text-[10px] text-white shrink-0">
                      U
                    </div>
                    <div className="flex-1">
                      <p className="text-soft-white">
                        <strong className="text-almost-white font-semibold mr-1.5">visitor</strong>
                        {cmt}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons Bar */}
              <div className="border-t border-white/10 p-3 shrink-0">
                <div className="flex items-center justify-between text-almost-white">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => toggleLike(selectedPost.id)}
                      className="transition-transform active:scale-125 focus:outline-none"
                      aria-label="Like post"
                    >
                      <Heart
                        size={22}
                        className={
                          likedPosts[selectedPost.id]
                            ? 'fill-[#f43f5e] text-[#f43f5e]'
                            : 'hover:text-steel'
                        }
                      />
                    </button>
                    <button
                      onClick={() => {
                        const input = document.getElementById('insta-comment-input');
                        input?.focus();
                      }}
                      className="hover:text-steel transition-colors"
                      aria-label="Comment"
                    >
                      <MessageCircle size={22} />
                    </button>
                    <button
                      onClick={() => {
                        if (navigator.share) {
                          void navigator.share({
                            title: selectedPost.title,
                            url: window.location.href,
                          });
                        }
                      }}
                      className="hover:text-steel transition-colors"
                      aria-label="Share"
                    >
                      <Send size={20} />
                    </button>
                  </div>
                  <button
                    onClick={() => toggleSave(selectedPost.id)}
                    className="transition-colors hover:text-steel focus:outline-none"
                    aria-label="Save post"
                  >
                    <Bookmark
                      size={22}
                      className={savedPosts[selectedPost.id] ? 'fill-white text-white' : ''}
                    />
                  </button>
                </div>

                {/* Likes count text */}
                <div className="mt-2 text-xs font-semibold font-whyte text-almost-white">
                  {((selectedPost.likes_count || 140) + (likedPosts[selectedPost.id] ? 1 : 0)).toLocaleString()}{' '}
                  likes
                </div>
              </div>

              {/* Add Comment Input Form */}
              <form onSubmit={handleAddComment} className="flex items-center border-t border-white/10 px-3 py-2 shrink-0">
                <Smile size={18} className="text-steel mr-2" />
                <input
                  id="insta-comment-input"
                  type="text"
                  placeholder="Add a comment..."
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  className="flex-1 bg-transparent text-xs text-almost-white placeholder:text-ash focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!commentInput.trim()}
                  className="text-xs font-semibold text-[#af50ff] disabled:opacity-40 disabled:cursor-not-allowed ml-2"
                >
                  Post
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
