const getReducer = initialState => {
  return (state, action) => {
    switch (action.type) {
      case 'FETCHING':
        return {
          ...state,
          [action.stateName]: {
            ...state[action.stateName],
            loading: true,
            error: null
          }
        };
      case 'SUCCESS':
        return {
          ...state,
          [action.stateName]: {
            ...state[action.stateName],
            ...action.payload,
            loading: false
          }
        };
      case 'ERROR':
        return {
          ...state,
          [action.stateName]: {
            ...state[action.stateName],
            loading: false,
            error: action.payload
          }
        };
      case 'REPLACE':
        return {
          ...state,
          [action.stateName]: {
            ...state[action.stateName],
            value: [
              ...state[action.stateName].value.filter(action.payload.filter),
              ...(Array.isArray(action.payload.value)
                ? action.payload.value
                : [action.payload.value])
            ],
            loading: false
          }
        };
      case 'FIND-REPLACE': {
        const foundIndex = state[action.stateName].value.findIndex(
          action.payload.find
        );
        if (foundIndex !== -1) {
          state[action.stateName].value[foundIndex] = action.payload.value;
        }

        return {
          ...state,
          [action.stateName]: {
            ...state[action.stateName],
            value: [...state[action.stateName].value],
            loading: false
          }
        };
      }
      case 'APPEND':
        return {
          ...state,
          [action.stateName]: {
            ...state[action.stateName],
            value: Array.isArray(action.payload)
              ? [...state[action.stateName].value, ...action.payload]
              : [...state[action.stateName].value, action.payload],
            loading: false
          }
        };
      case 'REMOVE':
        return {
          ...state,
          [action.stateName]: {
            ...state[action.stateName],
            value: state[action.stateName].value.filter(action.payload.filter),
            loading: false
          }
        };
      case 'RESET':
        return {
          ...state,
          [action.stateName]: initialState[action.stateName]
        };
      default:
        return state;
    }
  };
};

export { getReducer };
