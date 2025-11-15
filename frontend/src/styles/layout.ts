export const layoutClasses = {
  container: 'container mx-auto px-4 md:px-6 lg:px-8',
  section: 'py-12 md:py-16 lg:py-24',
  page: 'min-h-[calc(100vh-12rem)]',
  fullHeight: 'min-h-screen',
  grid: {
    responsive: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
    cards: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6',
    features: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6',
    form: 'grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4',
    auto: 'grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6',
  },
  flex: {
    center: 'flex items-center justify-center',
    between: 'flex items-center justify-between',
    column: 'flex flex-col',
    columnCenter: 'flex flex-col items-center',
    wrap: 'flex flex-wrap',
    start: 'flex items-center justify-start',
    end: 'flex items-center justify-end',
    baseline: 'flex items-baseline',
    stretch: 'flex items-stretch',
    around: 'flex items-center justify-around',
    evenly: 'flex items-center justify-evenly',
  },
};

export const spacingClasses = {
  section: 'py-12 md:py-16 lg:py-24',
  component: 'mb-8 md:mb-12',
  element: 'mb-4 md:mb-6',
  tight: 'mb-2 md:mb-3',
  padding: {
    xs: 'p-2',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-12',
  },
  margin: {
    xs: 'm-2',
    sm: 'm-4',
    md: 'm-6',
    lg: 'm-8',
    xl: 'm-12',
  },
  gap: {
    xs: 'gap-2',
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-12',
  },
};

export const positionClasses = {
  relative: 'relative',
  absolute: 'absolute',
  fixed: 'fixed',
  sticky: 'sticky',
  static: 'static',
  inset: {
    0: 'inset-0',
    x: 'inset-x-0',
    y: 'inset-y-0',
  },
  top: {
    0: 'top-0',
    full: 'top-full',
  },
  z: {
    0: 'z-0',
    10: 'z-10',
    20: 'z-20',
    30: 'z-30',
    40: 'z-40',
    50: 'z-50',
  },
};

export const borderClasses = {
  rounded: {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full',
  },
  border: {
    0: 'border-0',
    1: 'border',
    2: 'border-2',
    t: 'border-t',
    b: 'border-b',
    l: 'border-l',
    r: 'border-r',
  },
};

export const responsiveClasses = {
  hide: {
    mobile: 'hidden md:block',
    tablet: 'hidden xl:block',
    desktop: 'xl:hidden',
  },
  show: {
    mobile: 'md:hidden',
    tablet: 'xl:hidden',
    desktop: 'hidden xl:block',
  },
  text: {
    responsive: 'text-sm md:text-base lg:text-lg',
    heading: 'text-2xl md:text-3xl lg:text-4xl',
    small: 'text-xs md:text-sm',
  },
  width: {
    full: 'w-full',
    auto: 'w-auto',
    fit: 'w-fit',
    screen: 'w-screen',
  },
  height: {
    full: 'h-full',
    auto: 'h-auto',
    fit: 'h-fit',
    screen: 'h-screen',
  },
};