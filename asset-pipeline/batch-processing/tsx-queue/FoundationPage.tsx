// Your foundation component:
import { unifiedDesignTokens } from './UnifiedDesignSystem';
import { Container, Grid, PageLayout } from './foundation';

const MyFoundationPage = () => (
  <PageLayout>
    <Container>
      <Grid columns={12}>
        <div style={{
          // Use unified tokens for styling
          color: unifiedDesignTokens.colors.label,
          padding: unifiedDesignTokens.spacing.large,
          background: unifiedDesignTokens.gradients.primaryGlass,
          // Foundation handles layout + responsive
        }}>
          Content
        </div>
      </Grid>
    </Container>
  </PageLayout>
);