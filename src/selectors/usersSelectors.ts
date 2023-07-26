import { useSelector } from 'react-redux';
import { UsersState } from '../store/slices/usersSlice';

export const useUsersSelector = () =>
  useSelector((state: { users: UsersState }) => state.users.users);
