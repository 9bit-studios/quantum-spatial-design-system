// Dashboard Component Template
module.exports = (componentName, svgContent, options) => {
  return `import React from 'react';

export interface ${componentName}Props {
  /** Width of the dashboard */
  width?: number | string;
  /** Height of the dashboard */
  height?: number | string;
  /** Data to populate the dashboard */
  data?: any;
  /** Optional click handler */
  onClick?: (section?: string) => void;
  /** Optional hover handler */
  onSectionHover?: (section: string) => void;
  /** Additional class name */
  className?: string;
}

/**
 * ${componentName} - A dashboard component
 * 
 * This component displays a dashboard with interactive sections.
 * It can be connected to live data sources.
 */
export const ${componentName}: React.FC<${componentName}Props> = ({
  width = '100%',
  height = 'auto',
  data = {},
  onClick,
  onSectionHover,
  className = '',
}) => {
  // Handle section clicks
  const handleSectionClick = (e: React.MouseEvent<SVGElement>) => {
    if (!onClick) return;
    
    // Get the section ID from the clicked element or its parents
    const target = e.target as SVGElement;
    const section = 
      target.getAttribute('data-section') || 
      target.parentElement?.getAttribute('data-section') ||
      target.closest('[data-section]')?.getAttribute('data-section');
      
    onClick(section);
  };
  
  // Handle section hover
  const handleSectionHover = (e: React.MouseEvent<SVGElement>) => {
    if (!onSectionHover) return;
    
    // Get the section ID from the hovered element or its parents
    const target = e.target as SVGElement;
    const section = 
      target.getAttribute('data-section') || 
      target.parentElement?.getAttribute('data-section') ||
      target.closest('[data-section]')?.getAttribute('data-section');
      
    if (section) {
      onSectionHover(section);
    }
  };
  
  // Replace placeholder values with data
  const replacePlaceholders = (content: string) => {
    return content.replace(/\\{\\{([^}]+)\\}\\}/g, (match, key) => {
      const value = key.split('.').reduce((obj, k) => obj?.[k], data);
      return value !== undefined ? value : match;
    });
  };
  
  // Process SVG content to add interactivity and data
  const processedSvgContent = replacePlaceholders(${JSON.stringify(svgContent)});
  
  return (
    <div 
      className={\`quantum-dashboard-component \${className}\`}
      style={{ width, height }}
      data-component="${componentName}"
    >
      <div 
        className="dashboard-container"
        dangerouslySetInnerHTML={{ __html: processedSvgContent }}
        onClick={handleSectionClick}
        onMouseOver={handleSectionHover}
      />
    </div>
  );
};

export default ${componentName};
`};
