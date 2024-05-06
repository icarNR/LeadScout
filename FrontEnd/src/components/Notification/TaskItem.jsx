import React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  taskItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  taskDetails: {
    display: 'flex',
    alignItems: 'center',
  },
  actions: {
    display: 'flex',
    gap: theme.spacing(1),
  },
}));

const TaskItem = ({ task }) => {
  const classes = useStyles();

  return (
    <div className={`${classes.taskItem} px-4 py-2 flex flex-col sm:flex-row justify-between items-center border-b border-gray-200`}>
      <p className="text-base font-medium">{task.text}</p>
      <div className="flex items-center space-x-4">
        <span className="text-gray-500 text-sm">{task.date}</span>
        <span className="text-gray-500 text-sm">{task.name}</span>
        <div className="flex space-x-1">
          <button className="btn btn-primary">Accept</button>
          <button className="btn btn-outline-primary">Decline</button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
