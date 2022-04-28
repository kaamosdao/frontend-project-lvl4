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
      login: 'Логин',
      password: 'Пароль',
      loginButton: 'Войти',
      footer: {
        question: 'Впервые здесь?',
        link: 'Регистрация',
      },
    },
    signupPage: {
      title: 'Регистрация',
      login: 'Логин',
      password: 'Пароль',
      confirmPassword: 'Подтвердите пароль',
      signupButton: 'Зарегистрироваться',
    },
    homePage: {
      channels: {
        title: 'Каналы',
        dropdownRemove: 'Удалить',
        dropdownRename: 'Переименовать',
      },
      messages: {
        inputPlaceholder: 'Введите сообщение...',
        sendButton: 'Отправить',
      },
    },
    modals: {
      add: {
        title: 'Добавить канал',
        input: 'Канал',
        submitButton: 'Добавить',
        closeButton: 'Отменить',
      },
      delete: {
        title: 'Удалить канал?',
        submitButton: 'Удалить',
        closeButton: 'Отменить',
      },
      rename: {
        title: 'Переименовать канал',
        input: 'Канал',
        submitButton: 'Переименовать',
        closeButton: 'Отменить',
      },
    },
    feedbackMessages: {
      default: '',
      errors: {
        network: 'Ошибка сети. Попробуйте позже.',
        userExist: 'Пользователь уже существует',
        userNotFound: 'Пользователь не найден',
        required: 'Обязательное поле',
        unknown: 'Неизвестная ошибка',
        login: {
          min: 'Не менее 3 символов',
          max: 'Не более 20 символов',
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
        },
      },
    },
  },
};
