
import figma from '@figma/code-connect';
import { StatCard } from '/Users/pennyplatt/Documents//Oksana/quantum-spatial/design-system/components/molecules/cards/StatCard.tsx';

// TODO: Map to Figma component
figma.connect(
  StatCard,
  '<FIGMA_STATCARD>',
  {
    props: {
      // Auto-detected: Has TypeScript props interface
    },
    example: (props) => <StatCard {...props} />
  }
);
