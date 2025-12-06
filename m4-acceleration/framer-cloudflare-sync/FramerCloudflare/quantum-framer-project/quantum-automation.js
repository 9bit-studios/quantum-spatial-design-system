import { motion } from "framer-motion";

// Auto-layout generator
export function generateLayout(type, config = {}) {
  const layouts = {
    dashboard: (config) => ({
      type: 'dashboard',
      sidebar: config.sidebar !== false,
      title: config.title || 'Dashboard'
    }),
    hero: (config) => ({
      type: 'hero',
      title: config.title || 'Welcome',
      cta: config.cta || 'Get Started'
    }),
    grid: (config) => ({
      type: 'grid',
      columns: config.columns || 3,
      items: config.items || 6
    })
  };
  
  return layouts[type] ? layouts[type](config) : null;
}

// Component factory
export function createComponent(type, props = {}) {
  const components = {
    button: () => <QuantumButton {...props} />,
    card: () => <QuantumCard {...props} />,
    layout: () => {
      const layoutType = props.layoutType || 'dashboard';
      switch(layoutType) {
        case 'dashboard': return <DashboardLayout {...props} />;
        case 'hero': return <HeroLayout {...props} />;
        case 'grid': return <GridLayout {...props} />;
        default: return <DashboardLayout {...props} />;
      }
    }
  };
  
  return components[type] ? components[type]() : null;
}

// Auto-theme generator
export function generateTheme(variant = 'default') {
  const themes = {
    default: palette,
    dark: { ...palette, surface: palette.voidBlack },
    light: { ...palette, surface: '#FFFFFF', text: palette.deepSpaceIndigo }
  };
  
  return themes[variant] || themes.default;
}