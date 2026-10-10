interface SkillBadgeProps {
  name: string;
  category: string;
  proficiency?: string | null;
  logoPath?: string | null;
}

export function SkillBadge({ name, category, proficiency, logoPath }: SkillBadgeProps) {
  return (
    <div className="group card border border-ash/20 hover:border-signal-violet/50 transition-all duration-300 p-6">
      <div className="flex items-start gap-4">
        {logoPath && <img src={logoPath} alt="" aria-hidden="true" className="h-10 w-10 shrink-0 rounded-buttons bg-almost-white/90 object-contain p-1.5" />}
        <div className="flex min-w-0 flex-col gap-2">
        <h3 className="text-lg font-medium text-almost-white group-hover:text-signal-violet transition-colors duration-200">
          {name}
        </h3>
        <p className="text-sm text-steel">{category}</p>
        {proficiency && (
          <span className="text-xs text-soft-white uppercase tracking-wide mt-2">
            {proficiency}
          </span>
        )}
        </div>
      </div>
    </div>
  );
}
