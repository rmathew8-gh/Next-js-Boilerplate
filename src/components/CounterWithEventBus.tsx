'use client';

import { eventBus } from '@/utils/EventBus';
import { useEffect, useState } from 'react';

// Define custom events for the counter
const CounterEvents = {
  INCREMENT: 'counter:increment',
  DECREMENT: 'counter:decrement',
  RESET: 'counter:reset',
  VALUE_CHANGED: 'counter:value_changed',
};

// Counter display component that subscribes to counter events
export const CounterDisplay = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Subscribe to counter value changes
    const unsubscribe = eventBus.subscribe<number>(
      CounterEvents.VALUE_CHANGED,
      (newValue) => {
        setCount(newValue);
      },
    );

    // Clean up subscription when component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="text-center p-4 bg-gray-100 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Counter Display</h3>
      <p className="text-3xl font-bold">{count}</p>
      <p className="text-sm text-gray-500 mt-2">
        This component only displays the counter value.
        <br />
        It subscribes to counter events via EventBus.
      </p>
    </div>
  );
};

// Counter controls component that publishes counter events
export const CounterControls = () => {
  const [localCount, setLocalCount] = useState(0);

  const increment = () => {
    const newValue = localCount + 1;
    setLocalCount(newValue);
    eventBus.publish(CounterEvents.INCREMENT);
    eventBus.publish(CounterEvents.VALUE_CHANGED, newValue);
  };

  const decrement = () => {
    const newValue = localCount - 1;
    setLocalCount(newValue);
    eventBus.publish(CounterEvents.DECREMENT);
    eventBus.publish(CounterEvents.VALUE_CHANGED, newValue);
  };

  const reset = () => {
    setLocalCount(0);
    eventBus.publish(CounterEvents.RESET);
    eventBus.publish(CounterEvents.VALUE_CHANGED, 0);
  };

  return (
    <div className="text-center p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2">Counter Controls</h3>
      <div className="flex justify-center gap-2 mb-4">
        <button
          onClick={decrement}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Decrement
        </button>
        <button
          onClick={reset}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Reset
        </button>
        <button
          onClick={increment}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Increment
        </button>
      </div>
      <p className="text-sm text-gray-500">
        This component controls the counter and publishes events via EventBus.
      </p>
    </div>
  );
};

// Counter logger component that logs counter events
export const CounterLogger = () => {
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [`[${timestamp}] ${message}`, ...prev.slice(0, 9)]);
  };

  useEffect(() => {
    // Subscribe to all counter events
    const incrementSub = eventBus.subscribe(CounterEvents.INCREMENT, () => {
      addLog('Counter incremented');
    });

    const decrementSub = eventBus.subscribe(CounterEvents.DECREMENT, () => {
      addLog('Counter decremented');
    });

    const resetSub = eventBus.subscribe(CounterEvents.RESET, () => {
      addLog('Counter reset');
    });

    const valueSub = eventBus.subscribe<number>(
      CounterEvents.VALUE_CHANGED,
      (newValue) => {
        addLog(`Counter value changed to ${newValue}`);
      },
    );

    // Clean up subscriptions when component unmounts
    return () => {
      incrementSub();
      decrementSub();
      resetSub();
      valueSub();
    };
  }, []);

  return (
    <div className="p-4 bg-gray-800 text-white rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Event Logger</h3>
      <div className="h-48 overflow-y-auto font-mono text-sm bg-gray-900 p-2 rounded">
        {logs.length === 0
          ? (
              <p className="text-gray-500">No events logged yet...</p>
            )
          : (
              logs.map((log, index) => <div key={index}>{log}</div>)
            )}
      </div>
      <p className="text-xs text-gray-400 mt-2">
        This component subscribes to all counter events and logs them.
      </p>
    </div>
  );
};

// Main counter demo component that combines all the counter components
const CounterWithEventBus = () => {
  return (
    <div className="max-w-md mx-auto space-y-4">
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">EventBus Counter Demo</h2>
        <p className="text-sm text-gray-600 mb-4">
          This demo shows how to use EventBus for communication between components.
          The components below are decoupled and communicate only through events.
        </p>
      </div>
      <CounterDisplay />
      <CounterControls />
      <CounterLogger />
    </div>
  );
};

export default CounterWithEventBus;
