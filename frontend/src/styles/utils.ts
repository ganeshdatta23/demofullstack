import { cn } from '@/lib/utils';
import { layoutClasses, spacingClasses, responsiveClasses, positionClasses, borderClasses } from './layout';

// Utility functions for common layout patterns
export const flex = {
  center: (className?: string) => cn(layoutClasses.flex.center, className),
  between: (className?: string) => cn(layoutClasses.flex.between, className),
  column: (className?: string) => cn(layoutClasses.flex.column, className),
  columnCenter: (className?: string) => cn(layoutClasses.flex.columnCenter, className),
  wrap: (className?: string) => cn(layoutClasses.flex.wrap, className),
  start: (className?: string) => cn(layoutClasses.flex.start, className),
  end: (className?: string) => cn(layoutClasses.flex.end, className),
  around: (className?: string) => cn(layoutClasses.flex.around, className),
  evenly: (className?: string) => cn(layoutClasses.flex.evenly, className),
};

export const grid = {
  responsive: (className?: string) => cn(layoutClasses.grid.responsive, className),
  cards: (className?: string) => cn(layoutClasses.grid.cards, className),
  features: (className?: string) => cn(layoutClasses.grid.features, className),
  form: (className?: string) => cn(layoutClasses.grid.form, className),
  auto: (className?: string) => cn(layoutClasses.grid.auto, className),
};

export const spacing = {
  padding: {
    xs: (className?: string) => cn(spacingClasses.padding.xs, className),
    sm: (className?: string) => cn(spacingClasses.padding.sm, className),
    md: (className?: string) => cn(spacingClasses.padding.md, className),
    lg: (className?: string) => cn(spacingClasses.padding.lg, className),
    xl: (className?: string) => cn(spacingClasses.padding.xl, className),
  },
  gap: {
    xs: (className?: string) => cn(spacingClasses.gap.xs, className),
    sm: (className?: string) => cn(spacingClasses.gap.sm, className),
    md: (className?: string) => cn(spacingClasses.gap.md, className),
    lg: (className?: string) => cn(spacingClasses.gap.lg, className),
    xl: (className?: string) => cn(spacingClasses.gap.xl, className),
  },
};

export const position = {
  relative: (className?: string) => cn(positionClasses.relative, className),
  absolute: (className?: string) => cn(positionClasses.absolute, className),
  fixed: (className?: string) => cn(positionClasses.fixed, className),
  sticky: (className?: string) => cn(positionClasses.sticky, className),
};

export const border = {
  rounded: {
    sm: (className?: string) => cn(borderClasses.rounded.sm, className),
    md: (className?: string) => cn(borderClasses.rounded.md, className),
    lg: (className?: string) => cn(borderClasses.rounded.lg, className),
    xl: (className?: string) => cn(borderClasses.rounded.xl, className),
    full: (className?: string) => cn(borderClasses.rounded.full, className),
  },
};

export const container = (className?: string) => cn(layoutClasses.container, className);
export const section = (className?: string) => cn(layoutClasses.section, className);
export const page = (className?: string) => cn(layoutClasses.page, className);
export const fullHeight = (className?: string) => cn(layoutClasses.fullHeight, className);