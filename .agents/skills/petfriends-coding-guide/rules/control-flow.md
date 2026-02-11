---
title: Control Flow Syntax
impact: MEDIUM
tags: control-flow, if-statements, readability, syntax
related:
  - conditional-rendering
---

## Control Flow Syntax

### Single-Line If Statements `[🟠 MEDIUM]`

**Core Concept**: When an if statement contains only a single line of code, omit the block scope for cleaner code.

**✅ Correct**:

```tsx
if (condition) executeCode();

if (isLoading) return <Spinner />;

if (!user) throw new Error('User not found');
```

**❌ Avoid**:

```tsx
if (condition) {
  executeCode();
}

if (isLoading) {
  return <Spinner />;
}

if (!user) {
  throw new Error('User not found');
}
```

**When to use block scope:**

```tsx
// Multiple statements - use block scope
if (condition) {
  logEvent('action_started');
  executeCode();
  updateState();
}

// Single statement - no block scope needed
if (condition) executeCode();
```
