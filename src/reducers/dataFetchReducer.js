export default function(state, action) {
  switch (action.type) {
    case "FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.res,
      }
    case "FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
      }
    case "FETCH_RESET":
      return {
        isLoading: false,
        isError: false,
        data: null,
      }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}
