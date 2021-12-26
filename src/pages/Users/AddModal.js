import React from 'react'
import Button from '@/components/atoms/Button'
import ModalApp from '@/components/molecules/ModalApp/ModalApp'
import useOutsideClicked from '@/hooks/useOutsideClicked'

export default function AddUser() {
  const modalRef = React.useRef(null)

  return (
    <>
      <Button
        size={'sm'}
        onClick={() => {
          modalRef.current?.toggle()
        }}
      >
        Add User
      </Button>

      <ModalApp ref={modalRef} title={'Add user'}>
        <>
          <div>Add user </div>
          <div className="min-h-screen">
            {[...Array(50)].map((_, i) => (
              <div
                key={`user__skeleton__${Math.random()}`}
                className="p-3 px-2 py-2 bg-gray-200 border rounded-md shadow-md dark:bg-gray-600 lg:px-4 hover:shadow-lg "
              >
                <div>Add user </div>
              </div>
            ))}
          </div>
        </>
      </ModalApp>
    </>
  )
}
