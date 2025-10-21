import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const { t } = useTranslation();
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, t('validation.usernameMin'))
      .max(20, t('validation.usernameMax'))
      .required(t('validation.usernameRequired')),
    password: Yup.string()
      .min(6, t('validation.passwordMin'))
      .required(t('validation.passwordRequired')),
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
        navigate('/chat');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(t('auth.loginError'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-page" data-testid="login-page">
      <div className="login-container">
        <h2>{t('auth.login')}</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="login-form" data-testid="login-form">
              {error && (
                <div className="error-message" style={{ marginBottom: '1rem', textAlign: 'center' }}>
                  {error}
                </div>
              )}
              
              <div className="form-group">
                <label htmlFor="username">{t('auth.username')}:</label>
                <Field
                  type="text"
                  id="username"
                  name="username"
                  className="form-input"
                  data-testid="username-input"
                />
                <ErrorMessage name="username" component="div" className="error-message" />
              </div>

              <div className="form-group">
                <label htmlFor="password">{t('auth.password')}</label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="form-input"
                  data-testid="password-input"
                />
                <ErrorMessage name="password" component="div" className="error-message" />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="submit-button"
                data-testid="login-button"
              >
                {isSubmitting ? t('auth.loginButtonLoading') : t('auth.loginButton')}
              </button>
            </Form>
          )}
        </Formik>

        <div className="login-links">
          <p>{t('auth.noAccount')} <Link to="/signup">{t('auth.signupLink')}</Link></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
