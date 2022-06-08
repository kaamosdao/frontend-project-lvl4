import showToast from './showToast.js';
import { setCurrentChannel } from './slices/channelSlice.js';
import { hideModal } from './slices/modalSlice.js';

// createModalHandleSubmit for Modals

export const toggleFormElementsState = (formRef, operation) => {
  if (operation === 'enable') {
    Array.from(formRef.current.elements).forEach((element) => {
      element.removeAttribute('disabled');
    });
  } else {
    Array.from(formRef.current.elements).forEach((element) => {
      element.setAttribute('disabled', true);
    });
  }
};

export const setTimeoutReaction = (formRef, translate) => {
  const timeoutID = setTimeout(() => {
    showToast(translate('feedbackMessages.errors.response'), 'warn');
    toggleFormElementsState(formRef, 'enable');
    formRef.current.querySelector('input').focus();
  }, 5000);
  return timeoutID;
};

const eventMessage = {
  newChannel: 'feedbackMessages.channel.added',
  renameChannel: 'feedbackMessages.channel.renamed',
  removeChannel: 'feedbackMessages.channel.removed',
};

const emitEvent = (event, formRef, socket, timeoutID, dispatch, translate, data) => {
  socket.emit(event, data, (response) => {
    if (response.status === 'ok') {
      clearTimeout(timeoutID);
      toggleFormElementsState(formRef, 'enable');
      showToast(translate(eventMessage[event]), 'success');
      dispatch(hideModal());
      if (event === 'newChannel') {
        dispatch(setCurrentChannel(response.data.id));
      }
    }
  });
};

export default (emittingEvent, elements) => {
  const {
    socket, channels, formRef, t: translate, dispatch, id,
  } = elements;

  const submit = (event, data) => {
    toggleFormElementsState(formRef, 'disable');
    const timeoutID = setTimeoutReaction(formRef, elements.t);
    emitEvent(event, formRef, socket, timeoutID, dispatch, translate, data);
  };

  if (emittingEvent === 'removeChannel') {
    return (event) => {
      event.preventDefault();
      if (!socket.connected) {
        showToast(translate('feedbackMessages.errors.network'), 'error');
        return;
      }
      const data = { id };
      submit(emittingEvent, data);
    };
  }

  return (values, actions) => {
    const isAlreadyExist = channels.find((item) => item.name === values.channel);
    if (isAlreadyExist) {
      actions.setErrors({ channelExist: translate('feedbackMessages.errors.channels.exist') });
      formRef.current.querySelector('input').focus();
      return;
    }
    if (!socket.connected) {
      showToast(translate('feedbackMessages.errors.network'), 'error');
      formRef.current.querySelector('input').focus();
      return;
    }
    const data = emittingEvent === 'newChannel' ? { name: values.channel } : { id, name: values.channel };
    submit(emittingEvent, data);
  };
};
