
import figma from '@figma/code-connect';
import { EnhancedDashboard } from '/Users/pennyplatt/Documents//Oksana/quantum-spatial/design-system/components/templates/layouts/EnhancedDashboard.tsx';

// TODO: Map to Figma component
figma.connect(
  EnhancedDashboard,
  '<FIGMA_ENHANCEDDASHBOARD>',
  {
    props: {
      // Auto-detected: Has TypeScript props interface
    },
    example: (props) => <EnhancedDashboard {...props} />
  }
);
