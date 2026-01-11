/**
 * RUNSMART THEME
 * Professional running coaching interface
 */

export const runsmartTheme = {
  name: 'runsmart',

  colors: {
    primary: '#2563EB',      // Professional blue
    secondary: '#10B981',    // Running green
    accent: '#F59E0B',       // Achievement gold

    background: {
      primary: '#F9FAFB',
      secondary: '#F3F4F6',
      elevated: '#FFFFFF',
    },

    performance: {
      excellent: '#10B981',
      good: '#3B82F6',
      average: '#F59E0B',
      needsWork: '#EF4444',
    },

    metrics: {
      pace: '#2563EB',
      heartRate: '#EF4444',
      distance: '#10B981',
      cadence: '#8B5CF6',
    },
  },

  typography: {
    headings: { family: 'SF Pro Display', weight: 700 },
    body: { family: 'SF Pro Text', weight: 400 },
    metrics: { family: 'SF Mono', weight: 600 },
  },
};

export default runsmartTheme;
