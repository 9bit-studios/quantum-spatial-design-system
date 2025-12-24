
import figma from '@figma/code-connect';
import { PetersenProductCard } from '/Users/pennyplatt/Documents//Oksana/quantum-spatial/design-system/components/molecules/PetersenProductCard.tsx';

// TODO: Map to Figma component
figma.connect(
  PetersenProductCard,
  '<FIGMA_PETERSENPRODUCTCARD>',
  {
    props: {
      // Auto-detected: Has TypeScript props interface
    },
    example: (props) => <PetersenProductCard {...props} />
  }
);
