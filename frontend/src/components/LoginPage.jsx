import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

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

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setError('');
      const response = await axios.post('/api/v1/login', {
        username: values.username,
        password: values.password,
      });

      if (response.data.token) {
        login(response.data.token);
        navigate('/');
      }
    } catch (err) {
      setError('Неверное имя пользователя или пароль');
    } finally {
      setSubmitting(false);
    }
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
              {error && (
                <div className="error-message" style={{ marginBottom: '1rem', textAlign: 'center' }}>
                  {error}
                </div>
              )}
              
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
