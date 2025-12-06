
import figma from '@figma/code-connect';
import { GamesSideMenu } from '/Users/pennyplatt/Documents/9BitStudios/Oksana/quantum-spatial/design-system/components/templates/layouts/GamesSideMenu.tsx';

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
