---
title: Naming Conventions
impact: HIGH
tags: naming, conventions, boolean, event-handlers, api-functions, readability
related:
  - typescript-types
---

## Naming Conventions

### Boolean Variable Naming `[🔴 HIGH]`

**Core Concept**: Boolean variables and props must start with specific prefixes to clearly indicate their boolean nature.

**Required Prefixes**: `is`, `should`, `has`, `can`, `did`, `will`

**✅ Correct**:

```tsx
const isLoading = true;
const shouldDisableInput = !user.isAdmin;
const hasTargetProductItem = items.length > 0;
const canEdit = user.permissions.includes('edit');
const didSubmit = formState.isSubmitted;
const willExpire = expiryDate < Date.now();

interface ButtonProps {
  isDisabled?: boolean;
  shouldShowIcon?: boolean;
  hasError?: boolean;
}
```

**❌ Incorrect**:

```tsx
const loading = true; // Missing prefix
const disabled = !user.isAdmin; // Missing prefix
const visible = items.length > 0; // Missing prefix

interface ButtonProps {
  disabled?: boolean; // Missing prefix
  error?: boolean; // Missing prefix
}
```

**ESLint Configuration**:

```js
rules: {
  '@typescript-eslint/naming-convention': [
    'error',
    {
      selector: 'variable',
      types: ['boolean'],
      format: ['PascalCase'],
      prefix: ['is', 'should', 'has', 'can', 'did', 'will'],
    },
  ],
}
```

---

### Event Handler Naming `[🔴 HIGH]`

**Core Concept**: Event handler names should follow the pattern: `on` + `[event type]` + `[element/action]`

**Pattern**: `on{EventType}{Element/Action}`

**✅ Correct**:

```tsx
<button type="submit" onClick={onClickSubmit}>
  요청
</button>

<button type="button" onClick={onClickSearchButton}>
  검색
</button>

<input onChange={onChangeEmailInput} />

<form onSubmit={onSubmitLoginForm}>...</form>
```

**❌ Avoid**:

```tsx
<button type="button" onClick={handleSubmit}>요청</button>

<button type="button" onClick={submitHandler}>검색</button>

<input onChange={emailChanged} />
```

**Examples**:

- `onClickSubmit` - Click event on submit action
- `onClickSearchButton` - Click event on search button
- `onChangeEmailInput` - Change event on email input
- `onSubmitLoginForm` - Submit event on login form
- `onFocusPasswordField` - Focus event on password field

---

### API Function Naming `[🔴 HIGH]`

**Core Concept**: API function names should start with the HTTP method followed by the action/resource name.

**Pattern**: `{httpMethod}{ResourceName}`

**✅ Correct**:

```tsx
// GET requests
const getProductDetail = async (id: number) => {
  return await http.get(`/products/${id}`);
};

const getUserList = async () => {
  return await http.get('/users');
};

// POST requests
const postProductDetail = async (data: ProductData) => {
  return await http.post('/products', data);
};

const postUserRegistration = async (userData: UserData) => {
  return await http.post('/users', userData);
};

// PUT/PATCH requests
const putProductDetail = async (id: number, data: ProductData) => {
  return await http.put(`/products/${id}`, data);
};

// DELETE requests
const deleteProduct = async (id: number) => {
  return await http.delete(`/products/${id}`);
};
```

**❌ Avoid**:

```tsx
const handleProductDetail = async () => {
  /* ... */
}; // Unclear HTTP method
const productDetailApi = async () => {
  /* ... */
}; // Unclear action
const fetchProduct = async () => {
  /* ... */
}; // Use getProduct instead
const createUser = async () => {
  /* ... */
}; // Use postUser instead
```

**Alignment**: This convention is already established in the `query-factory-guide`.
