/**
 * SECTION COMPONENT
 * Content Section Wrapper
 */

import React from 'react';

export interface SectionProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  background?: 'transparent' | 'default' | 'accent';
}

export const Section: React.FC<SectionProps> = ({
  children,
  title,
  subtitle,
  padding = 'md',
  background = 'transparent',
}) => {
  return (
    <section className={`section section--${padding} section--${background}`}>
      {title && <h2 className="section__title">{title}</h2>}
      {subtitle && <p className="section__subtitle">{subtitle}</p>}
      <div className="section__content">{children}</div>
    </section>
  );
};

export default Section;
