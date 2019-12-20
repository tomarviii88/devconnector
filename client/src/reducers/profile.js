import {
  GET_PROFILE,
  PROFILE_ERR,
  CLEAR_PROFILE,
  GET_PROFILES
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  loading: true,
  repos: [],
  error: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        loading: false,
        profile: action.payload
      };
    case GET_PROFILES:
      return {
        ...state,
        loading: false,
        profiles: action.payload
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        loading: false,
        profile: null,
        repos: []
      };
    case PROFILE_ERR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
}
