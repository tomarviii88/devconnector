import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_PROFILE,
  PROFILE_ERR,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
  GET_PROFILES
} from './types';

//Get the current user

export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get('http://localhost:5000/api/profile/me');
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Get all Profiles
export const getProfiles = () => async dispatch => {
  try {
    const res = await axios.get('http://localhost:5000/api/profile');
    //console.log(res);
    dispatch({
      type: CLEAR_PROFILE
    });
    dispatch({
      type: GET_PROFILES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Get Profile By Id
export const getProfileById = id => async dispatch => {
  try {
    const res = await axios.get(`http://localhost:5000/api/profile/user/${id}`);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Create or Update User

export const createProfile = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post(
      'http://localhost:5000/api/profile',
      formData,
      config
    );

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));
    if (!edit) {
      history.push('/dashboard');
    }
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Add Experience

export const addExperience = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.put(
      'http://localhost:5000/api/profile/experience',
      formData,
      config
    );

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Experience Added', 'success'));

    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Add Education

export const addEducation = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.put(
      'http://localhost:5000/api/profile/education',
      formData,
      config
    );

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Education Added', 'success'));

    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Delete experience

export const deleteExperience = id => async dispatch => {
  try {
    const res = await axios.delete(
      `http://localhost:5000/api/profile/experience/${id}`
    );
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Experience is deleted', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Delete education

export const deleteEducation = id => async dispatch => {
  try {
    const res = await axios.delete(
      `http://localhost:5000/api/profile/education/${id}`
    );
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Education is deleted', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Delete Profile

export const deleteProfile = () => async dispatch => {
  try {
    await axios.delete(`http://localhost:5000/api/profile`);
    dispatch({
      type: CLEAR_PROFILE
    });
    dispatch({
      type: ACCOUNT_DELETED
    });

    dispatch(setAlert('Acoount Deleted', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
