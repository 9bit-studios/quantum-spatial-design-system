
import figma from '@figma/code-connect';
import { EnhancedStatCard } from '/Users/pennyplatt/Documents//Oksana/quantum-spatial/design-system/components/molecules/cards/EnhancedStatCard.tsx';

// TODO: Map to Figma component
figma.connect(
  EnhancedStatCard,
  '<FIGMA_ENHANCEDSTATCARD>',
  {
    props: {
      // Auto-detected: Has TypeScript props interface
    },
    example: (props) => <EnhancedStatCard {...props} />
  }
);
