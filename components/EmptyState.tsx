interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export function EmptyState({ title, description, icon, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
      {icon && (
        <div className="mb-6 text-ash">
          {icon}
        </div>
      )}
      <h3 className="text-xl font-medium text-soft-white mb-2">{title}</h3>
      {description && (
        <p className="text-base text-steel max-w-md mb-6">{description}</p>
      )}
      {action && (
        <div>{action}</div>
      )}
    </div>
  );
}
