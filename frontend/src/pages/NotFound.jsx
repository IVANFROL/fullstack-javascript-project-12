import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import { pages } from '../utils/routes'

const NotFound = () => {
  const userData = localStorage.getItem('user')
  const { t } = useTranslation('Components', { keyPrefix: 'NotFound' })
  const navigate = useNavigate()
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
              {t('pageNotFound')}
              <Card.Link
                onClick={(e) => {
                  e.preventDefault()
                  navigate(pages.root())
                }}
                href={pages.root()}
              >
                {t('backToMain')}
              </Card.Link>
            </Card.Body>
            {
              userData
                ? null
                : (
                    <Card.Footer
                      className="text-center p-3"
                    >
                      <span
                        className="m-1"
                      >
                        {t('noAccount')}
                      </span>
                      <Card.Link
                        href={pages.signup()}
                        aria-label={t('aria.linkRegisterAccount')}
                        onClick={(e) => {
                          e.preventDefault()
                          navigate(pages.signup())
                        }}
                      >
                        {t('registerAccount')}
                      </Card.Link>
                    </Card.Footer>
                  )
            }
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default NotFound
