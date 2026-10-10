interface EducationCardProps {
  qualification: string;
  institution: string;
  fieldOfStudy?: string | null;
  studyStart?: string | null;
  studyEnd?: string | null;
  grade?: string | null;
  description?: string | null;
}

export function EducationCard({
  qualification,
  institution,
  fieldOfStudy,
  studyStart,
  studyEnd,
  grade,
  description,
}: EducationCardProps) {
  const formatDate = (date: string | null) => {
    if (!date) return null;
    return new Date(date).getFullYear();
  };

  const dateRange = studyStart || studyEnd
    ? `${formatDate(studyStart) || ''} - ${formatDate(studyEnd) || 'Present'}`
    : null;

  return (
    <div className="card border border-ash/20 p-8 hover:border-signal-violet/30 transition-all duration-300">
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div>
          <h3 className="text-2xl font-medium text-almost-white mb-2">{qualification}</h3>
          <p className="text-lg text-soft-white">{institution}</p>
        </div>

        {/* Meta */}
        <div className="flex flex-wrap gap-4 text-sm text-steel">
          {fieldOfStudy && (
            <span>{fieldOfStudy}</span>
          )}
          {dateRange && (
            <span>{dateRange}</span>
          )}
          {grade && (
            <span>Grade: {grade}</span>
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
