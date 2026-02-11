---
title: Custom Hooks
impact: MEDIUM
tags: custom-hooks, react, typescript, generics
related:
  - typescript-types
---

## Custom Hooks

### Use Arrow Function Syntax `[🔴 HIGH]`

**Core Concept**: Always use arrow function syntax for custom hooks.

**✅ Correct**:

```tsx
const useCustomHook = () => {
  const [state, setState] = useState(null);
  return [state, setState] as const;
};
```

**❌ Avoid**:

```tsx
function useCustomHook() {
  // ...
}
```

---

### Generic Type Syntax for Custom Hooks `[🟠 MEDIUM]`

**Core Concept**: When custom hooks use generics, use comma syntax to separate type parameters clearly.

**✅ Correct**:

```tsx
const useCustomHook = <T,>() => {
  const [value, setValue] = useState<T | null>(null);
  return [value, setValue] as const;
};
```

**Why comma syntax?**

- Helps TypeScript parser recognize generic syntax correctly
- Prevents conflicts with JSX syntax
- Clear visual separation of generic parameters
