import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, Modal,
  // Button, Modal, Form,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
// import { useFormik } from 'formik';
import { Formik, Form } from 'formik';
import { hideModal } from '../../slices/modalSlice.js';
import TextField from './ChannelTextfield.jsx';
import { channelsSchema } from '../../validationSchema.js';
import { useSocket } from '../../hooks/index.jsx';
import showToast from '../../showToast.js';

function Add() {
  const dispatch = useDispatch();
  const { socket } = useSocket();
  const { t } = useTranslation();
  const channels = useSelector((state) => state.channels.items);
  const inputRef = React.createRef();
  const formRef = useRef(null);
  console.log('render');
  useEffect(() => {
    inputRef.current.focus();
  });
  const handleClose = () => {
    dispatch(hideModal());
  };
  console.log('AddModal');
  const handleSubmit = (values, actions) => {
    console.log('AddSubmit!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    const isAlreadyExist = channels.find((item) => item.name === values.channel);
    if (isAlreadyExist) {
      actions.setErrors({ channelExist: t('feedbackMessages.errors.channels.exist') });
      inputRef.current.focus();
      return;
    }
    if (!socket.connected) {
      showToast(t('feedbackMessages.errors.network'), 'error');
      inputRef.current.focus();
      return;
    }
    Array.from(formRef.current.elements).forEach((element) => {
      element.setAttribute('disabled', true);
    });
    // socket.timeout(5000)
    //   .emit('newChannel', { name: values.channel }, (err) => {
    //     if (err) {
    //       Array.from(formRef.current.elements).forEach((element) => {
    //         element.removeAttribute('disabled');
    //       });
    //       showToast(t('feedbackMessages.errors.response'), 'warn');
    //     } else {
    //       dispatch(hideModal());
    //       showToast(t('feedbackMessages.channel.added'), 'success');
    //     }
    //   });
    const timeoutID = setTimeout(() => {
      Array.from(formRef.current.elements).forEach((element) => {
        element.removeAttribute('disabled');
      });
    }, 5000);
    socket.emit('newChannel', { name: values.channel }, (response) => {
      if (response.status === 'ok') {
        Array.from(formRef.current.elements).forEach((element) => {
          element.removeAttribute('disabled');
        });
        clearTimeout(timeoutID);
        console.log('response.status', response.status);
        showToast(t('feedbackMessages.channel.added'), 'success');
        dispatch(hideModal());
      }
    });
  };

  return (
    <Modal
      show
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={handleClose}
    >
      <Modal.Header className="border-0" closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {t('modals.add.title')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ channel: '' }}
          validationSchema={channelsSchema}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form ref={formRef} className="w-100 m-auto mb-4 p-0">
              <TextField
                label={t('modals.add.input')}
                id="channel"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.channel}
                touched={formik.touched.channel}
                error={formik.errors.channel || formik.errors.channelExist}
                ref={inputRef}
              />
              <Button variant="primary" name={t('modals.add.submitButton')} type="submit">{t('modals.add.submitButton')}</Button>
              <Button variant="secondary" name={t('modals.add.closeButton')} onClick={handleClose} className="ms-2">{t('modals.add.closeButton')}</Button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}

export default Add;

// function Add() {
//   const dispatch = useDispatch();
//   const { socket } = useSocket();
//   const { t } = useTranslation();
//   const channels = useSelector((state) => state.channels.items);
//   const inputRef = React.createRef();
//   const formRef = useRef(null);
//   console.log('render');
//   useEffect(() => {
//     inputRef.current.focus();
//   });
//   const handleClose = () => {
//     dispatch(hideModal());
//   };
//   console.log('AddModal');
//   const handleSubmit = (values, actions) => {
//     console.log('AddSubmit!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
//     const isAlreadyExist = channels.find((item) => item.name === values.channel);
//     if (isAlreadyExist) {
//       actions.setErrors({ channelExist: t('feedbackMessages.errors.channels.exist') });
//       inputRef.current.focus();
//       return;
//     }
//     if (!socket.connected) {
//       showToast(t('feedbackMessages.errors.network'), 'error');
//       inputRef.current.focus();
//       return;
//     }
//     Array.from(formRef.current.elements).forEach((element) => {
//       element.setAttribute('disabled', true);
//     });
//     // socket.timeout(5000)
//     //   .emit('newChannel', { name: values.channel }, (err) => {
//     //     if (err) {
//     //       Array.from(formRef.current.elements).forEach((element) => {
//     //         element.removeAttribute('disabled');
//     //       });
//     //       showToast(t('feedbackMessages.errors.response'), 'warn');
//     //     } else {
//     //       dispatch(hideModal());
//     //       showToast(t('feedbackMessages.channel.added'), 'success');
//     //     }
//     //   });
//     const timeoutID = setTimeout(() => {
//       Array.from(formRef.current.elements).forEach((element) => {
//         element.removeAttribute('disabled');
//       });
//     }, 5000);
//     socket.emit('newChannel', { name: values.channel }, (response) => {
//       if (response.status === 'ok') {
//         Array.from(formRef.current.elements).forEach((element) => {
//           element.removeAttribute('disabled');
//         });
//         clearTimeout(timeoutID);
//         console.log('response.status', response.status);
//         showToast(t('feedbackMessages.channel.added'), 'success');
//         dispatch(hideModal());
//       }
//     });
//   };
//   const formik = useFormik({
//     initialValues: { channel: '' },
//     validationSchema: channelsSchema,
//     onSubmit: handleSubmit,
//   });
//   return (
//     <Modal
//       show
//       size="sm"
//       aria-labelledby="contained-modal-title-vcenter"
//       centered
//       onHide={handleClose}
//     >
//       <Modal.Header className="border-0" closeButton>
//         <Modal.Title id="contained-modal-title-vcenter">
//           {t('modals.add.title')}
//         </Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form ref={formRef} onSubmit={formik.handleSubmit} className="w-100 m-auto mb-4 p-0">
//           <TextField
//             label={t('modals.add.input')}
//             id="channel"
//             type="text"
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             value={formik.values.channel}
//             touched={formik.touched.channel}
//             error={formik.errors.channel || formik.errors.channelExist}
//             ref={inputRef}
//           />
//           <Button variant="primary" type="submit">{t('modals.add.submitButton')}</Button>
//           <Button variant="secondary" onClick={handleClose} className="ms-2">
// {t('modals.add.closeButton')}
// </Button>
//         </Form>
//       </Modal.Body>
//     </Modal>
//   );
// }

// export default Add;
