import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  logs: null,
  current: null,
  loading: true,
  error: null
};

const getLogs = createAsyncThunk(
  'log/getLogs',
  async thunkAPI => {
    setLoading();
    const res = await fetch('/logs');
    const data = await res.json();
    return data;
  }
);

const addLog = createAsyncThunk(
  'log/addLog',
  async (log, thunkAPI) => {
    setLoading();
    const res = await fetch('/logs', {
      method: 'POST',
      body: JSON.stringify(log),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json();
    return data;
  }
);

const deleteLog = createAsyncThunk(
  'log/deleteLog',
  async (id, thunkAPI) => {
    setLoading();
    await fetch(`/logs/${id}`, {
      method: 'DELETE'
    });
    return id;
  }
);

const updateLog = createAsyncThunk(
  'log/updateLog',
  async(log, thunkAPI) => {
    setLoading();
    const res = await fetch(`/logs/${log.id}`, {
      method: 'PUT',
      body: JSON.stringify(log),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json();
    return data;
  }
);

const logSlice = createSlice({
  name: 'log',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = true;
    },
    setCurrent: (state, action) => {
      state.current = action.payload;
    },
    clearCurrent: (state, action) => {
      state.current = null;
    }
  },
  extraReducers: {
    [getLogs.fulfilled]: (state, action) => {
      state.logs = action.payload;
      state.loading = false;
    },
    [addLog.fulfilled]: (state, action) => {
      state.logs.push(action.payload);
      state.loading = false;
    },
    [deleteLog.fulfilled]: (state, action) => {
      state.logs = state.logs.filter( ({ id }) => id !== action.payload );
      state.loading = false;
    },
    [updateLog.fulfilled]: (state, action) => {
      state.logs = state.logs.map( log => log.id === action.payload.id ? action.payload : log);
      state.loading = false;
    }
  }
});

export const { setLoading, setCurrent, clearCurrent } = logSlice.actions;
export { getLogs, addLog, deleteLog, updateLog };
export default logSlice.reducer;