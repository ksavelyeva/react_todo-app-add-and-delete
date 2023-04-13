import React, { useContext, useMemo } from 'react';

import { TodoInfo } from '../TodoInfo/TodoInfo';
import { AppContext } from '../AppContext/AppContext';
import { FilterMode } from '../../types/Filter';

export const TodoList: React.FC = React.memo(() => {
  const {
    allTodos,
    tempTodo,
    currentFilterMode,
  } = useContext(AppContext);

  const visibleTodos = useMemo(() => (
    allTodos.filter(({ completed }) => {
      switch (currentFilterMode) {
        case FilterMode.Active:
          return !completed;

        case FilterMode.Completed:
          return completed;

        default:
          return true;
      }
    })
  ), [allTodos, currentFilterMode]);

  return (
    <section className="todoapp__main">
      {visibleTodos.map(todo => {
        const { id } = todo;

        return (
          <TodoInfo key={id} todo={todo} />
        );
      })}

      {tempTodo && (
        <TodoInfo todo={tempTodo} />
      )}
    </section>
  );
});