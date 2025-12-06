'use client';

import { useState, useEffect } from 'react';

// Responsive Hooks - Foundation utilities from the guide

export interface ResponsiveBreakpoints {
  mobile: number;
  tablet: number;
  desktop: number;
  large: number;
}

const DEFAULT_BREAKPOINTS: ResponsiveBreakpoints = {
  mobile: 0,
  tablet: 768,
  desktop: 1024,
  large: 1280
};

// Enhanced responsive grid hook from the guide
export const useResponsiveGrid = (breakpoints: ResponsiveBreakpoints = DEFAULT_BREAKPOINTS) => {
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop' | 'large'>('desktop');
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      
      if (width >= breakpoints.large) {
        setScreenSize('large');
      } else if (width >= breakpoints.desktop) {
        setScreenSize('desktop');
      } else if (width >= breakpoints.tablet) {
        setScreenSize('tablet');
      } else {
        setScreenSize('mobile');
      }
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, [breakpoints]);

  const isMobile = screenSize === 'mobile';
  const isTablet = screenSize === 'tablet';
  const isDesktop = screenSize === 'desktop' || screenSize === 'large';
  const isLarge = screenSize === 'large';

  // Grid configuration based on screen size
  const gridColumns = {
    mobile: '1' as const,
    tablet: '2' as const,
    desktop: 'auto' as const,
    large: 'auto' as const
  }[screenSize];

  const containerSize = {
    mobile: 'sm' as const,
    tablet: 'md' as const,
    desktop: 'lg' as const,
    large: 'xl' as const
  }[screenSize];

  const gap = {
    mobile: 'md' as const,
    tablet: 'md' as const,
    desktop: 'lg' as const,
    large: 'lg' as const
  }[screenSize];

  return {
    screenSize,
    windowWidth,
    isMobile,
    isTablet,
    isDesktop,
    isLarge,
    gridColumns,
    containerSize,
    gap
  };
};

// Touch device detection
export const useTouchDevice = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };

    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  return isTouchDevice;
};

// Viewport height detection (for mobile safari)
export const useViewportHeight = () => {
  const [viewportHeight, setViewportHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      setViewportHeight(window.innerHeight);
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    window.addEventListener('orientationchange', updateHeight);
    
    return () => {
      window.removeEventListener('resize', updateHeight);
      window.removeEventListener('orientationchange', updateHeight);
    };
  }, []);

  return viewportHeight;
};

// Prefers reduced motion detection
export const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
};