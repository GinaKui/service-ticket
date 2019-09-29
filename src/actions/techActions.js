import {
  SET_LOADING,
  GET_TECHS,
  ADD_TECH,
  DELETE_TECH,
  TECHS_ERROR
} from './types';

// Set loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING
  };
};

// Get techs from server
export const getTechs = () => async dispatch => {
  try {
    setLoading();
    const res = await fetch('/techs');
    const data = await res.json();

    dispatch({
      type: GET_TECHS,
      payload: data
    });
  } catch (err) {
    // dispatch({
    //   type: TECHS_ERROR,
    //   payload: err.response.statusText
    // });
    addError(err.response.statusText);
  }
};

// Add technician to server
export const addTech = tech => async dispatch => {
  try {
    setLoading();
    const res = await fetch('/techs', {
      method: 'POST',
      body: JSON.stringify(tech),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json();

    dispatch({
      type: ADD_TECH,
      payload: data
    });
  } catch (err) {
    addError(err.response.statusText);
  }
};

/*
* @para id {string}
* delete a tech at the server
*/
export const deleteTech = id => async dispatch => {
  try {
    setLoading();
    await fetch(`/techs/${id}`, {
      method: 'DELETE'
    });

    dispatch({
      type: DELETE_TECH,
      payload: id
    });
  } catch (err) {
    addError(err.response.statusText);
  }
};

const addError = (msg) => {
  return {
    type: TECHS_ERROR,
    payload: msg
  };
};
