import { EventEmitter } from 'node:events';

/**
 * EventBus - A simple pub/sub implementation using Node's built-in EventEmitter
 *
 * This class provides a centralized event bus for the application, allowing
 * components to publish events and subscribe to them without direct coupling.
 */
class EventBus {
  private static instance: EventBus;
  private emitter: EventEmitter;

  private constructor() {
    this.emitter = new EventEmitter();
    // Set a higher limit for event listeners to avoid warnings
    this.emitter.setMaxListeners(100);
  }

  /**
   * Get the singleton instance of EventBus
   */
  public static getInstance(): EventBus {
    if (!EventBus.instance) {
      EventBus.instance = new EventBus();
    }
    return EventBus.instance;
  }

  /**
   * Subscribe to an event
   * @param event The event name to subscribe to
   * @param listener The callback function to execute when the event is emitted
   * @returns A function to unsubscribe from the event
   */
  public subscribe<T>(event: string, listener: (data: T) => void): () => void {
    this.emitter.on(event, listener);

    // Return an unsubscribe function
    return () => {
      this.emitter.off(event, listener);
    };
  }

  /**
   * Subscribe to an event once
   * @param event The event name to subscribe to
   * @param listener The callback function to execute when the event is emitted
   */
  public subscribeOnce<T>(event: string, listener: (data: T) => void): void {
    this.emitter.once(event, listener);
  }

  /**
   * Publish an event
   * @param event The event name to publish
   * @param data The data to pass to subscribers
   */
  public publish<T>(event: string, data?: T): void {
    this.emitter.emit(event, data);
  }

  /**
   * Unsubscribe from an event
   * @param event The event name to unsubscribe from
   * @param listener The callback function to remove
   */
  public unsubscribe(event: string, listener: (...args: any[]) => void): void {
    this.emitter.off(event, listener);
  }

  /**
   * Remove all listeners for a specific event
   * @param event The event name to remove all listeners for
   */
  public removeAllListeners(event?: string): void {
    this.emitter.removeAllListeners(event);
  }
}

// Export a singleton instance
export const eventBus = EventBus.getInstance();

// Export event name constants to avoid string literals
export const Events = {
  // Application events
  APP_INITIALIZED: 'app:initialized',
  APP_ERROR: 'app:error',

  // User events
  USER_LOGGED_IN: 'user:logged_in',
  USER_LOGGED_OUT: 'user:logged_out',

  // Data events
  DATA_LOADED: 'data:loaded',
  DATA_UPDATED: 'data:updated',
  DATA_ERROR: 'data:error',

  // Notification events
  NOTIFICATION_SHOW: 'notification:show',
  NOTIFICATION_HIDE: 'notification:hide',
};

export default eventBus;
