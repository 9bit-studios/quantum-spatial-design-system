
import figma from '@figma/code-connect';
import { GamesWebsite } from '/Users/pennyplatt/Documents//Oksana/quantum-spatial/design-system/components/templates/layouts/GamesWebsite.tsx';

// TODO: Map to Figma component
figma.connect(
  GamesWebsite,
  '<FIGMA_GAMESWEBSITE>',
  {
    props: {
      // Auto-detected: No props interface found
    },
    example: (props) => <GamesWebsite {...props} />
  }
);
