/* eslint-disable no-underscore-dangle */
import cn from '@/utils/classNames'
import { spinnerMd } from '@/components/atoms/Spinner'
import DropDownApp from '@/components/atoms/DropDownApp'

export default function PaginatorV1({
  totalRecords,
  pageLimit,
  currentPage,
  loading,
  siblingCount = 1,
  setPage = () => {},
}) {
  const totalPages = Math.ceil(totalRecords / pageLimit)
  const spinnerOrNull = loading ? spinnerMd : '-'

  const _nextPage = () => {
    if (currentPage < totalPages) {
      setPage(currentPage + 1)
    }
  }

  const _prevPage = () => {
    if (currentPage > 1) {
      setPage(currentPage - 1)
    }
  }

  const pagesOptions = Array.from({ length: totalPages }, (_, i) => ({
    label: `${i + 1}`,
    value: i + 1,
    // onSelect: onPageChange,
  }))

  return (
    <>
      <div className="flex flex-wrap justify-between gap-3 my-5 text-gray-600 dark:text-gray-400">
        <div className="flex">
          <div className="mx-1 ">Users</div>
          <div className="mx-1 font-semibold text-gray-700 dark:text-gray-300 ">
            {totalRecords || spinnerOrNull}
          </div>

          <div className="mx-3">
            <span className="border dark:border-gray-500" />
          </div>

          <div className="ml-1 mr-2"> Page </div>
          <div className="font-semibold text-gray-700 dark:text-gray-300 ">
            <DropDownApp
              label={currentPage}
              options={totalPages > 1 && pagesOptions}
              onSelect={setPage}
            />
            <span className="text-gray-400 dark:text-gray-400"> / </span>
            <span className="px-1">{totalPages || spinnerOrNull}</span>
          </div>
        </div>
        <ul className="flex items-center rounded ">
          <li>
            <ButtonP onClick={_prevPage} disabled={currentPage === 1}>
              Previous
            </ButtonP>
          </li>

          {pagesOptions?.map((option) => (
            <li key={option.value}>
              <ButtonP
                active={option?.value === currentPage}
                onClick={() => setPage(option?.value)}
              >
                {option.label}
              </ButtonP>{' '}
            </li>
          ))}

          <li>
            <ButtonP disabled={currentPage === totalPages} onClick={_nextPage}>
              Next
            </ButtonP>
          </li>
        </ul>
      </div>
    </>
  )
}

/**
 *
 * @param {*} param0
 * @returns
 * @src https://codepen.io/abhisheksarmah/full/GRJyXpG
 */
function ButtonP({ children, onClick, active, disabled, ...rest }) {
  if (active) {
    return (
      <span className="px-3 py-1 text-blue-500 no-underline bg-blue-100 border border-blue-100 rounded-sm dark:bg-gray-900 dark:border-gray-600 dark:text-sky-500">
        {children}
      </span>
    )
  }

  if (disabled) {
    return (
      <span
        className={cn([
          `px-3 py-1 text-sm text-gray-600 no-underline border bg-gray-100 border-gray-100 rounded-sm  hover:bg-gray-100  `,
          'dark:bg-gray-800 dark:border-gray-700 text-gray-700 dark:text-gray-600',
        ])}
      >
        {children}
      </span>
    )
  }

  return (
    <button
      type="button"
      className={cn([
        `px-3 py-1 dark:hover:bg-gray-900 text-sm text-gray-600 no-underline border border-gray-100 rounded-sm   `,
        `hover:shadow-md active:shadow-sm dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 hover:bg-gray-100`,
        // disabled &&
        //   'cursor-not-allowed bg-gray-100 dark:bg-gray-800 dark:border-gray-700 text-gray-700 dark:text-gray-500',
      ])}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  )
}
