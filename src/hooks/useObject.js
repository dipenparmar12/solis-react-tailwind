/* eslint-disable no-param-reassign */
import React from 'react'
import Types from '@/utils/validation/Types'
import omit from '@/utils/obj/omit'

const { isFunction } = Types

const useObject = (initialState = {}, cb = () => {}) => {
  const [state, setState] = React.useState(initialState || {})

  const mergeState = React.useCallback((newState) => {
    if (isFunction(newState)) {
      setState((currentState) => ({
        ...currentState,
        ...newState(currentState),
      }))
    } else {
      setState((currentState) => ({ ...currentState, ...newState }))
    }
  }, [])

  const omitState = React.useCallback((...keys) => {
    setState((currentState) => omit(currentState, ...keys))
  }, [])

  const updateValue = React.useRef({
    reset: () => setState(initialState), // state.reset()
    merge: mergeState, // state.merge({ myKey: value })
    omit: omitState, // state.omit('myKey')
  })

  return [state, updateValue.current, setState]
}

// TODO::whenever required= Map, Filter, Reduce, Find, FindIndex, Every, Some

export default useObject

/* ------------------------------------
  useObject example
 ------------------------------------
  const [qry, setQry] = useObject({ per_page: 10 })
  // onClick={() => setQry.merge({   page: 1,  user_ids: [1,2,3]  }) }
  // onClick={() => setQry.omit('page') }
  // onClick={() => setQry.omit(['page','user_ids']) }
  // onClick={() => setQry.reset() }
 */

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
