/* eslint-disable react/no-array-index-key */
import React from 'react'
import { RiFilter3Line, RiCloseLine } from 'react-icons/ri'
import ErrorState from '@/components/atoms/ErrorState'
import ModalV3 from '@/components/molecules/Modal/ModalV3'
import Button from '@/components/atoms/Button'
import { CardLoading } from '@/components/atoms/LoadingSkeleton'
import useToggle from '@/hooks/useToggle'
import { useTransactionContext } from './Transactions'
import Print from '@/components/atoms/Print'
import TransactionCard from './Card'

export default function ProjectList() {
  const { State: TransactionState = {}, setQry, qry } = useTransactionContext()

  return (
    <>
      <div className={'container pb-20'}>
        <div className="flex justify-between my-4">
          <ModalV3
            renderButton={({ setOpen }) => (
              <Button size="md" onClick={setOpen}>
                New Transaction
              </Button>
            )}
          >
            <div className="px-2">
              <h3 className="mb-2 text-xl ">Add new transaction type</h3>
              {/* <ProjectForm onSuccess={TransactionState?.reload} /> */}
            </div>
          </ModalV3>
        </div>

        <ErrorState
          error={!TransactionState?.loading && TransactionState?.error}
        />

        <div className="grid grid-cols-1 gap-4 mt-5 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-y-5 ">
          {/* Data List */}
          {TransactionState?.data?.map((item, i) => {
            return (
              <React.Fragment key={`project__${item?.id}${i}${Math.random()}`}>
                <TransactionCard data={item} />
                {/* <Print> {item} </Print> */}
              </React.Fragment>
            )
          })}

          {/* loading  */}
          <CardLoading loading={TransactionState?.loading} />
        </div>

        {/* <Print data={resUsers?.paginationData} maxHeight={'250px'} /> */}
      </div>
    </>
  )
}
