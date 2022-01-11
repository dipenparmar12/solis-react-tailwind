/* eslint-disable jsx-a11y/alt-text */
import { RiWalletLine } from 'react-icons/ri'
import { MdModeEditOutline } from 'react-icons/md'
import Print from '@/components/atoms/Print'
import CardV1 from '@/components/atoms/CardV1'
import ModalV3 from '@/components/molecules/Modal/ModalV3'
import TransactionForm from './TranForm'
import { useTransactionContext } from './Transactions'

export default function TransactionCard({ data }) {
  const { State: TransactionState = {}, setQry, qry } = useTransactionContext()
  return (
    <>
      <CardV1
        className={[
          'px-7 py-5',
          data?.status === 0 &&
            `bg-red-50 border border-red-400 dark:border-red-700 hover:border-red-700 `,
        ]}
      >
        <div className="relative flex justify-between text-sm ">
          <div className="flex-1 space-y-1 ">
            <h3 className="mb-2 text-xl text-sky-500">{data?.type}</h3>

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

          <div className="absolute right-1">
            <ModalV3
              renderButton={({ setOpen }) => (
                <button
                  className="hidden px-1 group-hover:inline-block"
                  onClick={setOpen}
                >
                  <span className="">
                    <MdModeEditOutline className="w-full h-full text-amber-400 hover:text-amber-600 " />
                  </span>
                </button>
              )}
            >
              <h2 className="mb-3 mr-10 "> {data?.title} </h2>
              <TransactionForm
                isEdit
                initialData={data}
                onSuccess={TransactionState?.reload}
              />
            </ModalV3>
          </div>
        </div>
      </CardV1>
    </>
  )
}
