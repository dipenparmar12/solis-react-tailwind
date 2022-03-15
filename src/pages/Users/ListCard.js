import React from 'react'
import UserCard from './Card'
import PaginatorV1 from '@/components/molecules/PaginationV1/PaginatorV1'
import ErrorState from '@/components/atoms/ErrorState'
import ModalV3 from '@/components/molecules/Modal/ModalV3'
import UserAddForm from './AddForm'
import Button from '@/components/atoms/Button'
import Print from '@/components/atoms/Print'
import { CardLoading } from '@/components/atoms/LoadingSkeleton'
import { useUserContext } from '@/pages/Users/Context'

export default function UserListCard() {
  const { State: UsersState = {}, setQry } = useUserContext()

  return (
    <>
      <div className={'container pb-20'}>
        <PaginatorV1
          label={'Users'}
          setPage={(option) => {
            setQry({ page: option?.value || option })
          }}
          setPerPage={(option) => {
            setQry({ page: 1, per_page: option?.value || option })
          }}
          totalRecords={UsersState?.total || 0}
          pageSize={UsersState?.paginationData?.per_page || 0}
          currentPage={UsersState?.paginationData?.current_page || 0}
          loading={UsersState?.isLoading}
          siblingCount={1}
        />

        <div className="my-3">
          <ModalV3
            renderButton={({ setOpen }) => (
              <Button size="md" onClick={setOpen}>
                Create User
              </Button>
            )}
          >
            <div className="px-3">
              <h3 className="mb-2 text-xl ">Create new user</h3>
              <UserAddForm onSuccess={UsersState?.reload} />
            </div>
          </ModalV3>
        </div>

        <ErrorState
          error={!UsersState?.state?.isLoading && UsersState?.state?.isError}
        />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-5 ">
          {/* loading  */}
          <CardLoading loading={UsersState?.state?.isLoading} />

          {/* Data List */}
          {UsersState?.data?.map((user, i) => (
            <UserCard key={`user__${Math.random()}`} data={user} />
          ))}
        </div>

        {/* <Print data={resUsers?.paginationData} maxHeight={'250px'} /> */}
      </div>
    </>
  )
}
