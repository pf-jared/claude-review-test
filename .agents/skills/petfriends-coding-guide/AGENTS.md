---
name: petfriends-code-quality-principles
description: Code Quality Principles and Architecture Guidelines for Petfriends
metadata:
  author: petfriends
  version: '1.0.0'
---

# Part 2: Code Quality Principles

Essential principles for writing maintainable, readable, and predictable code in the Petfriends project. These principles underpin all specific conventions in the `rules/` folder.

## Readability

### Separating Code That Doesn't Execute Together `[🔴 HIGH]`

**Core Concept**: Separate conditional code paths instead of mixing them in one component

**❌ Problem**: Mixed conditions in single component

```tsx
function SubmitButton() {
  const isViewer = useRole() === 'viewer';

  useEffect(() => {
    if (isViewer) return;
    showButtonAnimation();
  }, [isViewer]);

  return isViewer ? (
    <TextButton disabled>Submit</TextButton>
  ) : (
    <Button type='submit'>Submit</Button>
  );
}
```

**✅ Solution**: Complete separation by component responsibility

```tsx
function SubmitButton() {
  const isViewer = useRole() === 'viewer';
  return isViewer ? <ViewerSubmitButton /> : <AdminSubmitButton />;
}

function ViewerSubmitButton() {
  return <TextButton disabled>Submit</TextButton>;
}

function AdminSubmitButton() {
  useEffect(() => {
    showButtonAnimation();
  }, []);
  return <Button type='submit'>Submit</Button>;
}
```

---

### Abstracting Implementation Details `[🔴 HIGH]`

**Core Concept**: Hide concrete implementation and reveal clear intent

**❌ Problem**: Implementation details exposed

```tsx
function LoginStartPage() {
  useCheckLogin({
    onChecked: (status) => {
      if (status === 'LOGGED_IN') {
        location.href = '/home';
      }
    },
  });
  /* ... login logic ... */
}
```

**✅ Solution**: Abstract with HOC or Wrapper Component

```tsx
function App() {
  return (
    <AuthGuard>
      <LoginStartPage />
    </AuthGuard>
  );
}

function AuthGuard({ children }) {
  const status = useCheckLoginStatus();

  useEffect(() => {
    if (status === 'LOGGED_IN') {
      location.href = '/home';
    }
  }, [status]);

  return status !== 'LOGGED_IN' ? children : null;
}
```

---

### Splitting Merged Functions by Logic Type `[🔴 HIGH]`

**Core Concept**: Organize by responsibility, not by technical classification

**❌ Problem**: Managing all query parameters in one hook

```tsx
export function usePageState() {
  const [query, setQuery] = useQueryParams({
    cardId: NumberParam,
    statementId: NumberParam,
    dateFrom: DateParam,
    dateTo: DateParam,
    statusList: ArrayParam,
  });

  return useMemo(
    () => ({
      values: {
        /* all values */
      },
      controls: {
        /* all setters */
      },
    }),
    [query, setQuery]
  );
}
```

**✅ Solution**: Individual hooks per responsibility

```tsx
export function useCardIdQueryParam() {
  const [cardId, _setCardId] = useQueryParam('cardId', NumberParam);

  const setCardId = useCallback((cardId: number) => {
    _setCardId({ cardId }, 'replaceIn');
  }, []);

  return [cardId ?? undefined, setCardId] as const;
}
```

---

### Naming Complex Conditions `[🟠 MEDIUM]`

**Core Concept**: Give explicit names to complex conditional expressions

**❌ Problem**: Complex nested conditions

```tsx
const result = products.filter((product) =>
  product.categories.some(
    (category) =>
      category.id === targetCategory.id &&
      product.prices.some((price) => price >= minPrice && price <= maxPrice)
  )
);
```

**✅ Solution**: Extract conditions with descriptive names

```tsx
const matchedProducts = products.filter((product) => {
  return product.categories.some((category) => {
    const isSameCategory = category.id === targetCategory.id;
    const isPriceInRange = product.prices.some((price) => price >= minPrice && price <= maxPrice);

    return isSameCategory && isPriceInRange;
  });
});
```

---

### Naming Magic Numbers `[🟠 MEDIUM]`

**Core Concept**: Replace unexplained numeric values with named constants

**❌ Problem**: Unclear purpose

```tsx
async function onLikeClick() {
  await postLike(url);
  await delay(300);
  await refetchPostLike();
}
```

**✅ Solution**: Use descriptive constant names

```tsx
const ANIMATION_DELAY_MS = 300;

async function onLikeClick() {
  await postLike(url);
  await delay(ANIMATION_DELAY_MS);
  await refetchPostLike();
}
```

---

### Reducing Context Switching `[🔴 HIGH]`

**Core Concept**: Minimize jumping between files, functions, and variables when reading code

**❌ Problem**: Multiple context switches

```tsx
function Page() {
  const user = useUser();
  const policy = getPolicyByRole(user.role);

  return (
    <div>
      <Button disabled={!policy.canInvite}>Invite</Button>
      <Button disabled={!policy.canView}>View</Button>
    </div>
  );
}

function getPolicyByRole(role) {
  const policy = POLICY_SET[role];
  return {
    canInvite: policy.includes('invite'),
    canView: policy.includes('view'),
  };
}

const POLICY_SET = {
  admin: ['invite', 'view'],
  viewer: ['view'],
};
```

**✅ Solution**: Inline policy object

```tsx
function Page() {
  const user = useUser();
  const policy = {
    admin: { canInvite: true, canView: true },
    viewer: { canInvite: false, canView: true },
  }[user.role];

  return (
    <div>
      <Button disabled={!policy.canInvite}>Invite</Button>
      <Button disabled={!policy.canView}>View</Button>
    </div>
  );
}
```

---

## Predictability

### Avoiding Name Conflicts `[🔴 HIGH]`

**Core Concept**: Functions with the same name should behave identically

**❌ Problem**: Same name, different behaviors

```tsx
// Wrapped HTTP with hidden auth logic
export const http = {
  async get(url: string) {
    const token = await fetchToken(); // Hidden
    return httpLibrary.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};
```

**✅ Solution**: Use distinct names

```tsx
export const httpService = {
  async getWithAuth(url: string) {
    const token = await fetchToken();
    return httpLibrary.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};
```

---

### Consistent Return Types `[🔴 HIGH]`

**Core Concept**: Similar functions should return consistent types

**❌ Problem**: Inconsistent return types

```tsx
function useUser() {
  const query = useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
  });
  return query; // Returns Query object
}

function useServerTime() {
  const query = useQuery({
    queryKey: ['serverTime'],
    queryFn: fetchServerTime,
  });
  return query.data; // Returns data only
}
```

**✅ Solution**: Standardize return types

```tsx
function useUser() {
  return useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
  });
}

function useServerTime() {
  return useQuery({
    queryKey: ['serverTime'],
    queryFn: fetchServerTime,
  });
}
```

---

### Revealing Hidden Logic `[🔴 HIGH]`

**Core Concept**: Make all side effects explicit

**❌ Problem**: Hidden side effects

```tsx
async function fetchBalance(): Promise<number> {
  const balance = await http.get<number>('...');
  logging.log('balance_fetched'); // Hidden
  return balance;
}
```

**✅ Solution**: Separate pure functions from side effects

```tsx
async function fetchBalance(): Promise<number> {
  const balance = await http.get<number>('...');
  return balance;
}

// Side effects handled explicitly at call site
<Button
  onClick={async () => {
    const balance = await fetchBalance();
    logging.log('balance_fetched'); // Explicit
    await syncBalance(balance);
  }}
>
  Update Balance
</Button>;
```

---

## Cohesion

### Co-locating Files That Change Together `[🔴 HIGH]`

**Core Concept**: Group related files that change together

**❌ Problem**: Organizing by technical type

```
└─ src
   ├─ components     # All components mixed
   ├─ hooks          # All hooks mixed
   ├─ utils          # All utils mixed
```

**✅ Solution**: Group by feature/domain

```
└─ src
   ├─ components     # Project-wide shared
   ├─ hooks
   ├─ utils
   └─ domains
      ├─ Domain1    # Domain1-specific
      │   ├─ components
      │   ├─ hooks
      │   └─ utils
      └─ Domain2    # Domain2-specific
          ├─ components
          ├─ hooks
          └─ utils
```

---

## Coupling

### Managing Single Responsibilities `[🔴 HIGH]`

**Core Concept**: Split functions based on specific responsibilities

**❌ Problem**: Broad responsibility

```tsx
export function usePageState() {
  const [query, setQuery] = useQueryParams({
    cardId: NumberParam,
    statementId: NumberParam,
    // ... many more params
  });

  return useMemo(
    () => ({
      values: {
        /* all values */
      },
      controls: {
        /* all setters */
      },
    }),
    [query, setQuery]
  );
}
```

**✅ Solution**: Split by specific responsibilities

```tsx
export function useCardIdQueryParam() {
  const [cardId, _setCardId] = useQueryParam('cardId', NumberParam);

  const setCardId = useCallback((cardId: number) => {
    _setCardId({ cardId }, 'replaceIn');
  }, []);

  return [cardId ?? undefined, setCardId] as const;
}
```

---

### Allowing Code Duplication `[🟠 MEDIUM]`

**Core Concept**: Sometimes duplication is better than premature abstraction

**✅ Solution**: Accept duplication when behavior might diverge

```tsx
// In PageA
const handleMaintenance = async (info: MaintenanceInfo) => {
  logger.log('pageA_maintenance_opened');
  const result = await maintenanceBottomSheet.open(info);
  if (result) {
    logger.log('pageA_maintenance_notification_agreed');
  }
  closeView();
};

// In PageB
const handleMaintenance = async (info: MaintenanceInfo) => {
  logger.log('pageB_maintenance_opened');
  const result = await maintenanceBottomSheet.open(info);
  // PageB doesn't close the view
};
```

---

### Eliminating Props Drilling `[🔴 HIGH]`

**Core Concept**: Reduce coupling caused by unnecessary prop passing

**❌ Problem**: Props drilling

```tsx
function ItemEditModal({ open, items, recommendedItems, onConfirm, onClose }) {
  return (
    <Modal open={open} onClose={onClose}>
      <ItemEditBody items={items} recommendedItems={recommendedItems} onConfirm={onConfirm} />
    </Modal>
  );
}
```

**✅ Solution A**: Composition pattern

```tsx
function ItemEditModal({ open, items, recommendedItems, onConfirm, onClose }) {
  return (
    <Modal open={open} onClose={onClose}>
      <ItemEditBody>
        <ItemEditList items={items} recommendedItems={recommendedItems} onConfirm={onConfirm} />
      </ItemEditBody>
    </Modal>
  );
}
```

**✅ Solution B**: Context API

```tsx
function ItemEditList({ keyword, onConfirm }) {
  const { items, recommendedItems } = useItemEditModalContext();
  // No more drilling
}
```

---

## Related Guidelines

For specific project conventions, see the `rules/` folder:

- [Conditional Rendering](rules/conditional-rendering.md)
- [Custom Hooks](rules/custom-hooks.md)
- [Props and Children Typing](rules/props-typing.md)
- [Form Handling](rules/form-handling.md)
- [Control Flow Syntax](rules/control-flow.md)
- [Naming Conventions](rules/naming-conventions.md)
- [TypeScript Types](rules/typescript-types.md)
- [Boolean and Truthy Checks](rules/boolean-checks.md)
- [Localization](rules/localization.md)
