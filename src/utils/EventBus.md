# EventBus: Pub/Sub Implementation with Node's EventEmitter

This document explains how to use the EventBus utility for implementing the publish/subscribe pattern in your Next.js application.

## Overview

The EventBus is a singleton class that wraps Node's built-in EventEmitter to provide a simple and type-safe way to implement the pub/sub pattern. This allows components to communicate with each other without direct coupling, making your code more modular and easier to maintain.

## Features

- Singleton pattern ensures a single event bus instance across the application
- Type-safe event publishing and subscribing with TypeScript generics
- Automatic cleanup of event listeners to prevent memory leaks
- Predefined event constants to avoid string literals

## Basic Usage

### Importing the EventBus

```typescript
import { eventBus, Events } from '@/utils/EventBus';
```

### Publishing Events

```typescript
// Publishing an event without data
eventBus.publish(Events.APP_INITIALIZED);

// Publishing an event with data
eventBus.publish<UserData>(Events.USER_LOGGED_IN, {
  id: '123',
  name: 'John Doe',
  email: 'john@example.com',
});
```

### Subscribing to Events

```typescript
// Subscribe to an event without data
const unsubscribe = eventBus.subscribe(Events.APP_INITIALIZED, () => {
  console.log('App initialized');
});

// Subscribe to an event with typed data
const unsubscribe = eventBus.subscribe<UserData>(
  Events.USER_LOGGED_IN,
  (userData) => {
    console.log(`User logged in: ${userData.name}`);
  }
);

// Don't forget to unsubscribe when the component unmounts
unsubscribe();
```

### Using with React Hooks

```typescript
import { eventBus, Events } from '@/utils/EventBus';
import { useEffect } from 'react';

function MyComponent() {
  useEffect(() => {
    // Subscribe to an event
    const unsubscribe = eventBus.subscribe<UserData>(
      Events.USER_LOGGED_IN,
      (userData) => {
        console.log(`User logged in: ${userData.name}`);
      }
    );

    // Clean up subscription when component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  // ...
}
```

## Examples

### Notification System

The EventBus can be used to create a global notification system. See the `Notification.tsx` component for a complete implementation.

```typescript
// Show a notification from anywhere in the app
import { showNotification } from '@/components/Notification';

// Show different types of notifications
showNotification('Operation successful!', 'success');
showNotification('Something went wrong', 'error');
showNotification('This is a warning', 'warning');
showNotification('This is an info message', 'info');
```

### Component Communication

The EventBus can be used for communication between components that are not directly related. See the `CounterWithEventBus.tsx` component for a complete implementation.

## Best Practices

1. **Define Event Constants**: Always use the `Events` object or create your own event constants to avoid string literals.

2. **Clean Up Subscriptions**: Always unsubscribe from events when components unmount to prevent memory leaks.

3. **Type Your Events**: Use TypeScript generics to ensure type safety for event data.

4. **Keep Events Focused**: Each event should have a clear purpose and carry only the necessary data.

5. **Document Events**: Keep a list of events and their purpose to make it easier for other developers to understand the system.

## Advanced Usage

### Creating Custom Event Groups

For specific features, you can create your own event constants:

```typescript
// Define custom events for a specific feature
const AuthEvents = {
  LOGIN_SUCCESS: 'auth:login_success',
  LOGIN_FAILURE: 'auth:login_failure',
  LOGOUT: 'auth:logout',
};

// Use these events
eventBus.publish(AuthEvents.LOGIN_SUCCESS, { userId: '123' });
```

### One-Time Subscriptions

If you only need to listen for an event once:

```typescript
eventBus.subscribeOnce<UserData>(Events.USER_LOGGED_IN, (userData) => {
  console.log(`User logged in: ${userData.name}`);
});
```

## Conclusion

The EventBus provides a simple and effective way to implement the pub/sub pattern in your Next.js application. By decoupling components and allowing them to communicate through events, you can create more modular and maintainable code.
