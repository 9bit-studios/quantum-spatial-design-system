
import figma from '@figma/code-connect';
import { index } from '/Users/pennyplatt/Documents//Oksana/quantum-spatial/design-system/components/quantum-pixels/index.ts';

// TODO: Map to Figma component
figma.connect(
  index,
  '<FIGMA_INDEX>',
  {
    props: {
      // Auto-detected: No props interface found
    },
    example: (props) => <index {...props} />
  }
);
