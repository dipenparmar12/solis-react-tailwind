import cn from '@/utils/classNames'

const SpinnerSizes = {
  sm: 'w-3 h-3 border',
  md: 'w-4 h-4 mb-1 border-2',
  lg: 'w-5 h-5 mb-1 border-2',
  xl: 'w-5 h-5 mb-1 border-2',
  '2xl': 'w-5 h-5 mb-1 border-2',
}

/**
 *
 * @param {*} param0
 */
export default function SpinnerV2({ size = 'md', className }) {
  return (
    <div
      className={cn(
        'inline-block m-auto ml-2 align-middle rounded-full animate-spin border-gray-400 border-t-gray-500 dark:border-t-gray-600',
        SpinnerSizes[size] || size,
        className,
      )}
      style={{
        animationDuration: '.6s',
      }}
    />
  )
}

export const spinnerV2Sm = <SpinnerV2 variant={'sm'} />
export const spinnerV2Md = <SpinnerV2 variant={'md'} />
export const spinnerV2Lg = <SpinnerV2 variant={'lg'} />
export const spinnerV2Xl = <SpinnerV2 variant={'xl'} />
export const spinnerV22Xl = <SpinnerV2 variant={'2xl'} />
