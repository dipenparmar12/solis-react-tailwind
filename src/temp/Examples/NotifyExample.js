import React from 'react'
import Notify, { appToast } from '@/services/NotifyService'

export default function NotifyExample() {
  const notifyRef = React.useRef()
  return (
    <>
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
    </>
  )
}
