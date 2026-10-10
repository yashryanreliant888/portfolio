interface ExperienceCardProps {
  organization: string;
  role: string;
  employmentType?: string | null;
  durationLabel?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  description?: string | null;
}

export function ExperienceCard({
  organization,
  role,
  employmentType,
  durationLabel,
  startDate,
  endDate,
  description,
}: ExperienceCardProps) {
  const formatDate = (date: string | null | undefined) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });
  };

  const dateRange = startDate || endDate
    ? `${formatDate(startDate) || 'Present'} - ${formatDate(endDate) || 'Present'}`
    : durationLabel;

  return (
    <div className="card border border-ash/20 p-8 hover:border-signal-violet/30 transition-all duration-300">
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div>
          <h3 className="text-2xl font-medium text-almost-white mb-2">{organization}</h3>
          <p className="text-lg text-soft-white">{role}</p>
        </div>

        {/* Meta */}
        <div className="flex flex-wrap gap-4 text-sm text-steel">
          {employmentType && (
            <span className="uppercase tracking-wide">{employmentType}</span>
          )}
          {dateRange && (
            <span>
              {dateRange}
            </span>
          )}
        </div>

        {/* Description */}
        {description && (
          <p className="text-base text-graphite leading-relaxed">{description}</p>
        )}
      </div>
    </div>
  );
}
