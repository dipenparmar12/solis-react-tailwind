/* eslint-disable jsx-a11y/alt-text */
import { RiWalletLine } from 'react-icons/ri'
import classNames from 'classnames'
import Print from '@/components/atoms/Print'
import CardV1 from '@/components/atoms/CardV1'

export default function TransactionCard({ data }) {
  return (
    <>
      <CardV1
        className={[
          'px-7 py-5',
          data?.status === 0 &&
            `bg-red-50 border border-red-400 dark:border-red-700 hover:border-red-700 `,
        ]}
      >
        <div className="flex justify-between text-sm y-2">
          <div className="space-y-1">
            <h3 className="mb-2 text-xl text-sky-500">{data?.label}</h3>

            <div className="text-gray-700 dark:text-gray-400">
              <span className="text-gray-500">ID:</span> {data?.id}
            </div>
            <div className="text-gray-700 dark:text-gray-400">
              <span className="text-gray-500">Status:</span>{' '}
              {data?.status === 1 ? 'Active' : 'Inactive'}
            </div>
            <div className="text-gray-700 dark:text-gray-400">
              <span className="text-gray-500">Desc:</span> {data?.desc}
            </div>
          </div>

          <div className="w-20 mr-3 rounded-full ">
            {data?.pic ? (
              <img
                src={data?.pic}
                className="w-full h-full border rounded-full"
              />
            ) : (
              <RiWalletLine className="w-full h-full text-gray-300 dark:text-gray-700" />
            )}
          </div>
        </div>
      </CardV1>
    </>
  )
}
