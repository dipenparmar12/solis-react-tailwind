import React from 'react'
import Print from '@/components/atoms/Print'
import useFetcher from '@/hooks/useFetcher'
import Api from '@/services/ApiService'

export default function ApiFetchExample() {
  const [qry, setQry] = React.useState({ page: 1, per_page: 1 })
  const { data, error, loading } = useFetcher({
    apiCall: Api.test.get,
    qry,
    pagination: true,
  })
  const resPaginate = useFetcher({
    apiCall: Api.test.paginate,
    qry,
    pagination: true,
  })

  return (
    <div>
      <button
        className="btn btn-primary"
        onClick={() => setQry({ ...qry, page: qry.page + 1 })}
      >
        Next Page
      </button>
      {loading && <>Loading...</>}
      <br />
      Per Page: {qry?.per_page}, Page: {qry?.page},
      <Print data={error || data} maxHeight={'200px'} />
      <hr />
      <div>Pagination INFO</div>
      <Print data={resPaginate?.paginationInfo} maxHeight={'100px'} />
    </div>
  )
}
