import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './slices/postsSlice';
import todoReducer from './slices/todoSlice';
import usersReducer from './slices/usersSlice';
import userAlbumsReducer from './slices/UserDetailsSlices/albumsSlice';
import userTodosReducer from './slices/UserDetailsSlices/todosSlice';
import userPostsReducer from './slices/UserDetailsSlices/postsSlice';

const store = configureStore({
  reducer: {
    posts: postsReducer,
    todo: todoReducer,
    users: usersReducer,
    userAlbums: userAlbumsReducer,
    userTodos: userTodosReducer,
    userPosts: userPostsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
