import React from 'react';
import TaskItem from './TaskItem';

const TasksList = ({ tasks }) => {
  return (
    <div className="tasks-list">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TasksList;
