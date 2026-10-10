import Image from 'next/image';
import Link from 'next/link';

interface ProjectCardProps {
  title: string;
  slug: string;
  category?: string | null;
  summary?: string | null;
  coverImagePath?: string | null;
  isFeatured?: boolean;
}

export function ProjectCard({
  title,
  slug,
  category,
  summary,
  coverImagePath,
  isFeatured,
}: ProjectCardProps) {
  const isImage = typeof coverImagePath === 'string' && /^(https?:\/\/|\/)/i.test(coverImagePath) && /\.(avif|gif|jpe?g|png|webp)(\?.*)?$/i.test(coverImagePath);
  const isDocument = Boolean(coverImagePath) && !isImage;
  return (
    <Link href={`/projects/${slug}`} className="group block">
      <div className={`card border ${isFeatured ? 'border-signal-violet/50' : 'border-ash/20'} overflow-hidden hover:border-signal-violet transition-all duration-300`}>
        {/* Cover Image */}
        {isImage ? (
          <div className="relative w-full aspect-[16/9] bg-iron">
            <Image
              src={coverImagePath}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        ) : isDocument ? (
          <div className="relative flex aspect-[16/9] items-center justify-center bg-iron px-8 text-center">
            <div>
              <p className="text-[10px] uppercase tracking-[0.16em] text-lavender-mist">Project file</p>
              <p className="mt-2 text-sm text-steel">Open the case study to view the document</p>
            </div>
          </div>
        ) : (
          <div className="relative w-full aspect-[16/9] bg-iron flex items-center justify-center">
            <svg
              className="w-16 h-16 text-ash"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          </div>
        )}

        {/* Content */}
        <div className="p-6 space-y-3">
          {/* Category & Featured badge */}
          <div className="flex items-center gap-3">
            {category && (
              <span className="text-xs uppercase tracking-wide text-steel">
                {category}
              </span>
            )}
            {isFeatured && (
              <span className="text-xs uppercase tracking-wide text-signal-violet">
                Featured
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-xl font-medium text-almost-white group-hover:text-signal-violet transition-colors duration-200">
            {title}
          </h3>

          {/* Summary */}
          {summary && (
            <p className="text-sm text-graphite line-clamp-3">{summary}</p>
          )}

          {/* Read more */}
          <div className="flex items-center gap-2 text-sm text-signal-violet">
            View Project
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
