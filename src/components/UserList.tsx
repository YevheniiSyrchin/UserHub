import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { fetchUsers } from '../store/slices/usersSlice';
import { useUsersSelector } from '../selectors/usersSelectors';
import { AppDispatch } from '../store/store';
import HeaderComponent from './Header';

const UserList: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useUsersSelector();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="usersContainer">
      <div className="usersList">
        <HeaderComponent title="Users List" />
        <div className="users">
          {users.map((user: any) => (
            <div key={user.id}>
              <Link to={`/UserHub/users/${user.id}`} className="userItem">
                {`${user.name}`}
                <br />
                {`(${user.username})`}
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default UserList;
