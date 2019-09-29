import {
  SET_LOADING,
  GET_LOGS,
  ADD_LOG,
  DELETE_LOG,
  UPDATE_LOG,
  SET_CURRENT,
  CLEAR_CURRENT,
  SEARCH_LOGS,
  LOGS_ERROR
} from './types';

// Set loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING
  };
};

// Get logs from server
export const getLogs = () => async dispatch => {
  try {
    setLoading();
    const res = await fetch('/logs');
    const data = await res.json();

    dispatch({
      type: GET_LOGS,
      payload: data
    });
  } catch (err) {
    // dispatch({
    //   type: LOGS_ERROR,
    //   payload: err.response.statusText
    // });
    addError(err.response.statusText);
  }
};

// Add new log
export const addLog = log => async dispatch => {
  try {
    setLoading();
    const res = await fetch('/logs', {
      method: 'POST',
      body: JSON.stringify(log),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json();

    dispatch({
      type: ADD_LOG,
      payload: data
    });
  } catch (err) {
    addError(err.response.statusText);
  }
};

// Delete log from server
export const deleteLog = id => async dispatch => {
  try {
    setLoading();

    await fetch(`/logs/${id}`, {
      method: 'DELETE'
    });

    dispatch({
      type: DELETE_LOG,
      payload: id
    });
  } catch (err) {
    addError(err.response.statusText);
  }
};

// Update log on server
export const updateLog = log => async dispatch => {
  try {
    setLoading();
    const res = await fetch(`/logs/${log.id}`, {
      method: 'PUT',
      body: JSON.stringify(log),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await res.json();
    dispatch({
      type: UPDATE_LOG,
      payload: data
    });
  } catch (err) {
    addError(err.response.statusText);
  }
};

// Set current log
export const setCurrent = log => {
  return {
    type: SET_CURRENT,
    payload: log
  };
};

// Clear current log
export const clearCurrent = () => {
  return {
    type: CLEAR_CURRENT
  };
};

// Search server logs
export const searchLogs = text => async dispatch => {
  try {
    setLoading();
    //the server return search result
    const res = await fetch(`/logs?q=${text}`);
    const data = await res.json();
    dispatch({
      type: SEARCH_LOGS,
      payload: data
    });
  } catch (err) {
    addError(err.response.statusText);
  }
};

// record error happen
const addError = msg => {
  return {
    type: LOGS_ERROR,
    payload: msg
  };
};