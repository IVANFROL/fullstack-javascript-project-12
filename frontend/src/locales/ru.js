export default {
  Components: {
    Channels: {
      Dropdown: {
        channelSettings: 'Управление каналом',
        rename: 'Переименовать',
        delete: 'Удалить',
      },
    },
    ChannelMessages: {
      Header: {
        messagesCount: {
          messages_zero: 'сообщений',
          messages_one: 'сообщение',
          messages_few: 'сообщения',
          messages_many: 'сообщений',
        },
      },
    },
    Login: {
      password: {
        minLength: 'Не менее 6 символов',
        wrongUser: 'Неверные имя пользователя или пароль',
      },
      username: {
        minLength: 'От 3 до 20 символов',
        maxLength: 'От 3 до 20 символов',
      },
      avatarImage: 'Аватар',
      Form: {
        title: 'Войти',
        username: 'Ваш ник',
        password: 'Пароль',
        login: 'Войти',
        noAccount: 'Нет аккаунта?',
        registerAccount: 'Регистрация',
        errorWrongUser: 'Неверные имя пользователя или пароль',
        aria: {
          login: 'Логин',
          password: 'Пароль',
          linkRegisterAccount: 'Перейти к регистрации',
          username: 'Ваш ник',
        },
      },
    },
    Main: {
      InputMessage: {
        enterMessage: 'Введите сообщение...',
        sendButton: 'Отправить',
        aria: {
          enterMessage: 'Новое сообщение',
        },
      },
      Chat: {
        channels: 'Каналы',
        addButton: '+',
        aria: {
          addChannel: 'Добавить канал',
        },
      },
    },
    MainHeader: {
      brandName: 'Hexlet Chat',
      leave: 'Выйти',
      aria: {
        toMainPage: 'Перейти на главную страницу',
        leave: 'Выйти',
      },
    },
    NotFound: {
      pageNotFound: 'Страница не найдена',
      backToMain: 'Вернуться на главную страницу',
      noAccount: 'Нет аккаунта?',
      registerAccount: 'Регистрация',
      aria: {
        toMainPage: 'Вернуться на главную страницу',
        linkRegisterAccount: 'Перейти к регистрации',
      },
    },
    SignUp: {
      username: {
        minLength: 'От 3 до 20 символов',
        requiredField: 'Обязательное поле',
        userExists: 'Такой пользователь уже существует',
      },
      password: {
        requiredField: 'Обязательное поле',
        minLength: 'Не менее 6 символов',
      },
      confirmPassword: {
        requiredField: 'Обязательное поле',
        oneOf: 'Пароли должны совпадать',
      },
      alt: {
        avatar: 'Аватар радостного пользователя',
      },
      errors: {
        userExists: 'Это имя уже занято',
      },
      Form: {
        title: 'Регистрация',
        username: 'Имя пользователя',
        password: 'Пароль',
        confirmPassword: 'Подтвердите пароль',
        confirmRegister: 'Зарегистрироваться',
        alreadyHaveAccount: 'Уже есть аккаунт?',
        backToLogin: 'Войти',
        aria: {
          username: 'Ваш ник',
          backToLogin: 'Вернуться в окно входа',
        },
      },
    },
    AddChannel: {
      errors: {
        channelExists: 'Такое название канала уже есть',
        profanity: 'Содержит запрещённые слова',
      },
      title: 'Добавить канал',
      inputPlaceholder: 'Имя канала',
      sendButton: 'Отправить',
      cancel: 'Отменить',
      requiredField: 'Обязательное поле',
      minLength: 'От 3 до 20 символов',
      maxLength: 'От 3 до 20 символов',

    },
    DeleteChannel: {
      title: 'Удалить канал',
      confirm: 'Уверены?',
      cancel: 'Отменить',
      delete: 'Удалить',
    },
    RenameChannel: {
      errors: {
        profanity: 'Содержит запрещённые слова',
        channelExists: 'Новое имя совпадает с именем другого канала',
      },
      minLength: 'От 3 до 20 символов',
      title: 'Переименовать канал',
      placeholder: 'Имя канала',
      cancel: 'Отменить',
      send: 'Отправить',
    },
  },
  toast: {
    ERR_NETWORK: 'Ошибка соединения',
    ERR_BAD_REQUEST: 'Ошибка авторизации',
    CHANNEL_CREATED: 'Канал создан',
    CHANNEL_RENAMED: 'Канал переименован',
    CHANNEL_DELETED: 'Канал удалён',
  },
}
