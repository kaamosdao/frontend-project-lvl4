export default {
  translation: {
    layoutPage: {
      title: 'About',
      logoutButton: 'Log Out',
    },
    aboutPage: {
      title: 'About this app',
      body: {
        description: 'This is very simple messenger, made as educational project.',
        gratitude: 'Hope you enjoy it!',
      },
    },
    loginPage: {
      title: 'Log in to account',
      login: 'Login',
      password: 'Password',
      loginButton: 'Log In',
      footer: {
        question: 'New here?',
        link: 'Sign Up',
      },
    },
    signupPage: {
      title: 'Sign Up for free',
      login: 'Login',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      signupButton: 'Create free account',
    },
    homePage: {
      channels: {
        title: 'Channels',
        dropdownRemove: 'Remove',
        dropdownRename: 'Rename',
      },
      messages: {
        inputPlaceholder: 'Text message...',
        sendButton: 'Send',
      },
    },
    modals: {
      add: {
        title: 'Add channel',
        input: 'Channel',
        submitButton: 'Create',
        closeButton: 'Cancel',
      },
      delete: {
        title: 'Remove channel?',
        submitButton: 'Remove',
        closeButton: 'Cancel',
      },
      rename: {
        title: 'Rename channel',
        input: 'Channel',
        submitButton: 'Rename',
        closeButton: 'Cancel',
      },
    },
    feedbackMessages: {
      default: '',
      errors: {
        network: 'Network Problems. Try again.',
        userExist: 'user already exsist',
        userNotFound: 'user not found',
        required: 'required field',
        unknown: 'unknown error',
        login: {
          min: 'must be at least 3 characters',
          max: 'must be less than 20 characters',
        },
        password: {
          min: 'must be at least 6 characters',
        },
        confirmPassword: {
          match: 'password must match',
        },
        channels: {
          min: 'must be at least 3 characters',
          max: 'must be less than 10 characters',
          empty: 'must not be empty',
        },
      },
    },
  },
};
