import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTodos, toggleTodoComplete } from '../store/slices/todoSlice';
import { useTodoSelector } from '../selectors/todoSelectors';
import { AppDispatch } from '../store/store';
import HeaderComponent from './Header';
import Pagination from './Pagination';

const TodoList: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const allTodos = useTodoSelector();
  const [currentPage, setCurrentPage] = useState(1);
  const todosPerPage = 24;
  const pageNeighbours = 1;
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleTodoClick = (todoId: number) => {
    dispatch(toggleTodoComplete(todoId));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const filteredTodos = allTodos.filter((todo: any) =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTodos.length / todosPerPage);

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  return (
    <div className="todoContainer">
      <HeaderComponent title="Todos List" />

      <div className="todoNav">
        <div className="searchContainer">
          <input
            type="text"
            placeholder="Search by title..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="searchInput"
          />
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageNeighbours={pageNeighbours}
          handleFirstPage={handleFirstPage}
          handleLastPage={handleLastPage}
          setCurrentPage={setCurrentPage}
        />
      </div>

      <div className="todos">
        {filteredTodos
          .slice((currentPage - 1) * todosPerPage, currentPage * todosPerPage)
          .map((todo: any) => (
            <div
              key={todo.id}
              className="todoItem"
              onClick={() => handleTodoClick(todo.id)}
            >
              <b>Title:</b> {todo.title}
              <br />
              <b>ID:</b> {todo.id}
              <br />
              <b>Completed:</b> {todo.completed ? 'Yes' : 'No'}
            </div>
          ))}
      </div>
    </div>
  );
};

export default TodoList;
