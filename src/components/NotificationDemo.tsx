'use client';

import { showNotification } from './Notification';

const NotificationDemo = () => {
  const handleInfoClick = () => {
    showNotification('This is an info notification', 'info');
  };

  const handleSuccessClick = () => {
    showNotification('Operation completed successfully!', 'success');
  };

  const handleWarningClick = () => {
    showNotification('Warning: This action cannot be undone', 'warning');
  };

  const handleErrorClick = () => {
    showNotification('Error: Something went wrong', 'error');
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Notification Demo</h2>
      <p className="mb-4">
        Click the buttons below to trigger different types of notifications using the EventBus.
      </p>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={handleInfoClick}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Info Notification
        </button>
        <button
          onClick={handleSuccessClick}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Success Notification
        </button>
        <button
          onClick={handleWarningClick}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Warning Notification
        </button>
        <button
          onClick={handleErrorClick}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Error Notification
        </button>
      </div>
    </div>
  );
};

export default NotificationDemo;
