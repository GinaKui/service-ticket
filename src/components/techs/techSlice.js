import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  techs: [],
  status: 'idle', //'loading','succeeded'
  error: null
};
//@TODO: - loading field should use enums, loading/idle/error...etc

const getTechs = createAsyncThunk(
  'tech/getTechs',
  async () => {
    const res = await fetch('/techs');
    const data = await res.json();
    return data;
  }
);

const addTech = createAsyncThunk(
  'tech/addTech',
  async (tech, thunkAPI) => {
    const res = await fetch('/techs', {
      method: 'POST',
      body: JSON.stringify(tech),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json();
    return data;
  }
);

const deleteTech = createAsyncThunk(
  'tech/deleteTech',
  async (id, thunkAPI) => {
    await fetch(`/techs/${id}`, {
      method: 'DELETE'
    });
    return id;
  }
);

const techSlice = createSlice({
  name: 'tech',
  initialState,
  reducers: {
    setLoading(state, action) {
      // ✅ This "mutating" code is okay
      // createSlice use Immer to update to keep the immutability
      state.status = 'loading'
    }
  },
  extraReducers: {
    [getTechs.pending]: (state, action) => {
      state.status = 'loading';
    },
    [getTechs.fulfilled]: (state, action) => {
      state.techs = action.payload;
      state.status = 'succeeded';
    },
    [addTech.pending]: (state, action) => {
      state.status = 'loading';
    },
    [addTech.fulfilled]: (state, action) => {
      state.techs.push(action.payload);
      state.status = 'succeeded';
    },
    [deleteTech.pending]: (state, action) => {
      state.status = 'loading';
    },
    [deleteTech.fulfilled]: (state, action) => {
      state.techs = state.techs.filter(tech => tech.id !== action.payload);
      state.status = 'succeeded';
    }
  }
});

export const { setLoading } = techSlice.actions;
export { getTechs, addTech, deleteTech };

export default techSlice.reducer;