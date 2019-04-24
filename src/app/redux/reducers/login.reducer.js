import * as actions from "../actions/common.action";

export function LoginReducer(state = {}, action) {
  debugger;
  switch (action.type) {
    case actions.LOGIN_REQUEST:
      return {
        ...state,
        loading: true
      };
    case actions.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: action.result
      };

    default:
      return state;
  }
}
