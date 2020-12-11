import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  logs: [],
  current: null,
  status: 'idle',//'idle', 'loading', 'succeeded'
  error: null
};

const getLogs = createAsyncThunk(
  'log/getLogs',
  async () => {
    const res = await fetch('/logs');
    const data = await res.json();
    return data;
  }
);

const addLog = createAsyncThunk(
  'log/addLog',
  async (log, thunkAPI) => {
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
    await fetch(`/logs/${id}`, {
      method: 'DELETE'
    });
    return id;
  }
);

const updateLog = createAsyncThunk(
  'log/updateLog',
  async(log, thunkAPI) => {
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

const searchLog = createAsyncThunk(
  'log/searchLog',
  async (text, thunkAPI) => {
    const res = await fetch(`/logs?q=${text}`);
    const data = await res.json();
    return data;
  }
);

const logSlice = createSlice({
  name: 'log',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.status = 'loading';
    },
    setCurrent: (state, action) => {
      state.current = action.payload;
    },
    clearCurrent: (state, action) => {
      state.current = null;
    }
  },
  extraReducers: {
    [getLogs.pending]: (state) => {
      state.status = 'loading';
    },
    [getLogs.fulfilled]: (state, action) => {
      state.logs = action.payload;
      state.status = 'succeeded';
    },
    [addLog.pending]: (state) => {
      state.status = 'loading';
    },
    [addLog.fulfilled]: (state, action) => {
      state.logs.push(action.payload);
      state.status = 'succeeded';
    },
    [deleteLog.pending]: (state) => {
      state.status = 'loading';
    },
    [deleteLog.fulfilled]: (state, action) => {
      state.logs = state.logs.filter( ({ id }) => id !== action.payload );
      state.status = 'succeeded';
    },
    [updateLog.pending]: (state) => {
      state.status = 'loading';
    },
    [updateLog.fulfilled]: (state, action) => {
      state.logs = state.logs.map( log => log.id === action.payload.id ? action.payload : log);
      state.status = 'succeeded';
    },
    [searchLog.pending]: (state) => {
      state.status = 'loading';
    },
    [searchLog.fulfilled]: (state, action) => {
      state.logs = action.payload;
      state.status = 'succeeded';
    }
  }
});

const selectAllLogs = state => state.log.logs;
const selectLogStatus = state => state.log.status;

export const { setLoading, setCurrent, clearCurrent } = logSlice.actions;
export { getLogs, addLog, deleteLog, updateLog, searchLog, selectLogStatus, selectAllLogs };
export default logSlice.reducer;