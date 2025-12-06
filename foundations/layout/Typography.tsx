'use client';

import React from 'react';

// Foundation Typography System - No Inline Styles
// Uses CSS classes from globals.css

export interface TypographyProps {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  variant?: 'display' | 'headline' | 'title' | 'body' | 'caption' | 'label';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  color?: 'primary' | 'secondary' | 'tertiary' | 'accent' | 'success' | 'warning' | 'error';
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export const Typography: React.FC<TypographyProps> = ({
  children,
  as = 'p',
  variant = 'body',
  size,
  weight,
  color = 'primary',
  align = 'left',
  className = ''
}) => {
  const Component = as;

  // Variant classes based on Apple HIG standards
  const variantClasses = {
    display: 'hig-title-large',
    headline: 'hig-headline', 
    title: 'hig-title',
    body: 'hig-body',
    caption: 'hig-caption',
    label: 'hig-footnote'
  };

  // Size override classes
  const sizeClasses = size ? {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg', 
    xl: 'text-xl',
    '2xl': 'text-2xl'
  }[size] : '';

  // Weight classes
  const weightClasses = weight ? {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold'
  }[weight] : '';

  // Color classes
  const colorClasses = {
    primary: 'text-primary',
    secondary: 'text-secondary', 
    tertiary: 'text-tertiary',
    accent: 'text-link',
    success: 'text-success',
    warning: 'text-warning',
    error: 'text-error'
  };

  // Alignment classes
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  const classes = [
    variantClasses[variant],
    sizeClasses,
    weightClasses,
    colorClasses[color],
    alignClasses[align],
    className
  ].filter(Boolean).join(' ');

  return (
    <Component className={classes}>
      {children}
    </Component>
  );
};

// Specialized Typography Components
export const DisplayText: React.FC<Omit<TypographyProps, 'variant' | 'as'>> = (props) => (
  <Typography {...props} as="h1" variant="display" />
);

export const Headline: React.FC<Omit<TypographyProps, 'variant' | 'as'>> = (props) => (
  <Typography {...props} as="h2" variant="headline" />
);

export const Title: React.FC<Omit<TypographyProps, 'variant' | 'as'>> = (props) => (
  <Typography {...props} as="h3" variant="title" />
);

export const BodyText: React.FC<Omit<TypographyProps, 'variant' | 'as'>> = (props) => (
  <Typography {...props} as="p" variant="body" />
);

export const Caption: React.FC<Omit<TypographyProps, 'variant' | 'as'>> = (props) => (
  <Typography {...props} as="span" variant="caption" />
);

export const Label: React.FC<Omit<TypographyProps, 'variant' | 'as'>> = (props) => (
  <Typography {...props} as="span" variant="label" />
);

// Price Component - Special formatting for ecommerce
export interface PriceProps {
  amount: number;
  currency?: string;
  size?: 'sm' | 'md' | 'lg';
  showCurrency?: boolean;
  className?: string;
}

export const Price: React.FC<PriceProps> = ({
  amount,
  currency = 'USD',
  size = 'md',
  showCurrency = true,
  className = ''
}) => {
  const sizeClasses = {
    sm: 'text-sm font-medium',
    md: 'text-lg font-semibold', 
    lg: 'text-xl font-bold'
  };

  const formatPrice = (amount: number, currency: string) => {
    if (showCurrency) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
      }).format(amount);
    }
    return amount.toFixed(2);
  };

  return (
    <span className={`text-primary ${sizeClasses[size]} ${className}`}>
      {formatPrice(amount, currency)}
    </span>
  );
};

// Badge Component - For product tags, status, etc.
export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'sm',
  className = ''
}) => {
  const variantClasses = {
    default: 'bg-gray-800 text-gray-300 border-gray-700',
    success: 'bg-green-900 text-green-300 border-green-700',
    warning: 'bg-yellow-900 text-yellow-300 border-yellow-700',
    error: 'bg-red-900 text-red-300 border-red-700',
    info: 'bg-blue-900 text-blue-300 border-blue-700'
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm'
  };

  return (
    <span className={`inline-flex items-center rounded-full border font-medium ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}>
      {children}
    </span>
  );
};

// Link Component - Consistent link styling
export interface LinkProps {
  children: React.ReactNode;
  href?: string;
  external?: boolean;
  variant?: 'default' | 'button' | 'subtle';
  className?: string;
  onClick?: () => void;
}

export const Link: React.FC<LinkProps> = ({
  children,
  href,
  external = false,
  variant = 'default',
  className = '',
  onClick
}) => {
  const variantClasses = {
    default: 'text-link hover:text-link-hover transition-colors duration-200',
    button: 'btn-primary inline-flex',
    subtle: 'text-secondary hover:text-primary transition-colors duration-200'
  };

  const props = {
    className: `${variantClasses[variant]} ${className}`,
    onClick,
    ...(external && { target: '_blank', rel: 'noopener noreferrer' })
  };

  if (href) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button {...props}>
      {children}
    </button>
  );
};