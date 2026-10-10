import Image from 'next/image';

interface CertificationCardProps {
  title: string;
  issuer: string;
  category?: string | null;
  issueDate?: string | null;
  credentialUrl?: string | null;
  certificateFilePath?: string | null;
}

export function CertificationCard({
  title,
  issuer,
  category,
  issueDate,
  credentialUrl,
  certificateFilePath,
}: CertificationCardProps) {
  const formatDate = (date: string | null) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="card border border-ash/20 overflow-hidden hover:border-signal-violet/30 transition-all duration-300">
      {/* Certificate Image */}
      {certificateFilePath && (
        <div className="relative w-full aspect-[4/3] bg-iron">
          <Image
            src={certificateFilePath}
            alt={`${title} certificate`}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-medium text-almost-white mb-2">{title}</h3>
          <p className="text-base text-soft-white">{issuer}</p>
        </div>

        {/* Meta */}
        <div className="flex flex-wrap gap-4 text-sm text-steel">
          {category && (
            <span className="uppercase tracking-wide">{category}</span>
          )}
          {issueDate && (
            <span>{formatDate(issueDate)}</span>
          )}
        </div>

        {/* View Credential */}
        {credentialUrl && (
          <a
            href={credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-signal-violet hover:text-lavender-mist transition-colors duration-200"
          >
            View Credential
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
              />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
}
