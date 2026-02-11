---
title: TypeScript Types
impact: HIGH
tags: typescript, types, interfaces, generics, type-safety
related:
  - naming-conventions
  - props-typing
---

## TypeScript Types

### Type vs Interface `[🔴 HIGH]`

**Core Concept**: Prefer `interface` for object type definitions. Use `type` only when `interface` cannot be used or is less effective.

**✅ Use Interface**:

```tsx
// Server response objects
interface ServerData {
  id: number;
  name: string;
  price: number;
  unit: number;
}

// Component props
interface RowData {
  id: number;
  name: string;
  phoneNumber: string;
}

// API request/response types
interface GetProductDetailRequest {
  productId: number;
}

interface GetProductDetailResponse {
  product: ServerData;
  relatedProducts: ServerData[];
}
```

**✅ Use Type**:

```tsx
// Union types
type YorN = 'Y' | 'N';
type Status = 'pending' | 'approved' | 'rejected';

// Utility types
type Form = Record<string | number, string | number | null>;
type Nullable<T> = T | null;
type Optional<T> = T | undefined;

// Type inference from schemas
type LoginFormData = z.infer<typeof loginSchema>;

// Complex intersection/union combinations
type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;
```

**Why prefer interface?**

- More explicit and readable
- Better error messages
- Can be extended and merged
- Clearer for object shapes
- Familiar to developers from other languages

---

### Object Typing - Avoid `any` and `object` `[🔴 HIGH]`

**Core Concept**: Never use `any` or `object` for object types. Use `Record` or index signature types instead.

**❌ Avoid**:

```tsx
const userInfo: object = {
  name: '철수',
  age: 12,
};

const userData: any = {
  name: '철수',
  age: 12,
};
```

**✅ Use Record or Index Signature**:

```tsx
type DefaultObject = Record<string, string | number | boolean>;

type DefaultObject2 = {
  [key: string]: string | number | boolean;
};

const userInfo: DefaultObject = {
  name: '철수',
  age: 12,
};

const userData: DefaultObject2 = {
  name: '철수',
  age: 12,
};
```

**Even Better - Use Specific Types**:

```tsx
interface UserInfo {
  name: string;
  age: number;
}

const userInfo: UserInfo = {
  name: '철수',
  age: 12,
};
```

---

### Record Usage Strategy `[🔴 HIGH]`

**Core Concept**: Prefer specific types over `Record`. Only use `Record` when the object structure is truly unpredictable.

**❌ Avoid - When structure is known**:

```tsx
// Server data structure is known - don't use Record
const productElement = {
  id: 123,
  name: '오메가3가 들어간 맛있는 강아지 간식',
  price: 1000000,
  saleRate: 20,
};

type ProductElement = Record<string, number | string>; // Too generic
```

**✅ Correct - Use specific interface**:

```tsx
interface ProductElement {
  id: number;
  name: string;
  price: number;
  saleRate: number;
}

const productElement: ProductElement = {
  id: 123,
  name: '오메가3가 들어간 맛있는 강아지 간식',
  price: 1000000,
  saleRate: 20,
};
```

**✅ Acceptable - When structure is unpredictable**:

```tsx
// Generic function where input type is unknown
const mappingProductPrice = <T extends Record<string, string | number>>(data: T) => {
  const computedPrice = Object.values(data).reduce<number>((prevElement, currentElement) => {
    if (typeof currentElement === 'number') return prevElement + currentElement;
    return prevElement;
  }, 0);
  return computedPrice;
};
```

**When to use Record:**

- Generic utility functions that accept any object
- When building flexible abstractions
- When object keys/values are truly dynamic
- Cache objects with unknown keys

**When NOT to use Record:**

- API response types (always define interfaces)
- Component props
- Application state
- Any data structure you control
