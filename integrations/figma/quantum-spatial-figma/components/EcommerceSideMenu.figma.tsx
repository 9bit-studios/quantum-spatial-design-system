
import figma from '@figma/code-connect';
import { EcommerceSideMenu } from '/Users/pennyplatt/Documents//Oksana/quantum-spatial/design-system/components/templates/layouts/EcommerceSideMenu.tsx';

// TODO: Map to Figma component
figma.connect(
  EcommerceSideMenu,
  '<FIGMA_ECOMMERCESIDEMENU>',
  {
    props: {
      // Auto-detected: Has TypeScript props interface
    },
    example: (props) => <EcommerceSideMenu {...props} />
  }
);
