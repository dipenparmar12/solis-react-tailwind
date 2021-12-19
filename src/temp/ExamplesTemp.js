import React from 'react'
import ApiFetchExample from './Examples/ApiFetchExample'
import Svg from '@/components/Svg/Svg'
import Print from '@/components/atoms/Print'
import Notify, { appToast } from '@/services/NotifyService'

export default function ExamplesTemp() {
  const notifyRef = React.useRef()
  return (
    <div className="flex flex-col space-y-4">
      <h3>Notify </h3>
      <div>
        <button
          className="btn btn-primary"
          onClick={(e) => {
            appToast('Default Notification', 'success')
            Notify.success(<div className="text-2xl">success notify</div>, {
              toastId: 'customId',
            })
            notifyRef.current = Notify.loading(
              <button onClick={() => appToast.dismiss(notifyRef.current)}>
                Click for Close...
              </button>,
              { toastId: 'load' },
            )
          }}
        >
          Show notification
        </button>
      </div>
      <hr />
      {/* Buttons  */}
      <div className="space-x-2 ">
        <button className="btn btn-primary">Button Default</button>
      </div>
      {/* Button disable */}
      <div className="space-x-2 ">
        <button className="btn disabled"> Default disable</button>
      </div>
      {/* Button disable */}
      <div className="space-x-2 ">
        <button className="link"> Button Link </button>
      </div>
      {/* <div className='space-x-2 '>
        <button className='bg-emerald-200 btn'>Button </button>
        <button className='bg-red-200 btn'>Button </button>
        <button className='bg-blue-200 btn'>Button </button>
        <button className='bg-yellow-200 btn'>Button </button>
        <button className='bg-orange-200 btn'>Button </button>

        <br />
        <br />
        <button className='bg-emerald-300 btn'>Button </button>
        <button className='bg-red-300 btn'>Button </button>
        <button className='bg-blue-300 btn'>Button </button>
        <button className='bg-yellow-300 btn'>Button </button>
        <button className='bg-orange-300 btn'>Button </button>

        <br />
        <br />
        <button className='bg-lime-200 btn'>Button </button>
        <button className='bg-zinc-200 btn'>Button </button>
        <button className='bg-sky-200 btn'>Button </button>
        <button className='bg-amber-200 btn'>Button </button>
      </div> */}
      {/* Button Test */}
      <div>
        <button className="btn_test ">btn_test</button>
      </div>
      <hr />
      <br />
      Fetch Data example
      {/* Button ETC */}
      <div className="space-x-2 ">
        <ApiFetchExample />
      </div>
      <hr />
      <br />
      <h3 className="text-xl ">SVG's Example</h3>
      {/* Button ETC */}
      <div className="flex flex-wrap space-x-3 ">
        {Object.entries(Svg).map(([name, SvgComponent]) => {
          return (
            <div
              key={name}
              className="flex flex-col items-center p-3 m-3 cursor-pointer hover:text-blue-700 dark:hover:text-green-600"
            >
              <SvgComponent
                className={
                  'hover:text-green-600 hover:scale-110  transition-all '
                }
              />
              {name}
            </div>
          )
        })}
      </div>
      <hr />
      <br />
    </div>
  )
}
