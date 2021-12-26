/* eslint-disable no-param-reassign */
import React from 'react'
/**
 *
 * @param {*} initialState
 * @returns
 * @src https://www.30secondsofcode.org/react/s/use-merge-state
 */
const useMergeState = (initialState = {}, cb = () => {}) => {
  const [values, setValues] = React.useState(initialState)

  const mergeState = (newState) => {
    if (typeof newState === 'function') newState = newState(values)
    setValues({ ...values, ...newState })
  }

  // React.useEffect(() => cb(values), [values])

  // const setValue = (key, value) => {
  //   mergeState({ [key]: value })
  // } // setValue('name', 'John')

  return [values, mergeState, setValues]
}

export default useMergeState

// const MyApp = () => {
//   const [data, setData] = useMergeState({ name: 'John', age: 20 });

//   return (
//     <>
//       <input
//         value={data.name}
//         onChange={e => setData({ name: e.target.value })}
//       />
//       <button onClick={() => setData(({ age }) => ({ age: age - 1 }))}>
//         -
//       </button>
//       {data.age}
//       <button onClick={() => setData(({ age }) => ({ age: age + 1 }))}>
//         +
//       </button>
//     </>
//   );
// };

// ReactDOM.render(<MyApp />, document.getElementById('root'));
