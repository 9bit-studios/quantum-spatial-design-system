
import figma from '@figma/code-connect';
import { AppleNavigation } from '/Users/pennyplatt/Documents//Oksana/quantum-spatial/design-system/components/organisms/headers/AppleNavigation.tsx';

// TODO: Map to Figma component
figma.connect(
  AppleNavigation,
  '<FIGMA_APPLENAVIGATION>',
  {
    props: {
      // Auto-detected: Has TypeScript props interface
    },
    example: (props) => <AppleNavigation {...props} />
  }
);
