import React from 'react'
import UserCard from './Card'
import PaginatorV1 from '@/components/molecules/PaginationV1/PaginatorV1'
import ErrorState from '@/components/atoms/ErrorState'
import ModalV3 from '@/components/molecules/Modal/ModalV3'
import UserAddForm from './AddForm'
import Button from '@/components/atoms/Button'
import { useUserContext } from './UserContainer'
import Print from '@/components/atoms/Print'
import { CardLoading } from '@/components/atoms/LoadingSkeleton'

export default function UserList() {
  const { UsersState = {}, setApiQry } = useUserContext()

  return (
    <>
      <div className={'container pb-20'}>
        <PaginatorV1
          label={'Users'}
          setPage={(option) => {
            setApiQry({ page: option?.value || option })
          }}
          setPerPage={(option) => {
            setApiQry({ page: 1, per_page: option?.value || option })
          }}
          totalRecords={UsersState?.paginationData?.total || 0}
          pageSize={UsersState?.paginationData?.per_page || 0}
          currentPage={UsersState?.paginationData?.current_page || 0}
          loading={UsersState?.loading}
          siblingCount={1}
        />

        <div className="my-3">
          <ModalV3
            renderButton={({ setOpen }) => (
              <Button size="md" onClick={setOpen}>
                Add User
              </Button>
            )}
          >
            <div className="px-3">
              <h3 className="mb-2 text-lg ">Create new user</h3>
              <UserAddForm onSuccess={UsersState?.reload} />
            </div>
          </ModalV3>
        </div>
        <ErrorState error={!UsersState?.loading && UsersState?.error} />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-5 ">
          {/* Data List */}
          {UsersState?.data?.map((user, i) => (
            <UserCard key={`user__${Math.random()}`} data={user} />
          ))}

          {/* loading  */}
          <CardLoading loading={UsersState?.loading} />
        </div>

        {/* <Print data={resUsers?.paginationData} maxHeight={'250px'} /> */}
      </div>
    </>
  )
}
