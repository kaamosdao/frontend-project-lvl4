import React from 'react';
import Add from './components/modals/Add.jsx';
import Delete from './components/modals/Delete.jsx';
import Rename from './components/modals/Rename.jsx';

const modals = {
  adding: <Add />,
  deleting: <Delete />,
  renaming: <Rename />,
};

export default (modalName) => modals[modalName];
