/* eslint-disable prettier/prettier */
/* eslint-disable no-nested-ternary */
import { useFormikContext } from 'formik'
import Print from '@/components/atoms/Print'
import { isProdEnv } from '@/utils/environment'
import pick from '@/utils/obj/pick'

export default function Debug({ config }) {
  const formikProps = useFormikContext()
  if (isProdEnv) return null

  return (
    <Print
      data={{
        ...(config === true
          ? pick(formikProps, 'values', 'errors')
          : config === '*'
            ? formikProps
            : pick(formikProps, ...config)),
      }}
      className={'max-w-2xl overflow-x-auto'}
    />
  )
}
