import {useContext, useReducer, useCallback, createContext} from 'react'
import {defaultStepperState, reducer} from '../store'
import {STEPPER_ACTIONS} from '@/config/enums'

export const StepperContext = createContext([])

export const StepperProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, defaultStepperState)
  return <StepperContext.Provider value={[state, dispatch]}>{children}</StepperContext.Provider>
}

export const useStepper = () => {
  const [state, dispatch] = useContext(StepperContext)
  const {currentStep, steps} = state

  if (!StepperContext) {
    throw new Error('useStepper should be used inside StepperProvider')
  }

  const incrementCurrentStep = useCallback(() => {
    dispatch({
      type: STEPPER_ACTIONS.INCREMENT_CURRENT_STEP,
    })
  }, [dispatch])

  const decrementCurrentStep = useCallback(() => {
    dispatch({
      type: STEPPER_ACTIONS.DECREMENT_CURRENT_STEP,
    })
  }, [dispatch])

  const setSteps = useCallback(
    (steps) => dispatch({type: STEPPER_ACTIONS.SET_STEPS, payload: {steps}}),
    [dispatch]
  )

  return {
    incrementCurrentStep,
    decrementCurrentStep,
    setSteps,
    currentStep,
    steps,
  }
}
