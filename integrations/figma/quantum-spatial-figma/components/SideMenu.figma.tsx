
import figma from '@figma/code-connect';
import { PetersenGamesSideMenu } from '/Users/pennyplatt/Documents//Oksana/quantum-spatial/design-system/components/organisms/sidebars/PetersenGamesSideMenu.tsx';

// TODO: Map to Figma component
figma.connect(
  PetersenGamesSideMenu,
  '<FIGMA_PETERSENGAMESSIDEMENU>',
  {
    props: {
      // Auto-detected: Has TypeScript props interface
    },
    example: (props) => <PetersenGamesSideMenu {...props} />
  }
);
