import { createSlice, createAsyncThunk, isFulfilled } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

const getMeinitialState = {
  getMeUser: null,
  getMeError: false,
  getMeSuccess: false,
  getMeLoading: false,
  getMeMessage: "",
};

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email: user.email,
        password: user.password,
      });
      return response.data;
    } catch (e) {
      if (e.response) {
        const message = e.response.data.msg;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

export const getMe = createAsyncThunk("user/getMe", async (_, thunkAPI) => {
  try {
    const response = await axios.get("http://localhost:5000/me");
    return response.data;
  } catch (e) {
    if (e.response) {
      const message = e.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
});

export const logoutUser = createAsyncThunk("user/logoutUser", async () => {
  await axios.delete("http://localhost:5000/logout");
});

export const createAndLoginUser = createAsyncThunk(
  "user/createUser",
  async (user, thunkAPI) => {
    try {
      const responseCreateUser = await axios.post(
        "http://localhost:5000/users",
        {
          name: user.name,
          email: user.email,
          password: user.password,
          confPassword: user.confPassword,
          role: user.role,
        }
      );

      const responseLogin = await axios.post("http://localhost:5000/login", {
        email: user.email,
        password: user.password,
      });

      return responseLogin.data;
    } catch (e) {
      if (e.response) {
        const message = e.response.data.msg;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuth: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // createAndLoginUser
    builder.addCase(createAndLoginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createAndLoginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isFulfilled = true;
      state.user = action.payload;
    });
    builder.addCase(createAndLoginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const getMeSlice = createSlice({
  name: "getMe",
  initialState: getMeinitialState,
  reducers: {
    resetGetMe: (state) => getMeinitialState,
  },
  extraReducers: (builder) => {
    // getMe
    builder.addCase(getMe.pending, (state) => {
      state.getMeLoading = true;
    });
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.getMeLoading = false;
      state.getMeSuccess = true;
      state.getMeUser = action.payload;
    });
    builder.addCase(getMe.rejected, (state, action) => {
      state.getMeLoading = false;
      state.getMeError = true;
      state.getMeMessage = action.payload;
    });
  },
});

export const { resetAuth } = authSlice.actions;
export const { resetGetMe } = getMeSlice.actions;
export const authReducer = authSlice.reducer;
export const getMeReducer = getMeSlice.reducer;
