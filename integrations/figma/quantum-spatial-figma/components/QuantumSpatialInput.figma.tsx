
import figma from '@figma/code-connect';
import { QuantumSpatialInput } from '/Users/pennyplatt/Documents//Oksana/quantum-spatial/design-system/components/molecules/QuantumSpatialInput.tsx';

// TODO: Map to Figma component
figma.connect(
  QuantumSpatialInput,
  '<FIGMA_QUANTUMSPATIALINPUT>',
  {
    props: {
      // Auto-detected: Has TypeScript props interface
    },
    example: (props) => <QuantumSpatialInput {...props} />
  }
);
