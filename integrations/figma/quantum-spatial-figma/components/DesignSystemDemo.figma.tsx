
import figma from '@figma/code-connect';
import { DesignSystemDemo } from '/Users/pennyplatt/Documents//Oksana/quantum-spatial/design-system/components/templates/layouts/DesignSystemDemo.tsx';

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
