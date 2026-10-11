import Link from 'next/link';
import { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import GradientButton from '@/components/kokonutui/gradient-button';

type ButtonVariant = 'filled' | 'ghost' | 'violet' | 'gradient';
type ButtonSize = 'sm' | 'md' | 'lg';

interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  className?: string;
}

type ButtonAsButton = BaseButtonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps> & {
    as?: 'button';
  };

type ButtonAsLink = BaseButtonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseButtonProps> & {
    as: 'link';
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles: Record<ButtonVariant, string> = {
  filled: 'btn-filled',
  ghost: 'btn-ghost-pill',
  violet: 'bg-signal-violet text-almost-white hover:bg-signal-violet/90 rounded-buttons px-8 py-3 font-medium transition-colors duration-200',
  gradient: '',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'text-sm px-4 py-2',
  md: 'text-base px-6 py-3',
  lg: 'text-lg px-8 py-4',
};

export function Button({
  variant = 'filled',
  size = 'md',
  children,
  className = '',
  ...props
}: ButtonProps) {
  // Use Kokonut UI GradientButton for primary actions
  if (variant === 'filled' || variant === 'violet' || variant === 'gradient') {
    if (props.as === 'link') {
      const { as, href, ...linkProps } = props;
      return (
        <GradientButton
          href={href}
          size={size}
          variant="purple"
          className={className}
          {...(linkProps as any)}
        >
          {children}
        </GradientButton>
      );
    }

    const { as, ...buttonProps } = props as ButtonAsButton;
    return (
      <GradientButton
        size={size}
        variant="purple"
        className={className}
        {...(buttonProps as any)}
      >
        {children}
      </GradientButton>
    );
  }

  const baseStyles = 'inline-flex items-center justify-center font-whyte transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-signal-violet focus:ring-offset-2 focus:ring-offset-near-black';
  const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (props.as === 'link') {
    const { as, ...linkProps } = props;
    return (
      <Link {...linkProps} className={classes}>
        {children}
      </Link>
    );
  }

  const { as, ...buttonProps } = props as ButtonAsButton;
  return (
    <button {...buttonProps} className={classes}>
      {children}
    </button>
  );
}
