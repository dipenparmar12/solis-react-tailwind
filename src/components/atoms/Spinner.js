const variants = {
  sm: `inline-block w-2 h-2 border border-blue-400 border-solid rounded-full animate-spin`,
  md: `inline-block w-3 h-3 border-2 border-blue-400 border-solid rounded-full animate-spin`,
  lg: `inline-block w-4 h-4 border-2 border-blue-400 border-solid rounded-full animate-spin`,
  xl: `inline-block w-6 h-6 border-2 border-blue-400 border-solid rounded-full animate-spin`,
  '2xl': `inline-block w-8 h-8 border-4 border-blue-400 border-solid rounded-full animate-spin`,
}

/**
 *
 * @param {*} param0
 * @returns
 * @src https://stackoverflow.com/a/70210559/8592918
 * @src How to use variants https://gist.github.com/RobinMalfait/490a0560a7cfde985d435ad93f8094c5
 */
export default function Spinner({ variant, className }) {
  return (
    <span
      style={{ borderTopColor: 'transparent' }}
      className={`${variants[variant]} ${className}`}
    />
  )
}

export const spinnerSm = <Spinner variant={'sm'} />
export const spinnerMd = <Spinner variant={'md'} />
export const spinnerLg = <Spinner variant={'lg'} />
export const spinnerXl = <Spinner variant={'xl'} />
export const spinner2Xl = <Spinner variant={'2xl'} />

/**
<div className="flex space-x-3">
  <Spinner variant={'sm'} />
  <Spinner variant={'md'} />
  <Spinner variant={'lg'} />
  <Spinner variant={'xl'} />
  <Spinner variant={'2xl'} />
</div>
 */
