import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const LoginPage = () => {
  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, 'Имя пользователя должно содержать минимум 3 символа')
      .required('Имя пользователя обязательно'),
    password: Yup.string()
      .min(6, 'Пароль должен содержать минимум 6 символов')
      .required('Пароль обязателен'),
  });

  const initialValues = {
    username: '',
    password: '',
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log('Данные формы:', values);
    setSubmitting(false);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Авторизация</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="login-form">
              <div className="form-group">
                <label htmlFor="username">Имя пользователя:</label>
                <Field
                  type="text"
                  id="username"
                  name="username"
                  className="form-input"
                />
                <ErrorMessage name="username" component="div" className="error-message" />
              </div>

              <div className="form-group">
                <label htmlFor="password">Пароль:</label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="form-input"
                />
                <ErrorMessage name="password" component="div" className="error-message" />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="submit-button"
              >
                {isSubmitting ? 'Вход...' : 'Войти'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;
