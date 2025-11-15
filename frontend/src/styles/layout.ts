export const layoutClasses = {
  container: 'container mx-auto px-4 md:px-6 lg:px-8',
  section: 'py-12 md:py-16 lg:py-24',
  grid: {
    responsive: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
    cards: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6',
    features: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6',
  },
  flex: {
    center: 'flex items-center justify-center',
    between: 'flex items-center justify-between',
    column: 'flex flex-col',
    wrap: 'flex flex-wrap',
  },
};

export const spacingClasses = {
  section: 'py-12 md:py-16 lg:py-24',
  component: 'mb-8 md:mb-12',
  element: 'mb-4 md:mb-6',
  tight: 'mb-2 md:mb-3',
};

export const responsiveClasses = {
  hide: {
    mobile: 'hidden md:block',
    tablet: 'hidden lg:block',
    desktop: 'lg:hidden',
  },
  show: {
    mobile: 'md:hidden',
    tablet: 'hidden md:block lg:hidden',
    desktop: 'hidden lg:block',
  },
  text: {
    responsive: 'text-sm md:text-base lg:text-lg',
    heading: 'text-2xl md:text-3xl lg:text-4xl',
    small: 'text-xs md:text-sm',
  },
};