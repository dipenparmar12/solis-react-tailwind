import React from 'react'
import { useExpenseContext } from '@/pages/Expenses/Context'
import Icons from '@/components/icons/Icons'
import ToolTip from '@/components/molecules/Popover/Tooltip'
import Button from '@/components/atoms/Button'
import SpinnerV2 from '@/components/atoms/SpinnerV2'
import { usePermissionContext } from '@/context/PermissionContext'

const AcceptPrompt = React.memo(({ id, isApproved }) => {
  const buttonRef = React.useRef()
  const {
    mutations: { approvalApi },
  } = useExpenseContext()
  const [verdict, setVerdict] = React.useState(null)
  const { authPermissions, userHasPermission } =
    usePermissionContext(undefined) || {}

  const handleApproval = () => {
    setVerdict(1)
    approvalApi?.mutate({
      id,
      data: { verdict: true },
    })
  }

  const handleReject = () => {
    setVerdict(0)
    approvalApi?.mutate({
      id,
      data: { verdict: false },
    })
  }

  const isLoading = approvalApi?.variables?.id === id && approvalApi?.isLoading

  // React.useEffect(() => {
  //   console.log('CardList.js::344 ', approvalApi)
  // }, [approvalApi])

  if (isApproved) {
    return (
      <div className="flex justify-center">
        <Button
          size="sm"
          className="text-green-600 bg-green-100 border-0 dark:border dark:border-green-800 hover:bg-green-200 active:bg-green-200 cursor-auto"
        >
          Accepted
        </Button>
        {/* <div className="text-green-600 bg-green-100 hover:bg-green-200 active:bg-green-200"> */}
        {/*  <Icons.CheckDouble className="inline-block text-green-700 mx-0.5 mb-1" /> */}
        {/* </div> */}
      </div>
    )
  }

  if (isApproved === false || isApproved === 0) {
    return (
      <div className="flex justify-center">
        <Button
          size="sm"
          className="text-red-400 bg-red-100 border-0 hover:bg-red-200 active:bg-red-200 cursor-auto"
        >
          Rejected
        </Button>
      </div>
    )
  }

  if (!userHasPermission('expense-approval')) return 'Pending'

  return (
    <div className="flex justify-center">
      <ToolTip
        placement="left"
        // trigger="click"
        content={
          <div className="z-40 p-2 px-5 bg-white dark:bg-gray-800 border dark:border-gray-900 rounded-lg shadow-lg space-2">
            <div className="pb-2"> Accept or Reject expense?</div>
            <div className="flex gap-2">
              <Button
                size="sm"
                className="text-green-600 bg-green-100 border-0 dark:border dark:border-green-800 hover:bg-green-200 active:bg-green-200"
                onClick={handleApproval}
                disabled={isLoading}
              >
                Accept{' '}
                {verdict === 1 && isLoading && (
                  <SpinnerV2 size={'sm'} className={'mb-1'} />
                )}
              </Button>

              <Button
                size="sm"
                className="text-red-400 bg-red-100  border-0 hover:bg-red-200 active:bg-red-200"
                onClick={handleReject}
                disabled={isLoading}
              >
                Reject
                {verdict === 0 && isLoading && (
                  <SpinnerV2 size={'sm'} className={'mb-1'} />
                )}
              </Button>
            </div>
          </div>
        }
      >
        <Button
          size={'sm'}
          className="px-2 py-1 text-sm btn-subtle"
          ref={buttonRef}
        >
          {isLoading && <SpinnerV2 size={'sm'} className={'mb-1 mr-2'} />}
          {!isLoading && <>Action</>}
        </Button>
      </ToolTip>
    </div>
  )
})

export default AcceptPrompt
