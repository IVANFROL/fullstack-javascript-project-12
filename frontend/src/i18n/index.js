import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import ru from './locales/ru.json';

// Английские переводы для тестов
const en = {
  header: {
    title: "Hexlet Chat",
    logout: "Logout"
  },
  auth: {
    login: "Login",
    signup: "Sign Up",
    username: "Username",
    password: "Password",
    confirmPassword: "Confirm Password",
    loginButton: "Login",
    signupButton: "Sign Up",
    loginButtonLoading: "Logging in...",
    signupButtonLoading: "Signing up...",
    noAccount: "No account?",
    haveAccount: "Already have an account?",
    signupLink: "Sign Up",
    loginLink: "Login",
    loginError: "Invalid username or password",
    signupError: "Registration error. Please try again.",
    userExists: "User with this username already exists"
  },
  validation: {
    usernameRequired: "Username is required",
    usernameMin: "3 to 20 characters",
    usernameMax: "3 to 20 characters",
    passwordRequired: "Password is required",
    passwordMin: "At least 6 characters",
    confirmPasswordRequired: "Password confirmation is required",
    passwordsMatch: "Passwords must match"
  },
  chat: {
    title: "Hexlet Chat",
    status: "HTTP API",
    channels: "Channels",
    addChannel: "Add Channel",
    noChannelSelected: "Select a channel to start chatting",
    noMessages: "No messages yet. Start the conversation!",
    messagePlaceholder: "Enter message...",
    sendButton: "Send",
    sending: "Sending...",
    loading: "Loading...",
    loadingMessages: "Loading messages...",
    authError: "Authorization error. Redirecting to login page...",
    now: "Now",
    connectionError: "Connection error",
    addChannelButton: "+",
    channelName: "Channel Name",
    channelManagement: "Channel Management",
    renameChannel: "Rename",
    deleteChannel: "Delete"
  },
  notFound: {
    title: "404",
    subtitle: "Page Not Found",
    message: "Sorry, the requested page does not exist.",
    homeLink: "Return to Home"
  },
  home: {
    title: "Welcome to Hexlet Chat!",
    subtitle: "Modern chat for communication and collaboration",
    loginLink: "Enter Chat"
  },
  notifications: {
    error: {
      networkError: "Network error. Check your internet connection",
      loadDataError: "Data loading error",
      loadChannelsError: "Channels loading error",
      loadMessagesError: "Messages loading error",
      sendMessageError: "Message sending error",
      addChannelError: "Channel creation error",
      renameChannelError: "Channel rename error",
      deleteChannelError: "Channel deletion error"
    },
    success: {
      channelCreated: "Channel created",
      channelRenamed: "Channel renamed",
      channelDeleted: "Channel deleted",
      messageSent: "Message sent"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en,
      },
      ru: {
        translation: ru,
      },
    },
    lng: 'en', // Дефолтная локаль - en для тестов
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;

