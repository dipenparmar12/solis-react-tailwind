/* eslint-disable consistent-return */
import { useCallback } from 'react'
import { BsChevronExpand } from 'react-icons/bs'
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri'

/**
 * @param {*} mergeState 
 * @returns {Function} 
 * @see https://github.com/tannerlinsley/react-table/discussions/2033#discussioncomment-1005975
  // sortBy -> ['-id', 'amount', '-date']
  // null -> asc -> desc
  // 1. if sorting not exists  then sortBy asc -> 'id'
  // 2. sorting exists, then sortBy desc -> '-id'
  // 3. if sorting is desc, then remove sorting -> ''
*/
export default function useTableSorting(
  mergeState = () => {},
  isMultiColumn = false,
  icons = {
    ASC: <RiArrowUpSLine className="inline-block text-sky-500" />,
    DESC: <RiArrowDownSLine className="inline-block text-sky-500" />,
    SORT: <BsChevronExpand className="inline-block px-0.5 " />,
  },
) {
  const handleTableSorting = useCallback((col, sortByState = []) => {
    let newSort = []
    const sortBy = Array.isArray(sortByState)
      ? sortByState
      : sortByState.split(',')

    const isSortExists = [`-${col}`, col].some((e) => sortBy.includes(e))
    const isSortByAsc = sortBy.indexOf(col) !== -1
    // console.log('Table.js::[98]', {
    //   isSortExists,
    //   isSortByAsc,
    // })

    if (!isSortExists && !isSortByAsc) {
      newSort = [col, ...sortBy]
    } else if (isSortExists && isSortByAsc) {
      const newSorts = sortBy.filter((e) => ![`-${col}`, col].includes(e))
      newSort = [`-${col}`, ...newSorts]
    } else {
      const sortByNew = sortBy.filter((e) => ![`-${col}`, col].includes(e))
      newSort = sortByNew
    }
    // isMultiColumn && mergeState({ sortBy: newSort.join(',') })
    // !isMultiColumn && mergeState({ sortBy: newSort[0] })

    return mergeState({ sortBy: isMultiColumn ? newSort : newSort[0] })

    // switch (column.sortDirection) {
    //   case 'ASC':
    //     sort = { direction: 'DESC', accessor: column.id }
    //     break
    //   case 'DESC':
    //     sort = { direction: undefined, accessor: column.id }
    //     break
    //   default:
    //     sort = { direction: 'ASC', accessor: column.id }
    //     break
    // }
    // setQry.merge({ orderings: { sort, ...qry.orderings } })
  }, [])

  const getSortingIcon = useCallback((columnId, sortByState = []) => {
    if (!sortByState) return icons.SORT

    const sortBy = Array.isArray(sortByState)
      ? sortByState
      : sortByState.split(',')

    const isSortByAsc = sortBy.indexOf(columnId) !== -1
    const isSortByDesc = sortBy.indexOf(`-${columnId}`) !== -1

    if (isSortByAsc) return icons.ASC
    if (isSortByDesc) return icons.DESC
    return icons.SORT
  }, [])

  return { handleTableSorting, getSortingIcon }
}
/* 
========================================================
  Stand alone method
======================================================== 
*/
// /**
//  * @param {*} col
//  * @param {*} state
//  * @param {*} mergeState
//  *
//   // sortBy -> ['-id', 'amount', '-date']
//   // null -> asc -> desc
//   // 1. if sorting not exists  then sortBy asc -> 'id'
//   // 2. sorting exists, then sortBy desc -> '-id'
//   // 3. if sorting is desc, then remove sorting -> ''
//  */
// const columnHeaderSort = async (col, state = {}, mergeState = () => {}) => {
//   let newSort = []
//   const { sortBy = [] } = state
//   const isSortExists = [`-${col}`, col].some((e) => sortBy.includes(e))
//   const isSortByAsc = sortBy.indexOf(col) !== -1
//   // console.log('Table.js::[98]', {
//   //   isSortExists,
//   //   isSortByAsc,
//   // })

//   if (!isSortExists && !isSortByAsc) {
//     newSort = [col, ...sortBy]
//   } else if (isSortExists && isSortByAsc) {
//     const newSorts = sortBy.filter((e) => ![`-${col}`, col].includes(e))
//     newSort = [`-${col}`, ...newSorts]
//   } else {
//     const sortByNew = sortBy.filter((e) => ![`-${col}`, col].includes(e))
//     newSort = sortByNew
//   }

//   return mergeState({ sortBy: newSort })

//   // switch (column.sortDirection) {
//   //   case 'ASC':
//   //     sort = { direction: 'DESC', accessor: column.id }
//   //     break
//   //   case 'DESC':
//   //     sort = { direction: undefined, accessor: column.id }
//   //     break
//   //   default:
//   //     sort = { direction: 'ASC', accessor: column.id }
//   //     break
//   // }
//   // setQry.merge({ orderings: { sort, ...qry.orderings } })
// }
