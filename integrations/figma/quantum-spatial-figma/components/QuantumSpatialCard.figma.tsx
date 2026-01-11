
import figma from '@figma/code-connect';
import { QuantumSpatialCard } from '/Users/pennyplatt/Documents//Oksana/quantum-spatial/design-system/components/molecules/QuantumSpatialCard.tsx';

// TODO: Map to Figma component
figma.connect(
  QuantumSpatialCard,
  '<FIGMA_QUANTUMSPATIALCARD>',
  {
    props: {
      // Auto-detected: Has TypeScript props interface
    },
    example: (props) => <QuantumSpatialCard {...props} />
  }
);
