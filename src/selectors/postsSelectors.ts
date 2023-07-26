import { useSelector } from 'react-redux';

export const usePostsSelector = () => useSelector((state: any) => state.posts);
