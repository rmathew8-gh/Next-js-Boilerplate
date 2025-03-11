import CounterWithEventBus from '@/components/CounterWithEventBus';
import Notification from '@/components/Notification';
import NotificationDemo from '@/components/NotificationDemo';

export default function PubSubDemoPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      {/* Notification component needs to be included once at the top level */}
      <Notification />

      <h1 className="text-3xl font-bold mb-8 text-center">
        Pub/Sub Demo with EventEmitter
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Notification System</h2>
          <p className="mb-4">
            This example demonstrates how to use the EventBus to create a notification system.
            Click the buttons below to trigger different types of notifications.
          </p>
          <NotificationDemo />
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Counter with EventBus</h2>
          <p className="mb-4">
            This example shows how to use the EventBus for communication between components.
            The counter components are decoupled and communicate only through events.
          </p>
          <CounterWithEventBus />
        </div>
      </div>

      <div className="mt-12 p-6 bg-gray-100 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">How It Works</h2>
        <p className="mb-4">
          This demo uses Node.js built-in EventEmitter to implement a pub/sub pattern.
          The implementation includes:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>EventBus:</strong>
            {' '}
            A singleton class that wraps the EventEmitter and provides
            methods for publishing and subscribing to events.
          </li>
          <li>
            <strong>Notification System:</strong>
            {' '}
            Components can publish notification events from
            anywhere in the application, and the Notification component will display them.
          </li>
          <li>
            <strong>Counter Example:</strong>
            {' '}
            Shows how multiple components can communicate through
            events without direct coupling.
          </li>
        </ul>
      </div>
    </div>
  );
}
