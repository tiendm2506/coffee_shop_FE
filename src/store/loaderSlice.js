import _ from 'lodash'

const initialState = {}

export default function loaderReducer (state = initialState, action) {
  const { type } = action
  const matches = /(.*)\/(pending|fulfilled|rejected)/.exec(type)

  if (!matches) return state

  const [, requestName, requestState] = matches
  return {
    ...state,
    [requestName]: requestState === 'pending'
  }
}


export const createLoadingSelector = (actions) => (state) =>
  // returns true only when all actions is not loading
  _(actions).some((action) => _.get(state, action))