/* eslint-disable no-plusplus */
/* eslint-disable no-unreachable */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
import React from 'react'
import cn from '@/utils/classNames'
import { spinnerMd } from '@/components/atoms/Spinner'
import DropDownApp from '@/components/molecules/DropDownApp/DropDownApp'
import usePagination, { DOTS } from '@/hooks/usePagination'
import Svg from '@/components/Svg/Svg'

const HDivider = React.memo(() => (
  <span className="mx-1.5">
    <span className="border dark:border-gray-500" />
  </span>
))

export default function PaginatorV1({
  label = 'Total',
  totalRecords,
  pageSize,
  currentPage,
  loading,
  siblingCount = 2,
  setPage = () => {},
  setPerPage = () => {},
}) {
  const paginationRange = usePagination({
    totalRecords,
    pageSize,
    siblingCount,
    currentPage,
  })
  const totalPages = Math.ceil(totalRecords / pageSize)
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

  // list of pages Memoized array
  const pagesOptions = React.useMemo(() => {
    return Array.from({ length: totalPages }, (_, i) => ({
      label: `${i + 1}`,
      value: i + 1,
    }))
  }, [totalPages])

  return (
    <>
      <div className="flex flex-wrap justify-between my-3 text-gray-600 gap-y-3 dark:text-gray-400">
        <div className="flex flex-wrap">
          <div className="">{label}</div>
          <div className="mx-1 font-semibold text-gray-700 dark:text-gray-300 ">
            {totalRecords || spinnerOrNull}
          </div>

          <HDivider />
          <div className="ml-1 mr-2"> Page </div>
          <div className="font-semibold text-gray-700 dark:text-gray-300 ">
            {/* {currentPage} */}
            <DropDownApp
              label={currentPage}
              options={totalPages > 1 && pagesOptions}
              onSelect={setPage}
            />
            <span className="text-gray-400 dark:text-gray-400"> / </span>
            <span className="px-1">{totalPages || spinnerOrNull}</span>
          </div>

          <HDivider />
          <div>
            <span className="ml-1 mr-1"> Per Page </span>
            <span className="px-1 text-gray-700 dark:text-gray-300">
              <DropDownApp
                label={pageSize}
                options={[5, 10, 20, 50, 100, 200, 500]}
                onSelect={setPerPage}
              />
            </span>
          </div>
        </div>

        {/* Pagination Buttons */}
        <ul className="flex flex-wrap items-center rounded ">
          <li>
            <ButtonP onClick={_prevPage} disabled={currentPage === 1}>
              <Svg.Previous />
            </ButtonP>
          </li>

          {paginationRange?.map((page, inx) => (
            <li key={`Page_val__${inx}${page}${pagesOptions[inx]}`}>
              <ButtonP
                active={page === currentPage}
                disabled={page === currentPage || page === DOTS}
                onClick={() => setPage(page)}
              >
                {page}
              </ButtonP>
            </li>
          ))}

          <li>
            <ButtonP disabled={currentPage === totalPages} onClick={_nextPage}>
              <Svg.Next />
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
      <div className="px-2.5 py-1 text-sm text-blue-500 no-underline bg-blue-100 border border-blue-100 rounded-sm dark:bg-gray-900 dark:border-gray-600 dark:text-sky-500">
        {children}
      </div>
    )
  }

  if (disabled) {
    return (
      <div
        className={cn([
          `px-2.5 py-1 text-sm text-gray-600 no-underline border  border-gray-100 rounded-sm   `,
          'dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 ',
          // 'dark:bg-gray-800 dark:border-gray-700 text-gray-700 dark:text-gray-600',
        ])}
      >
        {children}
      </div>
    )
  }

  return (
    <button
      type="button"
      className={cn([
        `px-2.5 py-1 dark:hover:bg-gray-900 text-sm text-gray-600 no-underline border border-gray-100 rounded-sm   `,
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
