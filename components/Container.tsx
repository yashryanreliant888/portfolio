interface ContainerProps {
  children: React.ReactNode;
  size?: 'default' | 'narrow' | 'wide';
  className?: string;
}

export function Container({ children, size = 'default', className = '' }: ContainerProps) {
  const sizeClasses = {
    narrow: 'max-w-3xl',
    default: 'max-w-page',
    wide: 'max-w-7xl',
  };

  return (
    <div className={`${sizeClasses[size]} mx-auto px-8 ${className}`}>
      {children}
    </div>
  );
}
