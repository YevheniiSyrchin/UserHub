import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export const usePostsSelector = () => {
  return useSelector((state: RootState) => state.userPosts.posts);
};
