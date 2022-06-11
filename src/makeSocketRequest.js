const makeSocketRequest = (data, socket, event) => new Promise((resolve, reject) => {
  const delay = 5000;
  setTimeout(() => reject(), delay);
  socket.emit(event, data, (response) => {
    if (response.status === 'ok') {
      resolve(response.data);
    }
  });
});

export default makeSocketRequest;
