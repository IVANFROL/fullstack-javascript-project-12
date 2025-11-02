import { Formik } from 'formik'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link, useNavigate } from 'react-router-dom'
import Image from 'react-bootstrap/Image'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

import loginAvatarImage from '../assets/avatar.jpg'
import { loginSchema } from '../validation/schema'
import { pages as pagesRoutes } from '../utils/routes'
import { useLoginMutation } from '../api/chatApi'
import { authActions } from '../slices/auth'

const Login = () => {
  const { t } = useTranslation('Components', { keyPrefix: 'Login' })
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [login] = useLoginMutation()
  return (
    <Container
      fluid
      className="h-100"
    >
      <Row
        className="justify-content-center align-content-center h-100"
      >
        <Col
          className="col-12"
          md="8"
          xl="6"
          xxl="6"
        >
          <Card className="shadow-sm">
            <Card.Body
              className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-2 p-md-5"
            >
              <Image
                src={loginAvatarImage}
                alt={t('avatarImage')}
                roundedCircle
              />
              <Formik
                initialValues={{ username: '', password: '' }}
                validateOnBlur
                validationSchema={loginSchema}
                onSubmit={async (values, actions) => {
                  try {
                    const result = await login(values).unwrap()
                    localStorage.setItem('user', JSON.stringify(result))
                    dispatch(authActions.setAuth(result))
                    navigate(pagesRoutes.root())
                  }
                  catch (err) {
                    if (err.status === 401) {
                      actions.setStatus(401)
                      actions.setErrors({ password: 'wrongUser' })
                    }
                    else {
                      throw err
                    }
                  }
                }}
              >
                {
                  props => (
                    <Form
                      noValidate
                      onSubmit={props.handleSubmit}
                      className="w-50"
                    >
                      <Card.Title
                        as="h1"
                        className="text-center"
                      >
                        {
                          t('Form.title')
                        }
                      </Card.Title>
                      <Form.Group
                        className="mb-3"
                      >
                        <Form.FloatingLabel
                          controlId="username"
                          label={t('Form.username')}
                        >
                          <Form.Control
                            required
                            value={props.values.username}
                            onBlur={props.handleBlur}
                            onChange={props.handleChange}
                            isInvalid={props.touched.username && props.errors.username}
                            name="username"
                            type="text"
                            placeholder={t('Form.username')}
                            aria-label={t('Form.aria.username')}
                          />
                          <Form.Control.Feedback
                            tooltip
                            type="invalid"
                          >
                            {
                              props.errors.username
                                ? t(`username.${props.errors.username}`)
                                : null
                            }
                          </Form.Control.Feedback>
                        </Form.FloatingLabel>
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                      >
                        <Form.FloatingLabel
                          controlId="password"
                          label={t('Form.password')}
                        >
                          <Form.Control
                            required
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            isInvalid={props.touched.password && props.errors.password}
                            name="password"
                            type="password"
                            placeholder={t('Form.password')}
                            aria-label={t('Form.aria.password')}
                          />
                          <Form.Control.Feedback
                            tooltip
                            type="invalid"
                          >
                            {
                              props.errors.password
                                ? t(`password.${props.errors.password}`)
                                : null
                            }
                          </Form.Control.Feedback>
                        </Form.FloatingLabel>
                      </Form.Group>
                      <Button
                        variant={
                          props.isValid
                            ? 'primary'
                            : 'secondary'
                        }
                        disabled={!props.values.password || !props.values.username}
                        type="submit"
                        className="w-100"
                        onSubmit={props.handleSubmit}
                      >
                        {
                          t('Form.login')
                        }
                      </Button>
                    </Form>
                  )
                }
              </Formik>
            </Card.Body>
            <Card.Footer
              className="text-center p-3"
            >
              <span
                className="m-1"
              >
                {
                  t('Form.noAccount')
                }
              </span>
              <Link
                to={pagesRoutes.signup()}
                aria-label={t('Form.aria.linkRegisterAccount')}
              >
                {
                  t('Form.registerAccount')
                }
              </Link>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Login
