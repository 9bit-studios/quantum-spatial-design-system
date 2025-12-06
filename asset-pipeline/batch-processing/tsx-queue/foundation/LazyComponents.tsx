'use client';

import React, { Suspense, lazy } from 'react';
import { LoadingSkeleton } from './AnimatedComponents';

// Lazy Loading Components - Performance optimization from the guide

// Lazy load heavy components
export const LazyFilterModal = lazy(() => 
  import('./FilterModal').then(module => ({ default: module.FilterModal }))
);

export const LazyProductDetail = lazy(() => 
  import('./ProductDetail').then(module => ({ default: module.ProductDetail }))
);

export const LazyCheckoutFlow = lazy(() => 
  import('./CheckoutFlow').then(module => ({ default: module.CheckoutFlow }))
);

// Wrapper components with loading states
export interface LazyWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  type?: 'modal' | 'page' | 'section';
}

export const LazyWrapper: React.FC<LazyWrapperProps> = ({
  children,
  fallback,
  type = 'section'
}) => {
  const defaultFallback = {
    modal: <LoadingSkeleton type="card" count={1} className="w-full h-96" />,
    page: <LoadingSkeleton type="card" count={6} />,
    section: <LoadingSkeleton type="card" count={3} />
  }[type];

  return (
    <Suspense fallback={fallback || defaultFallback}>
      {children}
    </Suspense>
  );
};

// Filter Modal with Lazy Loading
export interface LazyFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: any) => void;
  initialFilters?: any;
}

export const LazyFilterModalWrapper: React.FC<LazyFilterModalProps> = (props) => {
  if (!props.isOpen) return null;

  return (
    <LazyWrapper type="modal">
      <LazyFilterModal {...props} />
    </LazyWrapper>
  );
};

// Product Detail with Lazy Loading
export interface LazyProductDetailProps {
  productId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const LazyProductDetailWrapper: React.FC<LazyProductDetailProps> = (props) => {
  if (!props.isOpen) return null;

  return (
    <LazyWrapper type="modal">
      <LazyProductDetail {...props} />
    </LazyWrapper>
  );
};

// Checkout Flow with Lazy Loading
export interface LazyCheckoutFlowProps {
  cartItems: any[];
  isOpen: boolean;
  onClose: () => void;
}

export const LazyCheckoutFlowWrapper: React.FC<LazyCheckoutFlowProps> = (props) => {
  if (!props.isOpen) return null;

  return (
    <LazyWrapper type="page">
      <LazyCheckoutFlow {...props} />
    </LazyWrapper>
  );
};

// Code splitting hook
export const useCodeSplitting = () => {
  const [loadedComponents, setLoadedComponents] = React.useState<Set<string>>(new Set());

  const preloadComponent = React.useCallback(async (componentName: string) => {
    if (loadedComponents.has(componentName)) return;

    try {
      switch (componentName) {
        case 'FilterModal':
          await import('./FilterModal');
          break;
        case 'ProductDetail':
          await import('./ProductDetail');
          break;
        case 'CheckoutFlow':
          await import('./CheckoutFlow');
          break;
      }
      
      setLoadedComponents(prev => new Set([...prev, componentName]));
    } catch (error) {
      console.warn(`Failed to preload ${componentName}:`, error);
    }
  }, [loadedComponents]);

  return { preloadComponent, loadedComponents };
};