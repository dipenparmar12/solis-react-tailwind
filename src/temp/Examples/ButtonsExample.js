import React from 'react'
import Button from '@/components/atoms/Button'
import ButtonFormik from '@/components/molecules/FormicApp/ButtonFormik'

export default function ButtonsExample() {
  return (
    <>
      <div className="space-x-2 ">
        <button className="btn btn-primary">Button Default</button>
      </div>
      <div className="space-x-2 ">
        <Button
          className="px-6 py-1 text-sm my-2 mx-2 btn_subtle__blue"
          variant="reset"
        >
          Save
        </Button>
      </div>
      <div className="space-x-2 ">
        <button className="btn disabled"> Default disable</button>
      </div>
      <div className="space-x-2 ">
        <button className="link"> Button Link </button>
      </div>
      <div>
        <button className="btn_test ">btn_test</button>
      </div>

      <div>
        <Button label={'Add User'} size="sm" />
      </div>
      <div>
        <Button label={'Add User'} size="md" />
      </div>
      <div>
        <Button label={'Add User'} size="lg" />
      </div>
      <div>
        <Button label={'Add User'} size="xl" />
      </div>
      <div>
        <Button label={'Add User'} size="2xl" />
      </div>

      <div>
        <Button label={'Add User'} isWorking size="sm" />
      </div>
      <div>
        <Button label={'Add User'} isWorking size="md" />
      </div>
      <div>
        <Button label={'Add User'} isWorking size="lg" />
      </div>
      <div>
        <Button label={'Add User'} isWorking size="xl" />
      </div>
      <div>
        <Button label={'Add User'} isWorking size="2xl" />
      </div>

      <div>
        <Button label={'Add User'} disabled size="sm" />
      </div>
      <div>
        <Button label={'Add User'} disabled size="md" />
      </div>
      <div>
        <Button label={'Add User'} disabled size="lg" />
      </div>
      <div>
        <Button label={'Add User'} disabled size="xl" />
      </div>
      <div>
        <Button label={'Add User'} disabled size="2xl" />
      </div>
    </>
  )
}
