export default {
  translation: {
    layoutPage: {
      title: 'Инфо',
      logoutButton: 'Выйти',
    },
    aboutPage: {
      title: 'О приложении',
      body: {
        description: 'Данное приложение представляет из себя простой мессенджер, созданный в качестве обучения',
        gratitude: 'Надеюсь Вам понравится!',
      },
    },
    loginPage: {
      title: 'Войти',
      login: 'Ваш ник',
      password: 'Пароль',
      loginButton: 'Войти',
      footer: {
        question: 'Впервые здесь?',
        link: 'Регистрация',
      },
    },
    signupPage: {
      title: 'Регистрация',
      login: 'Имя пользователя',
      password: 'Пароль',
      confirmPassword: 'Подтвердите пароль',
      signupButton: 'Зарегистрироваться',
    },
    homePage: {
      channels: {
        title: 'Каналы',
        dropdownLabel: 'Управление каналом',
        dropdownRemove: 'Удалить',
        dropdownRename: 'Переименовать',
      },
      messages: {
        inputPlaceholder: 'Введите сообщение...',
        inputLabel: 'Новое сообщение',
        sendButton: 'Отправить',
      },
    },
    notfoundPage: {
      title: '404 Страница не найдена',
    },
    modals: {
      add: {
        title: 'Добавить канал',
        input: 'Имя канала',
        submitButton: 'Отправить',
        closeButton: 'Отменить',
      },
      delete: {
        title: 'Удалить канал?',
        submitButton: 'Удалить',
        closeButton: 'Отменить',
      },
      rename: {
        title: 'Переименовать канал',
        input: 'Имя канала',
        submitButton: 'Отправить',
        closeButton: 'Отменить',
      },
    },
    feedbackMessages: {
      default: '',
      channel: {
        added: 'Канал создан',
        removed: 'Канал удалён',
        renamed: 'Канал переименован',
      },
      errors: {
        network: 'Ошибка соединения',
        userExist: 'Такой пользователь уже существует',
        userNotFound: 'Неверные имя пользователя или пароль',
        required: 'Обязательное поле',
        unknown: 'Неизвестная ошибка',
        response: 'Нет ответа от сервера',
        login: {
          min: 'От 3 до 20 символов',
          max: 'От 3 до 20 символов',
        },
        password: {
          min: 'Не менее 6 символов',
        },
        confirmPassword: {
          match: 'Пароли должны совпадать',
        },
        channels: {
          min: 'Не менее 3 символов',
          max: 'Не более 20 символов',
          empty: 'Не должно быть пустым',
          exist: 'Должно быть уникальным',
        },
      },
    },
  },
};
