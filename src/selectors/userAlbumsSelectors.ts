import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export const useAlbumsSelector = () => {
  return useSelector((state: RootState) => state.userAlbums.albums);
};
