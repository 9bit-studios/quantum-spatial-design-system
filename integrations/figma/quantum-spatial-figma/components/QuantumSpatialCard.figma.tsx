
import figma from '@figma/code-connect';
import { QuantumSpatialCard } from '/Users/pennyplatt/Documents/9BitStudios/Oksana/quantum-spatial/design-system/components/molecules/QuantumSpatialCard.tsx';

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
