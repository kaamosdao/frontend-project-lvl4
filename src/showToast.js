import { toast } from 'react-toastify';

const optionst = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

const showToast = (notification, type = 'default') => {
  if (type === 'default') {
    return toast(notification, optionst);
  }
  return toast[type](notification, optionst);
};

export default showToast;
