const makeSocketRequest = (data, socket, event) => new Promise((resolve, reject) => {
  if (!socket.connected) {
    const error = new Error('feedbackMessages.errors.network');
    error.toastType = 'error';
    reject(error);
  }

  const delay = 5000;
  setTimeout(() => {
    const error = new Error('feedbackMessages.errors.response');
    error.toastType = 'warn';
    reject(error);
  }, delay);

  socket.emit(event, data, (response) => {
    if (response.status === 'ok') {
      resolve(response.data);
    }
  });
});

export default makeSocketRequest;
