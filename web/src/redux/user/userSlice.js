import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true
      state.error = null
    },
    signInSuccess: (state, action) => {
      state.loading = false
      state.error = null
      state.currentUser = action.payload
    },
    signInFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    updateStart: (state, action) => {
      state.loading = true
      state.error = null
    },
    updateSuccess: (state, action) => {
      state.loading = false
      state.error = null
      state.currentUser = action.payload
    },
    updateFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    deleteStart: (state, action) => {
      state.loading = true
      state.error = null
    },
    deleteSuccess: (state, action) => {
      state.loading = false,
      state.error = null,
      state.currentUser = null
    },
    deleteFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    signoutSuccess: (state, action) => {
      state.loading = false
      state.error = null
      state.currentUser = null
    }
  },
})

// Export actions for use in components and thunks
export const { 
  signInStart, signInSuccess, signInFailure,
  updateStart, updateSuccess, updateFailure,
  deleteStart, deleteSuccess, deleteFailure,
  signoutSuccess 
} = userSlice.actions

// Export the reducer to be added to the store
export default userSlice.reducer