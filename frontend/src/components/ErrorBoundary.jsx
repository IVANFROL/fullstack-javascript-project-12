import React from 'react';
import { logError } from '../utils/rollbar';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Обновляем состояние, чтобы показать fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Логируем ошибку в Rollbar
    logError(error, {
      errorInfo,
      componentStack: errorInfo.componentStack,
      errorBoundary: this.constructor.name
    });

    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <div className="error-boundary">
          <div className="error-content">
            <h2>Что-то пошло не так</h2>
            <p>Произошла ошибка в приложении. Мы уже уведомлены об этом и работаем над исправлением.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="btn btn-primary"
            >
              Перезагрузить страницу
            </button>
            {process.env.NODE_ENV === 'development' && (
              <details className="error-details">
                <summary>Детали ошибки (только в режиме разработки)</summary>
                <pre>{this.state.error && this.state.error.toString()}</pre>
                <pre>{this.state.errorInfo.componentStack}</pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
