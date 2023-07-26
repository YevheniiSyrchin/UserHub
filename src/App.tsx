import React, { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import PostsList from './components/PostsList';
import TodoList from './components/TodoList';
import UserList from './components/UserList';
import UserDetails from './components/UserDetails';
import Navigation from './components/Navigation';
import ErrorBoundary from './components/ErrorBoundary';
import './assets/styles/styles.scss';

const App: FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="container">
          <ErrorBoundary>
            <Navigation />

            <Routes>
              <Route path="/UserHub/" element={<PostsList />} />
              <Route path="/UserHub/todos" element={<TodoList />} />
              <Route path="/UserHub/users" element={<UserList />}>
                <Route path=":userId" element={<UserDetails />} />
              </Route>
            </Routes>
          </ErrorBoundary>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
