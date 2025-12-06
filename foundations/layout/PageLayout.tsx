/**
 * LAYOUT COMPONENT
 * Page Layout Wrapper
 */

import React from 'react';

export interface PageLayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  sidebar?: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children, header, footer, sidebar }) => {
  return (
    <div className="page-layout" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {header && <header>{header}</header>}
      <main style={{ flex: 1, display: 'flex' }}>
        {sidebar && <aside style={{ width: '240px' }}>{sidebar}</aside>}
        <div style={{ flex: 1 }}>{children}</div>
      </main>
      {footer && <footer>{footer}</footer>}
    </div>
  );
};

export default PageLayout;
