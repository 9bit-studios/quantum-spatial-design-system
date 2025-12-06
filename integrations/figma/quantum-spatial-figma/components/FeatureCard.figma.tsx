
import figma from '@figma/code-connect';
import { FeatureCard } from '/Users/pennyplatt/Documents/9BitStudios/Oksana/quantum-spatial/design-system/components/molecules/cards/FeatureCard.tsx';

// TODO: Map to Figma component
figma.connect(
  FeatureCard,
  '<FIGMA_FEATURECARD>',
  {
    props: {
      // Auto-detected: Has TypeScript props interface
    },
    example: (props) => <FeatureCard {...props} />
  }
);
