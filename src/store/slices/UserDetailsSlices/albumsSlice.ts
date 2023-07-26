import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface Album {
  id: number;
  title: string;
}

interface AlbumsState {
  albums: Album[];
}

export const fetchAlbums = createAsyncThunk(
  'albums/fetchAlbums',
  async (userId: number) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}/albums`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch albums');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching albums:', error);
      throw error;
    }
  }
);

const initialState: AlbumsState = {
  albums: [],
};

const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAlbums.fulfilled, (state, action) => {
      state.albums = action.payload;
    });
  },
});

export default albumsSlice.reducer;
export type { AlbumsState };
