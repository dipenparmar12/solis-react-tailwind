/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import ModalV1 from '@/components/molecules/ModalV1/ModalV1'
import Random from '@/utils/faker/random'
import Button from '@/components/atoms/Button'

export default function ModalV1Example() {
  const [isOpen, setState] = React.useState(false)

  return (
    <>
      <Button onClick={() => setState(true)} label={'ModalV1 One'} size="md" />
      <ModalV1 onClose={() => setState(false)} isOpen={isOpen}>
        {Random.arr(10).map((e, i) => (
          <div key={e} className="text-2xl bg-gray-700 text-sky-500">
            {i} Hello model
          </div>
        ))}
      </ModalV1>

      <ModalV1
        renderButton={(modal) => (
          <Button onClick={modal.open} label={'ModalV1 scroll'} size="md" />
        )}
        renderContent={(modal) => {
          // console.log('AddModal.js::[28] modal', modal)
          return Random.arr(40).map((e, i) => (
            <div
              key={e}
              className="text-2xl bg-gray-700 text-sky-500"
              onClick={modal.close}
            >
              {i} Hello model
            </div>
          ))
        }}
      />
    </>
  )
}
