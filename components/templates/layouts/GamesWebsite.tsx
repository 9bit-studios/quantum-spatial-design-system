import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Unified Design System - Clean and Consolidated
const theme = {
  colors: {
    primary: '#0A0D1C',
    secondary: '#1A2332',
    tertiary: '#2A334A',
    accent: '#4FC3F7',
    accentPurple: '#AB47BC',
    accentRose: '#EC407A',
    text: '#FFFFFF',
    textSecondary: 'rgba(255, 255, 255, 0.85)',
    textTertiary: 'rgba(255, 255, 255, 0.65)',
    glass: 'rgba(255, 255, 255, 0.1)',
    glassBorder: 'rgba(255, 255, 255, 0.2)',
  },
  gradients: {
    background: 'linear-gradient(135deg, #000000 0%, #0A0A0F 25%, #0F0F14 50%, #0A0A0F 75%, #000000 100%)',
    glass: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
    accent: 'linear-gradient(135deg, #4FC3F7 0%, #29B6F6 100%)',
    purple: 'linear-gradient(135deg, #AB47BC 0%, #8E24AA 100%)',
  },
  shadows: {
    glass: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
    button: '0 4px 16px rgba(0, 0, 0, 0.2)',
    hover: '0 8px 32px rgba(0, 0, 0, 0.4)',
  },
  radius: '12px',
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '40px',
  },
};

// Main App Component with Navigation
const PetersenGamesWebsite = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navigate = (page) => setCurrentPage(page);

  const commonStyles = {
    page: {
      minHeight: '100vh',
      background: theme.gradients.background,
      color: theme.colors.text,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: isMobile ? theme.spacing.md : theme.spacing.xl,
    },
    glassCard: {
      background: theme.gradients.glass,
      borderRadius: theme.radius,
      border: `1px solid ${theme.colors.glassBorder}`,
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      boxShadow: theme.shadows.glass,
    },
    button: {
      background: theme.gradients.accent,
      border: 'none',
      borderRadius: theme.radius,
      padding: `${theme.spacing.md} ${theme.spacing.lg}`,
      color: theme.colors.text,
      fontWeight: '600',
      cursor: 'pointer',
      boxShadow: theme.shadows.button,
      transition: 'all 0.3s ease',
    },
    buttonSecondary: {
      background: theme.gradients.glass,
      border: `1px solid ${theme.colors.glassBorder}`,
      borderRadius: theme.radius,
      padding: `${theme.spacing.md} ${theme.spacing.lg}`,
      color: theme.colors.text,
      fontWeight: '600',
      cursor: 'pointer',
      boxShadow: theme.shadows.button,
      transition: 'all 0.3s ease',
    },
  };

  // Navigation Component
  const Navigation = () => (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      ...commonStyles.glassCard,
      borderRadius: 0,
      borderTop: 'none',
      borderLeft: 'none',
      borderRight: 'none',
    }}>
      <div style={{
        ...commonStyles.container,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: theme.spacing.md,
      }}>
        <div style={{
          fontSize: '24px',
          fontWeight: '700',
          background: theme.gradients.accent,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          Petersen Games
        </div>
        
        <div style={{ display: 'flex', gap: theme.spacing.md, alignItems: 'center' }}>
          {!user ? (
            <>
              <button
                onClick={() => navigate('home')}
                style={{
                  ...commonStyles.buttonSecondary,
                  padding: `${theme.spacing.sm} ${theme.spacing.md}`,
                  background: currentPage === 'home' ? theme.gradients.accent : 'transparent',
                }}
              >
                Home
              </button>
              <button
                onClick={() => navigate('login')}
                style={{
                  ...commonStyles.button,
                  padding: `${theme.spacing.sm} ${theme.spacing.md}`,
                }}
              >
                Login
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate('dashboard')}
                style={{
                  ...commonStyles.buttonSecondary,
                  padding: `${theme.spacing.sm} ${theme.spacing.md}`,
                  background: currentPage === 'dashboard' ? theme.gradients.accent : 'transparent',
                }}
              >
                Dashboard
              </button>
              <button
                onClick={() => setUser(null)}
                style={{
                  ...commonStyles.buttonSecondary,
                  padding: `${theme.spacing.sm} ${theme.spacing.md}`,
                }}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );

  // Homepage Component
  const Homepage = () => (
    <div style={commonStyles.page}>
      <div style={{ paddingTop: '80px' }}>
        <div style={commonStyles.container}>
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              ...commonStyles.glassCard,
              padding: isMobile ? theme.spacing.lg : theme.spacing.xl,
              textAlign: 'center',
              marginBottom: theme.spacing.xl,
            }}
          >
            <h1 style={{
              fontSize: isMobile ? '36px' : '48px',
              fontWeight: '800',
              marginBottom: theme.spacing.md,
              background: theme.gradients.accent,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Revolutionary Gaming Experience
            </h1>
            <p style={{
              fontSize: isMobile ? '16px' : '20px',
              color: theme.colors.textSecondary,
              marginBottom: theme.spacing.lg,
              lineHeight: 1.6,
            }}>
              Discover the future of tabletop gaming with our innovative digital platform
            </p>
            <button
              onClick={() => navigate('login')}
              style={{
                ...commonStyles.button,
                fontSize: '18px',
                padding: `${theme.spacing.md} ${theme.spacing.xl}`,
              }}
              onMouseEnter={(e) => {
                e.target.style.boxShadow = theme.shadows.hover;
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.boxShadow = theme.shadows.button;
                e.target.style.transform = 'translateY(0)';
              }}
            >
              Get Started
            </button>
          </motion.div>

          {/* Features Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: theme.spacing.lg,
            marginBottom: theme.spacing.xl,
          }}>
            {[
              { title: 'Strategic Gameplay', desc: 'Deep tactical mechanics', icon: '⚔️' },
              { title: 'Co-op Adventures', desc: 'Team up with friends', icon: '👥' },
              { title: 'Rich Storytelling', desc: 'Immersive narratives', icon: '📖' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                style={{
                  ...commonStyles.glassCard,
                  padding: theme.spacing.lg,
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '48px', marginBottom: theme.spacing.md }}>
                  {feature.icon}
                </div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  marginBottom: theme.spacing.sm,
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  color: theme.colors.textTertiary,
                  lineHeight: 1.5,
                }}>
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Products Preview */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{
              ...commonStyles.glassCard,
              padding: theme.spacing.xl,
              textAlign: 'center',
            }}
          >
            <h2 style={{
              fontSize: '32px',
              fontWeight: '700',
              marginBottom: theme.spacing.lg,
            }}>
              Featured Games
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
              gap: theme.spacing.lg,
            }}>
              {[
                { name: '8-Bit Attack', price: '$49.99', status: 'Available' },
                { name: 'Tactical Ops', price: '$59.99', status: 'Pre-order' },
              ].map((game, i) => (
                <div
                  key={i}
                  style={{
                    ...commonStyles.glassCard,
                    padding: theme.spacing.lg,
                    background: i === 0 ? theme.gradients.purple : theme.gradients.glass,
                  }}
                >
                  <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: theme.spacing.sm }}>
                    {game.name}
                  </h3>
                  <p style={{ color: theme.colors.textSecondary, marginBottom: theme.spacing.md }}>
                    {game.price}
                  </p>
                  <button
                    style={{
                      ...commonStyles.button,
                      background: i === 0 ? theme.gradients.accent : theme.gradients.purple,
                    }}
                  >
                    {game.status}
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );

  // Login Component
  const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ email: '', password: '', name: '' });

    const handleSubmit = (e) => {
      e.preventDefault();
      setUser({ name: formData.name || 'User', email: formData.email });
      navigate('dashboard');
    };

    return (
      <div style={commonStyles.page}>
        <div style={{ paddingTop: '80px', display: 'flex', alignItems: 'center', minHeight: '100vh' }}>
          <div style={commonStyles.container}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                ...commonStyles.glassCard,
                padding: theme.spacing.xl,
                maxWidth: '400px',
                margin: '0 auto',
              }}
            >
              <h2 style={{
                fontSize: '32px',
                fontWeight: '700',
                textAlign: 'center',
                marginBottom: theme.spacing.lg,
              }}>
                {isLogin ? 'Welcome Back' : 'Join Us'}
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.md }}>
                {!isLogin && (
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      ...commonStyles.glassCard,
                      padding: theme.spacing.md,
                      border: `1px solid ${theme.colors.glassBorder}`,
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: theme.colors.text,
                      fontSize: '16px',
                    }}
                  />
                )}
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    ...commonStyles.glassCard,
                    padding: theme.spacing.md,
                    border: `1px solid ${theme.colors.glassBorder}`,
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: theme.colors.text,
                    fontSize: '16px',
                  }}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  style={{
                    ...commonStyles.glassCard,
                    padding: theme.spacing.md,
                    border: `1px solid ${theme.colors.glassBorder}`,
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: theme.colors.text,
                    fontSize: '16px',
                  }}
                />
                <button
                  onClick={handleSubmit}
                  style={{
                    ...commonStyles.button,
                    marginTop: theme.spacing.md,
                    fontSize: '16px',
                  }}
                >
                  {isLogin ? 'Sign In' : 'Create Account'}
                </button>
              </div>

              <p style={{
                textAlign: 'center',
                marginTop: theme.spacing.lg,
                color: theme.colors.textTertiary,
              }}>
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: theme.colors.accent,
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    fontSize: '14px',
                  }}
                >
                  {isLogin ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    );
  };

  // Dashboard Component
  const Dashboard = () => {
    const stats = [
      { title: 'Games Owned', value: 12, color: theme.colors.accent },
      { title: 'Hours Played', value: 847, color: theme.colors.accentPurple },
      { title: 'Achievements', value: 156, color: theme.colors.accentRose },
      { title: 'Friends', value: 43, color: theme.colors.accent },
    ];

    return (
      <div style={commonStyles.page}>
        <div style={{ paddingTop: '80px' }}>
          <div style={commonStyles.container}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ marginBottom: theme.spacing.xl }}
            >
              <h1 style={{
                fontSize: isMobile ? '28px' : '36px',
                fontWeight: '700',
                marginBottom: theme.spacing.sm,
              }}>
                Welcome back, {user?.name}!
              </h1>
              <p style={{
                color: theme.colors.textSecondary,
                fontSize: '18px',
              }}>
                Your gaming dashboard
              </p>
            </motion.div>

            {/* Stats Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
              gap: theme.spacing.md,
              marginBottom: theme.spacing.xl,
            }}>
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  style={{
                    ...commonStyles.glassCard,
                    padding: theme.spacing.lg,
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '100%',
                    background: `linear-gradient(135deg, ${stat.color}20, transparent)`,
                  }} />
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{
                      fontSize: isMobile ? '24px' : '32px',
                      fontWeight: '800',
                      color: stat.color,
                      marginBottom: theme.spacing.sm,
                    }}>
                      {stat.value.toLocaleString()}
                    </div>
                    <div style={{
                      fontSize: '14px',
                      color: theme.colors.textTertiary,
                      fontWeight: '600',
                    }}>
                      {stat.title}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{
                ...commonStyles.glassCard,
                padding: theme.spacing.xl,
              }}
            >
              <h2 style={{
                fontSize: '24px',
                fontWeight: '600',
                marginBottom: theme.spacing.lg,
              }}>
                Recent Activity
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.md }}>
                {[
                  { game: '8-Bit Attack', action: 'Completed Chapter 3', time: '2 hours ago' },
                  { game: 'Tactical Ops', action: 'New high score', time: '1 day ago' },
                  { game: 'Strategy Master', action: 'Achievement unlocked', time: '3 days ago' },
                ].map((activity, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: theme.spacing.md,
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: theme.radius,
                      border: `1px solid ${theme.colors.glassBorder}`,
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: '600', marginBottom: '4px' }}>
                        {activity.game}
                      </div>
                      <div style={{ color: theme.colors.textTertiary, fontSize: '14px' }}>
                        {activity.action}
                      </div>
                    </div>
                    <div style={{ color: theme.colors.textSecondary, fontSize: '12px' }}>
                      {activity.time}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Navigation />
      <AnimatePresence mode="wait">
        {currentPage === 'home' && <Homepage key="home" />}
        {currentPage === 'login' && <LoginPage key="login" />}
        {currentPage === 'dashboard' && user && <Dashboard key="dashboard" />}
      </AnimatePresence>
    </div>
  );
};

export default PetersenGamesWebsite;