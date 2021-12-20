import React from 'react'

export default function ButtonsExample() {
  return (
    <>
      <div className="space-x-2 ">
        <button className="btn btn-primary">Button Default</button>
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
    </>
  )
}
