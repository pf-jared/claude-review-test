---
title: Deduplicate Global Event Listeners
impact: LOW
impactDescription: single listener for N components
tags: client, event-listeners, subscription
---

## Deduplicate Global Event Listeners

Use a module-level subscription manager with `useEffect` to share global event listeners across component instances. Avoid registering duplicate listeners when multiple components need to respond to the same event.

**Incorrect (N instances = N listeners):**

```tsx
function useKeyboardShortcut(key: string, callback: () => void) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === key) {
        callback();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [key, callback]);
}
```

When using the `useKeyboardShortcut` hook multiple times, each instance will register a new listener, causing performance issues and redundant event handling.

**Correct (N instances = 1 listener):**

```tsx
// Module-level Map to track callbacks per key
const keyCallbacks = new Map<string, Set<() => void>>();
let listenerAttached = false;

function attachGlobalListener() {
  if (listenerAttached) return;

  const handler = (e: KeyboardEvent) => {
    if (e.metaKey && keyCallbacks.has(e.key)) {
      keyCallbacks.get(e.key)!.forEach((cb) => cb());
    }
  };

  window.addEventListener("keydown", handler);
  listenerAttached = true;

  return () => {
    window.removeEventListener("keydown", handler);
    listenerAttached = false;
  };
}

function useKeyboardShortcut(key: string, callback: () => void) {
  useEffect(() => {
    // Attach global listener if needed
    const detach = attachGlobalListener();

    // Register this callback in the Map
    if (!keyCallbacks.has(key)) {
      keyCallbacks.set(key, new Set());
    }
    keyCallbacks.get(key)!.add(callback);

    return () => {
      const set = keyCallbacks.get(key);
      if (set) {
        set.delete(callback);
        if (set.size === 0) {
          keyCallbacks.delete(key);
        }
      }

      // Clean up global listener if no more callbacks
      if (keyCallbacks.size === 0 && detach) {
        detach();
      }
    };
  }, [key, callback]);
}

function Profile() {
  // Multiple shortcuts will share the same listener
  useKeyboardShortcut("p", () => {
    /* ... */
  });
  useKeyboardShortcut("k", () => {
    /* ... */
  });
  // ...
}
```
