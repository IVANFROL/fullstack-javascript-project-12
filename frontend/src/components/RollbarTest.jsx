import React from 'react';
import { logError, logWarning, logInfo, logCritical } from '../utils/rollbar';

const RollbarTest = () => {
  const testError = () => {
    try {
      throw new Error('Тестовая ошибка для Rollbar');
    } catch (error) {
      logError(error, {
        test: true,
        component: 'RollbarTest',
        timestamp: new Date().toISOString()
      });
    }
  };

  const testWarning = () => {
    logWarning('Тестовое предупреждение для Rollbar', {
      test: true,
      component: 'RollbarTest',
      timestamp: new Date().toISOString()
    });
  };

  const testInfo = () => {
    logInfo('Тестовое информационное сообщение для Rollbar', {
      test: true,
      component: 'RollbarTest',
      timestamp: new Date().toISOString()
    });
  };

  const testCritical = () => {
    logCritical('Тестовая критическая ошибка для Rollbar', {
      test: true,
      component: 'RollbarTest',
      timestamp: new Date().toISOString()
    });
  };

  const testUncaughtError = () => {
    // Это вызовет необработанную ошибку
    setTimeout(() => {
      throw new Error('Необработанная ошибка для тестирования');
    }, 100);
  };

  const testUnhandledRejection = () => {
    // Это вызовет необработанное отклонение промиса
    Promise.reject(new Error('Необработанное отклонение промиса для тестирования'));
  };

  return (
    <div style={{ 
      position: 'fixed', 
      top: '10px', 
      right: '10px', 
      zIndex: 9999,
      background: 'white',
      padding: '1rem',
      border: '1px solid #ccc',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <h4>Rollbar Test</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <button onClick={testError} style={{ padding: '0.5rem' }}>
          Test Error
        </button>
        <button onClick={testWarning} style={{ padding: '0.5rem' }}>
          Test Warning
        </button>
        <button onClick={testInfo} style={{ padding: '0.5rem' }}>
          Test Info
        </button>
        <button onClick={testCritical} style={{ padding: '0.5rem' }}>
          Test Critical
        </button>
        <button onClick={testUncaughtError} style={{ padding: '0.5rem' }}>
          Test Uncaught Error
        </button>
        <button onClick={testUnhandledRejection} style={{ padding: '0.5rem' }}>
          Test Unhandled Rejection
        </button>
      </div>
    </div>
  );
};

export default RollbarTest;
