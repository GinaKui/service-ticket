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
    [getLogs.pending]: (state) => {
      state.loading = true;
    },
    [getLogs.fulfilled]: (state, action) => {
      state.logs = action.payload;
      state.loading = false;
    },
    [addLog.pending]: (state) => {
      state.loading = true;
    },
    [addLog.fulfilled]: (state, action) => {
      state.logs.push(action.payload);
      state.loading = false;
    },
    [deleteLog.pending]: (state) => {
      state.loading = true;
    },
    [deleteLog.fulfilled]: (state, action) => {
      state.logs = state.logs.filter( ({ id }) => id !== action.payload );
      state.loading = false;
    },
    [updateLog.pending]: (state) => {
      state.loading = true;
    },
    [updateLog.fulfilled]: (state, action) => {
      state.logs = state.logs.map( log => log.id === action.payload.id ? action.payload : log);
      state.loading = false;
    },
    [searchLog.pending]: (state) => {
      state.loading = true;
    },
    [searchLog.fulfilled]: (state, action) => {
      state.logs = action.payload;
      state.loading = false;
    }
  }
});

export const { setLoading, setCurrent, clearCurrent } = logSlice.actions;
export { getLogs, addLog, deleteLog, updateLog, searchLog };
export default logSlice.reducer;