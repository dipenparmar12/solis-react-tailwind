import React from 'react'
import ApiFetchExample from './Examples/ApiFetchExample'
import Svg from '@/components/Svg/Svg'
import Print from '@/components/atoms/Print'
import Notify, { appToast } from '@/services/NotifyService'
import NotifyExample from './Examples/NotifyExample'
import ButtonsExample from './Examples/ButtonsExample'
import SvgExamples from './Examples/SvgExamples'
import ModalV1Example from './Examples/ModalV1Example'
import BadgeExamples1 from './Examples/BadgeExamples1'

export default function ExamplesTemp() {
  return (
    <div className="flex flex-col pb-20 space-y-4">
      {/* ModalV1 example */}
      <ModalV1Example />
      <hr />
      {/* Notify example */}
      <NotifyExample />
      <hr />
      {/* Buttons  */}
      <ButtonsExample />
      <hr />
      <br />
      {/* Fetch example */}
      Fetch Data example
      <div className="space-x-2 ">
        <ApiFetchExample />
      </div>
      <hr />
      <br />
      <h3 className="text-xl ">SVG's Example</h3>
      {/* SVGs All */}
      <SvgExamples />
      <hr />
      <br />
      <br />
      {/* Badges */}
      <BadgeExamples1 />
      <hr />
      <br />
    </div>
  )
}

/* <div className='space-x-2 '>
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
</div>
 */
