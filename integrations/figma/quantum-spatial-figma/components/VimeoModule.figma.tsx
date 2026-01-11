
import figma from '@figma/code-connect';
import { VimeoModule } from '/Users/pennyplatt/Documents//Oksana/quantum-spatial/design-system/components/molecules/media/VimeoModule.tsx';

// TODO: Map to Figma component
figma.connect(
  VimeoModule,
  '<FIGMA_VIMEOMODULE>',
  {
    props: {
      // Auto-detected: Has TypeScript props interface
    },
    example: (props) => <VimeoModule {...props} />
  }
);
