---
title: Props and Children Typing
impact: HIGH
tags: typescript, props, children, react, types
related:
  - typescript-types
  - conditional-rendering
---

## Props and Children Typing

### Explicitly Type Children Props `[🔴 HIGH]`

**Core Concept**: Always explicitly type the `children` prop using `ReactNode` instead of extending `PropsWithChildren`.

**✅ Correct**:

```tsx
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  title: string;
  sidebar?: ReactNode;
}

export function Layout({ children, title, sidebar }: LayoutProps) {
  return (
    <div>
      <h1>{title}</h1>
      {sidebar && <aside>{sidebar}</aside>}
      <main>{children}</main>
    </div>
  );
}
```

**❌ Avoid**:

```tsx
import { PropsWithChildren } from 'react';

interface LayoutProps extends PropsWithChildren {
  title: string;
  sidebar?: ReactNode;
}
```

**Why ReactNode over PropsWithChildren?**

- More explicit and readable
- Easier to understand prop structure
- No implicit inheritance, clearer dependencies
- Allows multiple children props if needed
