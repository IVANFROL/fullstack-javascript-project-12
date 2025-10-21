import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const SignupPage = () => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, t('validation.usernameMin'))
      .max(20, t('validation.usernameMax'))
      .required(t('validation.usernameRequired')),
    password: Yup.string()
      .min(6, t('validation.passwordMin'))
      .required(t('validation.passwordRequired')),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], t('validation.passwordsMatch'))
      .required(t('validation.confirmPasswordRequired')),
  });

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const response = await axios.post('/api/v1/signup', {
        username: values.username,
        password: values.password,
      });

      if (response.data.token) {
        // Сохраняем токен и авторизуем пользователя
        login(response.data.token);
        navigate('/chat');
      }
    } catch (error) {
      if (error.response?.status === 409) {
        setFieldError('username', t('auth.userExists'));
      } else {
        setFieldError('username', t('auth.signupError'));
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="signup-page" data-testid="signup-page">
      <div className="signup-container">
        <h2>{t('auth.signup')}</h2>
        <Formik
          initialValues={{
            username: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="signup-form" data-testid="signup-form">
              <div className="form-group">
                <label htmlFor="username">{t('auth.username')}:</label>
                <Field
                  type="text"
                  id="username"
                  name="username"
                  className="form-input"
                  placeholder={t('auth.username')}
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
                  placeholder={t('auth.password')}
                  data-testid="password-input"
                />
                <ErrorMessage name="password" component="div" className="error-message" />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">{t('auth.confirmPassword')}</label>
                <Field
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="form-input"
                  placeholder={t('auth.confirmPassword')}
                  data-testid="confirm-password-input"
                />
                <ErrorMessage name="confirmPassword" component="div" className="error-message" />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="submit-button"
                data-testid="signup-button"
              >
                {isSubmitting ? t('auth.signupButtonLoading') : t('auth.signupButton')}
              </button>
            </Form>
          )}
        </Formik>

        <div className="signup-links">
          <p>{t('auth.haveAccount')} <Link to="/login">{t('auth.loginLink')}</Link></p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
