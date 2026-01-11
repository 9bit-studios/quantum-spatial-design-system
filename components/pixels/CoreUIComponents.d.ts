/**
 * Core UI Components
 * Extracted from DesignSystemDemo.tsx
 *
 * Pre-built, reusable components that use the design system.
 */
import React from 'react';
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
    children: React.ReactNode;
    disabled?: boolean;
}
export declare const Button: React.FC<ButtonProps>;
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'elevated';
    children: React.ReactNode;
}
export declare const Card: React.FC<CardProps>;
export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}
export declare const Container: React.FC<ContainerProps>;
export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
    columns?: string;
    children: React.ReactNode;
}
export declare const Grid: React.FC<GridProps>;
export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
    direction?: 'row' | 'column';
    align?: 'center' | 'flex-start' | 'flex-end' | 'stretch';
    justify?: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around';
    children: React.ReactNode;
}
export declare const Flex: React.FC<FlexProps>;
//# sourceMappingURL=CoreUIComponents.d.ts.map