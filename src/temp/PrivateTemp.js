import React from 'react'
import { useNavigate } from 'react-router-dom'
import { routes } from '../App'
import { useAuth } from '../context/AuthContext'
import Api from '../services/ApiService'

const PrivateTemp = () => {
  const [data, setData] = React.useState({})

  const auth = useAuth()
  const navigate = useNavigate()

  const fetchTestData = () => {
    Api.auth.me().then((res) => setData(res?.data))
  }

  return (
    <div>
      I am logged in as `{auth?.user?.email}`
      <br />
      <br />
      <button className="btn btn-primary" onClick={fetchTestData}>
        Fetch Auth Info
      </button>
      <button
        className="ml-3 text-gray-200 bg-red-500 btn"
        onClick={() => auth.signOut(() => navigate(routes?.login?.path))}
      >
        sing out{' '}
      </button>
      <br />
      <br />
      {data?.name && (
        <div>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}

export default PrivateTemp
