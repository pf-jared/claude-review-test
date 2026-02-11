---
title: Conditional Rendering
impact: HIGH
tags: conditional-rendering, jsx, readability, boolean
related:
  - boolean-checks
  - props-typing
---

## Conditional Rendering

### Always Use Boolean Types for Conditions `[🔴 HIGH]`

**Core Concept**: Conditions must always be explicit boolean values to avoid unexpected behavior with falsy values.

**❌ Incorrect**: Using non-boolean values as conditions

```tsx
function Component() {
  const items = getItems();
  return items ? <List items={items} /> : null; // items could be array, undefined, null, 0
}

function Badge({ count }: { count: number }) {
  return <div>{count && <span>{count}</span>}</div>; // 0 renders as "0"
}
```

**✅ Correct**: Explicit boolean conditions

```tsx
function Component() {
  const items = getItems();
  const hasItems = Array.isArray(items) && items.length > 0;
  return hasItems ? <List items={items} /> : null;
}

function Badge({ count }: { count: number }) {
  const isVisible = count > 0;
  return <div>{isVisible && <span>{count}</span>}</div>;
}
```

**Benefits**: Clear intent, prevents unexpected falsy value rendering, easier to debug

---

### Prefer Short-Circuit Evaluation (`&&`) Over Ternary `[🔴 HIGH]`

**Core Concept**: Use `condition && <Component/>` instead of `condition ? <Component/> : null` when rendering a single component.

**✅ Preferred** (single component rendering):

```tsx
return isVisible && <Component />;
return isAdmin && <AdminPanel />;
return hasError && <ErrorMessage />;
```

**✅ Also correct** (different components):

```tsx
return isAdmin ? <AdminPanel /> : <UserPanel />;
return status === 'loading' ? <Spinner /> : <Content />;
```

**⚠️ Complex logic** - Use IIFE:

```tsx
const status = (() => {
  if (conditionA && conditionB) return 'BOTH';
  if (conditionA) return 'A';
  if (conditionB) return 'B';
  return 'NONE';
})();
```

**Decision Tree**:

- Single component rendering → Use `&&`
- Multiple different components → Use ternary `? :`
- Complex branching (3+ paths) → Use IIFE with if statements

---

### Avoid ConditionalRender Component `[🔴 HIGH]`

**Core Concept**: Use direct conditional rendering instead of wrapper components.

**❌ Avoid**:

```tsx
import { ConditionalRender } from '@components/ConditionalRender';

<ConditionalRender condition={isVisible}>
  <Component />
</ConditionalRender>;
```

**✅ Use direct conditional rendering**:

```tsx
{
  isVisible && <Component />;
}
{
  isVisible ? <Component /> : <Fallback />;
}
```
