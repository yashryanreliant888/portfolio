interface SectionHeadingProps {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3';
  variant?: 'stamp' | 'display' | 'heading';
  className?: string;
}

export function SectionHeading({
  children,
  as: Tag = 'h2',
  variant = 'heading',
  className = '',
}: SectionHeadingProps) {
  const variantStyles = {
    stamp: 'section-stamp',
    display: 'display',
    heading: 'heading',
  };

  return (
    <Tag className={`${variantStyles[variant]} ${className}`}>
      {children}
    </Tag>
  );
}
