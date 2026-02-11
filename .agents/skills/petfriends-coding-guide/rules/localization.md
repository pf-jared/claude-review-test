---
title: Localization
impact: MEDIUM
tags: localization, korean, i18n, formatting, date, currency
---

## Localization

### toLocaleString with Korean Locale `[🟠 MEDIUM]`

**Core Concept**: When using `.toLocaleString()` for Korean localization, explicitly specify `'ko-KR'` locale.

**✅ Correct**:

```tsx
const price = 1000000;
const priceWithLocale = price.toLocaleString('ko-KR');
// Result: "1,000,000"

const date = new Date();
const dateWithLocale = date.toLocaleString('ko-KR');
// Result: "2024. 1. 15. 오후 3:30:00"

const formattedNumber = (123456.789).toLocaleString('ko-KR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
// Result: "123,456.79"
```

**❌ Avoid - No locale specified**:

```tsx
const price = 1000000;
const priceWithLocale = price.toLocaleString(); // Uses browser default
```

**Common Use Cases**:

```tsx
// Currency formatting
const formatCurrency = (amount: number) => {
  return `₩${amount.toLocaleString('ko-KR')}`;
};

// Date formatting
const formatDate = (date: Date) => {
  return date.toLocaleString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Number formatting with options
const formatPercentage = (value: number) => {
  return value.toLocaleString('ko-KR', {
    style: 'percent',
    minimumFractionDigits: 1,
  });
};
```

**Note**: Use `'ko-KR'` (not `'kr'`) for proper Korean locale formatting according to BCP 47 standard.
