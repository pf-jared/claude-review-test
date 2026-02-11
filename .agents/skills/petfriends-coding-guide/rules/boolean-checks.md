---
title: Boolean and Truthy Checks
impact: MEDIUM
tags: boolean, truthy-checks, type-safety, typescript
related:
  - naming-conventions
  - conditional-rendering
---

## Boolean and Truthy Checks

### Explicit Boolean Conversion with `!!` `[🟠 MEDIUM]`

**Core Concept**: When checking truthy values for boolean conditions, use explicit `!!` conversion for clarity.

**✅ Correct - Single condition**:

```tsx
const isCondition = !!(condition1 && condition2 && condition3);

if (isCondition) {
  // ...
}
```

**✅ Correct - In conditional expressions**:

```tsx
type SomeNullableObject = {} | null | undefined;
type SomeNullableString = string | null | undefined;

// Each value explicitly converted to boolean
if (!!someObject || !!someString || !!anotherString) {
  return !!someObject || !!someString || !!anotherString;
}
```

**❌ Avoid - Implicit truthy check**:

```tsx
type SomeNullableObject = {} | null | undefined;
type SomeNullableString = string | null | undefined;

// Implicit truthy conversion - less clear
if (someObject || someString || anotherString) {
  return !!(someObject || someString || anotherString);
}
```

**Real-world example from query-factory-guide**:

```tsx
useQuery({
  queryKey: ['post', params.postId],
  queryFn: () => getPostDetail(params.postId),
  enabled: !!params.postId, // Explicit boolean conversion
});
```

**Why use `!!`?**

- Makes boolean conversion explicit
- Prevents accidental falsy values (0, '', false)
- More readable intent
- TypeScript-friendly
