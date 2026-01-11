
import figma from '@figma/code-connect';
import { GamesSideMenu } from '/Users/pennyplatt/Documents//Oksana/quantum-spatial/design-system/components/templates/layouts/GamesSideMenu.tsx';

// TODO: Map to Figma component
figma.connect(
  GamesSideMenu,
  '<FIGMA_GAMESSIDEMENU>',
  {
    props: {
      // Auto-detected: Has TypeScript props interface
    },
    example: (props) => <GamesSideMenu {...props} />
  }
);
