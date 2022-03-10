import React from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import ContextFactory from '@/context/ContextFactory'
import ExpenseList from '@/pages/Expenses/List'
import useObject from '@/hooks/useObject'
import Api from '@/services/ApiService'
import Print from '@/components/atoms/Print'
import deepMerge from '@/utils/obj/deepMerge'

const [ExpenseProvider, useExpenseContext, Context] = ContextFactory({
  name: 'ExpenseContext',
})
export { useExpenseContext }

export default function ExpensesContext() {
  const [qry, setQry] = useObject({ page: 1, per_page: 7 })
  const queryClient = useQueryClient()

  // // Enable query params
  // const qryParams = useQryParams({ setParams: setQry.merge })
  // React.useEffect(() => {
  //   qryParams.set(qry)
  // }, [qry])

  // API call
  const apiState = useQuery(
    ['expenses', qry],
    () => Api.expenses.get({ qry }),
    {
      // staleTime: 60000,
    },
  )

  // TODO::Mutate query Create Expense

  // //
  const approvalMutation = useMutation(Api.expenses.approval, {
    onSuccess: (res, variables) => {
      queryClient.setQueryData(['expenses', qry], (curApiState) => {
        // eslint-disable-next-line no-param-reassign
        curApiState.data.results.data = curApiState?.data?.results?.data?.map(
          (expense) => {
            if (expense?.id === res?.data?.results?.id) {
              return deepMerge(expense, res.data?.results)
            }
            return expense
          },
        )
        return curApiState
      })
      Api.utils.notifySuccess(res)
    },
  })

  const apiStateMemo = React.useMemo(() => {
    const { data, total, ...rest } = apiState?.data?.data?.results || {}
    return {
      rest,
      data,
      total,
      isLoading: apiState?.isLoading,
    }
  }, [apiState])

  const contextValue = {
    State: apiStateMemo,
    qry,
    setQry,
    mutations: {
      approvalApi: approvalMutation,
    },
  }

  // React.useEffect(() => {
  //   console.log('Context.js::[44] ', apiState)
  // }, [apiState])

  return (
    <ExpenseProvider value={contextValue}>
      <ExpenseList />
      <Print>{qry}</Print>
    </ExpenseProvider>
  )
}
