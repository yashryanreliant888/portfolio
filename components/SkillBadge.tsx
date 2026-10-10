interface SkillBadgeProps {
  name: string;
  category: string;
  proficiency?: string | null;
}

export function SkillBadge({ name, category, proficiency }: SkillBadgeProps) {
  return (
    <div className="group card border border-ash/20 hover:border-signal-violet/50 transition-all duration-300 p-6">
      <div className="flex flex-col gap-2">
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
  );
}
