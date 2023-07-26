import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useUsersSelector } from '../selectors/usersSelectors';
import { useAlbumsSelector } from '../selectors/userAlbumsSelectors';
import { useTodosSelector } from '../selectors/userTodosSelectors';
import { usePostsSelector } from '../selectors/userPostsSelectors';
import { fetchAlbums } from '../store/slices/UserDetailsSlices/albumsSlice';
import { fetchTodos } from '../store/slices/UserDetailsSlices/todosSlice';
import { fetchPosts } from '../store/slices/UserDetailsSlices/postsSlice';
import { AppDispatch } from '../store/store';
import { ActiveTabs } from '../constants/types';
import Tab from './Tab';

const UserDetails: FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const albums = useAlbumsSelector();
  const todos = useTodosSelector();
  const posts = usePostsSelector();
  const users = useUsersSelector();
  const user = users.find((user: any) => user.id.toString() === userId);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchAlbums(Number(userId))).unwrap();
    dispatch(fetchTodos(Number(userId))).unwrap();
    dispatch(fetchPosts(Number(userId))).unwrap();
  }, [dispatch, userId]);

  const [activeTab, setActiveTab] = useState<ActiveTabs>(ActiveTabs.Albums);

  const handleTabClick = (tab: ActiveTabs) => {
    setActiveTab(tab);
  };

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="outlet">
      <h1 className="header font-Roboto-Slab">Detailed Information</h1>

      <div className="detailedInformation">
        <div className="mainInfo">
          <h2 className="font-Roboto-Slab">{user.name}</h2>
          <p>
            <b>Email:</b> {user.email}
          </p>
          <p>
            <b>Mobile:</b> {user.phone}
          </p>
          <p>
            <b>address:</b>
            <br /> {user.address.street}, {user.address.suite},{' '}
            {user.address.city}
          </p>
          <p>
            <b>Zipcode:</b> {user.address.zipcode}
          </p>
          <p>
            <b>Work:</b> {user.company.name}
            <br /> {user.company.catchPhrase}
          </p>
          <p>
            <b>Website:</b> {user.website}
          </p>
        </div>

        <div className="additionalInfo">
          <div className="Buttons">
            <button
              onClick={() => handleTabClick(ActiveTabs.Albums)}
              className="button"
            >
              Albums
            </button>
            <button
              onClick={() => handleTabClick(ActiveTabs.Todos)}
              className="button"
            >
              Todos
            </button>
            <button
              onClick={() => handleTabClick(ActiveTabs.Posts)}
              className="button"
            >
              Posts
            </button>
          </div>

          <div className="Tabs">
            {activeTab === 'albums' && (
              <Tab title="Albums">
                {albums.map((album: any) => (
                  <li key={album.id}>{album.title}</li>
                ))}
              </Tab>
            )}
            {activeTab === 'todos' && (
              <Tab title="Todos">
                {todos.map((todos: any) => (
                  <li key={todos.id}>{todos.title}</li>
                ))}
              </Tab>
            )}
            {activeTab === 'posts' && (
              <Tab title="Posts">
                {posts.map((posts: any) => (
                  <li key={posts.id}>{posts.title}</li>
                ))}
              </Tab>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
