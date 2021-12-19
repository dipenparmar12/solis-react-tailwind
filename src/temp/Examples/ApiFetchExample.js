import React from 'react'
import Print from '@/components/atoms/Print'
import useFetcher from '@/hooks/useFetcher'
import Api from '@/services/ApiService'

export default function ApiFetchExample() {
  const [qry, setQry] = React.useState({ page: 1, per_page: 1 })
  const { data, error, loading } = useFetcher({ apiCall: Api.test.get, qry })
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
      <Print data={error || data} maxHeight={'300px'} />
    </div>
  )
}
