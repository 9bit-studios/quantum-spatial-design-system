
import figma from '@figma/code-connect';
import { DesignSystemDemo } from '/Users/pennyplatt/Documents/9BitStudios/Oksana/quantum-spatial/design-system/components/templates/layouts/DesignSystemDemo.tsx';

// TODO: Map to Figma component
figma.connect(
  DesignSystemDemo,
  '<FIGMA_DESIGNSYSTEMDEMO>',
  {
    props: {
      // Auto-detected: No props interface found
    },
    example: (props) => <DesignSystemDemo {...props} />
  }
);
