import {STEPPER_ACTIONS} from '@/config/enums'

export const defaultStepperState = {
  steps: [],
  currentStep: 0,
}

export const reducer = (state = defaultStepperState, action) => {
  const {currentStep, steps} = state
  const {type, payload} = action

  switch (type) {
    case STEPPER_ACTIONS.SET_STEPS:
      return {
        ...state,
        steps: payload.steps,
      }
    case STEPPER_ACTIONS.INCREMENT_CURRENT_STEP:
      return {
        ...state,
        currentStep: currentStep < steps.length - 1 ? currentStep + 1 : currentStep,
      }
    case STEPPER_ACTIONS.DECREMENT_CURRENT_STEP:
      return {
        ...state,
        currentStep: currentStep > 0 ? currentStep - 1 : currentStep,
      }

    default:
      return state
  }
}
