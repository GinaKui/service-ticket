import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  techs: [],
  loading: false,
  error: null
};
//@TODO: - loading field should use enums, loading/idle/error...etc

const getTechs = createAsyncThunk(
  'tech/getTechs',
  async (thunkAPI) => {
    setLoading(); //may cause problem
    const res = await fetch('/techs');
    const data = await res.json();
    return data;
  }
);

const addTech = createAsyncThunk(
  'tech/addTech',
  async (tech, thunkAPI) => {
    setLoading();
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
    setLoading();
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
      return {
        ...state,
        loading: true
      }
    }
  },
  extraReducers: {
    //@TODO: - loading should be set here as .pending
    [getTechs.fulfilled]: (state, action) => {
      state.techs = action.payload;
      state.loading = false;
    },
    [addTech.fulfilled]: (state, action) => {
      state.techs.push(action.payload);
      state.loading = false;
    },
    [deleteTech.fulfilled]: (state, action) => {
      state.techs = state.techs.filter(tech => tech.id !== action.payload);
      state.loading = false;
    }
  }
});

export const { setLoading } = techSlice.actions;
export { getTechs, addTech, deleteTech };

export default techSlice.reducer;