import React from 'react'
import ContextProvider from './Context/ContextProvider'
import DemoReduxHooks from './DemoReduxHooks'

// import DemouseContextHook from './DemouseContextHook'
// import DemouseReducerHook from './DemouseReducerHook'
// import DemouseRefHook from './DemouseRefHook'
// import DemouseMemoHook from './DemouseMemoHook'
// import DemouseCallBackHook from './DemouseCallbackHook'
// import DemouseEffectHook from './DemouseEffectHook'
// import DemouseStateHook from './DemouseStateHook'

export default function ReactHookApp(props) {
  return (
    <ContextProvider>
        {/* <DemouseStateHook/> */}
        {/* <DemouseEffectHook/> */}
        {/* <DemouseCallBackHook/> */}
        {/* <DemouseMemoHook/> */}
        {/* <DemouseRefHook/> */}
        {/* <DemouseReducerHook/> */}
        {/* <DemouseContextHook/> */}
        {/* <DemouseContextHook/> */}
      <DemoReduxHooks/>
    </ContextProvider>
  )
}
