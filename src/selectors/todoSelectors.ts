import { useSelector } from 'react-redux';

export const useTodoSelector = () => useSelector((state: any) => state.todo);
