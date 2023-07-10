import combineReducers from 'react-combine-reducers';

const globalState = {
  alert: {
    type: 'success',
    message: '',
    active: false,
  },
  quoteAuto: {
    vehicles: {
      makes: {},
      models: {},
      styles: {},
    },
  },
  loginPopup: {
    open: false,
  },
};

const alertReducer = (state, action) => {
  switch (action.type) {
    case 'ALERT_OPEN':
      return {
        ...state,
        type: action.payload.type,
        message: action.payload.message,
        active: true,
      };
    case 'ALERT_CLOSE':
      return {
        ...state,
        message: '',
        active: false,
      };
    default:
  }
};

const quotoAutoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_QUOTEAUTO_VEHICLE_MAKE':
      if (Object.keys(action.payload).filter(k => k.length > 0).length == 0) {
        return state;
      } else {
        let payload = action.payload;
        delete payload[''];
        return {
          ...state,
          vehicles: {
            ...state.vehicles,
            makes: {
              ...state.vehicles.makes,
              ...action.payload,
            },
          },
        };
      }
    case 'ADD_QUOTEAUTO_VEHICLE_MODEL':
      if (Object.keys(action.payload).filter(k => k.length > 0).length == 0) {
        return state;
      } else {
        let payload = action.payload;
        delete payload[''];
        return {
          ...state,
          vehicles: {
            ...state.vehicles,
            models: {
              ...state.vehicles.models,
              ...action.payload,
            },
          },
        };
      }
    case 'ADD_QUOTEAUTO_VEHICLE_STYLE':
      if (Object.keys(action.payload).filter(k => k.length > 0).length == 0) {
        return state;
      } else {
        let payload = action.payload;
        delete payload[''];
        return {
          ...state,
          vehicles: {
            ...state.vehicles,
            styles: {
              ...state.vehicles.styles,
              ...action.payload,
            },
          },
        };
      }
    default:
  }
};

const loginPopupReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_POPUP_ACTION':
      return {
        ...state,
        open: action.payload.open,
      };
    default:
  }
};

export const [reducer, initialState] = combineReducers({
  alert: [alertReducer, globalState.alert],
  quoteAuto: [quotoAutoReducer, globalState.quoteAuto],
  loginPopup: [loginPopupReducer, globalState.loginPopup],
});
