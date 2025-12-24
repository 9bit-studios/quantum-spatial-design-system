
import figma from '@figma/code-connect';
import { GlassCard } from '/Users/pennyplatt/Documents//Oksana/quantum-spatial/design-system/components/molecules/cards/GlassCard.tsx';

// TODO: Map to Figma component
figma.connect(
  GlassCard,
  '<FIGMA_GLASSCARD>',
  {
    props: {
      // Auto-detected: Has TypeScript props interface
    },
    example: (props) => <GlassCard {...props} />
  }
);
