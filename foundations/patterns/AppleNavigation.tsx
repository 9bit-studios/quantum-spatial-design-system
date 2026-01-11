/**
 * NAVIGATION COMPONENT
 * Apple HIG Compliant Navigation
 */

import React from 'react';

export interface NavigationProps {
  items: NavigationItem[];
  logo?: React.ReactNode;
  actions?: React.ReactNode;
  variant?: 'default' | 'transparent' | 'solid';
  sticky?: boolean;
}

export interface NavigationItem {
  label: string;
  href: string;
  active?: boolean;
  icon?: React.ReactNode;
}

export const Navigation: React.FC<NavigationProps> = ({
  items,
  logo,
  actions,
  variant = 'default',
  sticky = false,
}) => {
  return (
    <nav
      className={`navigation navigation--${variant} ${sticky ? 'navigation--sticky' : ''}`}
      style={{
        minHeight: '44px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 24px',
        backgroundColor: variant === 'transparent' ? 'transparent' : 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(10px)',
        position: sticky ? 'sticky' : 'relative',
        top: sticky ? 0 : 'auto',
        zIndex: 1000,
      }}
    >
      {logo && <div className="navigation__logo">{logo}</div>}

      <ul
        className="navigation__items"
        style={{
          display: 'flex',
          gap: '32px',
          listStyle: 'none',
          margin: 0,
          padding: 0,
          flex: 1,
        }}
      >
        {items.map((item, index) => (
          <li key={index} className="navigation__item">
            <a
              href={item.href}
              className={`navigation__link ${item.active ? 'navigation__link--active' : ''}`}
              style={{
                color: item.active ? '#007AFF' : '#FFFFFF',
                textDecoration: 'none',
                fontSize: '15px',
                fontWeight: item.active ? 600 : 400,
                transition: 'color 0.2s',
              }}
            >
              {item.icon && <span className="navigation__icon">{item.icon}</span>}
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      {actions && <div className="navigation__actions">{actions}</div>}
    </nav>
  );
};

export default Navigation;
