---
name: vercel-react-best-practices
description: React and Next.js patterns and best practices from Vercel Engineering for writing performant, scalable code. Use when writing or reviewing React components, Next.js pages, managing async operations, data fetching patterns, or improving performance. Covers async patterns, bundle optimization, re-render efficiency, rendering performance, and JavaScript optimization.
license: MIT
metadata:
  author: vercel
  version: "1.0.0"
---

# Vercel React Best Practices

Comprehensive performance optimization guide for React and Next.js applications, maintained by Vercel. Contains 39 rules across 7 categories (3 rules excluded for Petfriends compatibility), prioritized by impact to guide automated refactoring and code generation.

## Petfriends Alignment

**Priority:** When performance optimizations conflict with code clarity and maintainability, follow `petfriends-coding-guide`. This guide has been aligned with Petfriends' emphasis on readability-first development by excluding rules that prioritize micro-optimizations over code clarity.

## When to Apply

Reference these guidelines when:

- **Writing code:** Implementing React components, custom hooks, or Next.js pages
- **Data fetching:** Designing API calls, async operations, Promise handling
- **Component patterns:** Creating reusable components, managing re-renders, state management
- **Code review:** Evaluating React/Next.js code for efficiency and patterns
- **Performance:** Identifying and fixing slow operations, large bundles, or inefficient renders
- **Refactoring:** Improving existing React/Next.js code structure and patterns

## Rule Categories by Priority

| Priority | Category                  | Impact      | Prefix       |
| -------- | ------------------------- | ----------- | ------------ |
| 1        | Eliminating Waterfalls    | CRITICAL    | `async-`     |
| 2        | Bundle Size Optimization  | CRITICAL    | `bundle-`    |
| 3        | Client-Side Data Fetching | MEDIUM-HIGH | `client-`    |
| 4        | Re-render Optimization    | MEDIUM      | `rerender-`  |
| 5        | Rendering Performance     | MEDIUM      | `rendering-` |
| 6        | JavaScript Performance    | LOW-MEDIUM  | `js-`        |
| 7        | Advanced Patterns         | LOW         | `advanced-`  |

**Note:** This guide is aligned with `petfriends-coding-guide` for conflicts. When performance optimizations conflict with code clarity and maintainability principles, follow `petfriends-coding-guide`.

## Quick Reference

### 1. Eliminating Waterfalls (CRITICAL)

- `async-defer-await` - Move await into branches where actually used
- `async-parallel` - Use Promise.all() for independent operations
- `async-dependencies` - Use better-all for partial dependencies
- `async-api-routes` - Start promises early, await late in API routes
- `async-suspense-boundaries` - Use Suspense to stream content

### 2. Bundle Size Optimization (CRITICAL)

- `bundle-barrel-imports` - Import directly, avoid barrel files
- `bundle-dynamic-imports` - Use next/dynamic for heavy components
- `bundle-defer-third-party` - Load analytics/logging after hydration
- `bundle-conditional` - Load modules only when feature is activated
- `bundle-preload` - Preload on hover/focus for perceived speed

### 3. Client-Side Data Fetching (MEDIUM-HIGH)

- `client-react-query-dedup` - Use React Query for automatic request deduplication
- `client-event-listeners` - Deduplicate global event listeners

### 4. Re-render Optimization (MEDIUM)

- `rerender-defer-reads` - Don't subscribe to state only used in callbacks
- `rerender-dependencies` - Use primitive dependencies in effects
- `rerender-derived-state` - Subscribe to derived booleans, not raw values
- `rerender-functional-setstate` - Use functional setState for stable callbacks
- `rerender-lazy-state-init` - Pass function to useState for expensive values
- `rerender-transitions` - Use startTransition for non-urgent updates

**Note:** For component memoization and code extraction patterns, follow `petfriends-coding-guide` which emphasizes separating code by responsibility and avoiding over-optimization.

### 5. Rendering Performance (MEDIUM)

- `rendering-animate-svg-wrapper` - Animate div wrapper, not SVG element
- `rendering-content-visibility` - Use content-visibility for long lists
- `rendering-svg-precision` - Reduce SVG coordinate precision
- `rendering-hydration-no-flicker` - Use inline script for client-only data
- `rendering-activity` - Use Activity component for show/hide

**Note:** For conditional rendering patterns and JSX hoisting, follow `petfriends-coding-guide` which mandates using `&&` for single component rendering with explicit boolean conditions and emphasizes code clarity over premature optimization.

### 6. JavaScript Performance (LOW-MEDIUM)

- `js-batch-dom-css` - Group CSS changes via classes or cssText
- `js-index-maps` - Build Map for repeated lookups
- `js-cache-property-access` - Cache object properties in loops
- `js-cache-function-results` - Cache function results in module-level Map
- `js-cache-storage` - Cache localStorage/sessionStorage reads
- `js-combine-iterations` - Combine multiple filter/map into one loop
- `js-length-check-first` - Check array length before expensive comparison
- `js-hoist-regexp` - Hoist RegExp creation outside loops
- `js-min-max-loop` - Use loop for min/max instead of sort
- `js-set-map-lookups` - Use Set/Map for O(1) lookups
- `js-tosorted-immutable` - Use toSorted() for immutability

**Note:** For control flow patterns, follow `petfriends-coding-guide` which emphasizes separating code paths by responsibility rather than using early returns to combine multiple concerns in a single function.

### 7. Advanced Patterns (LOW)

- `advanced-event-handler-refs` - Store event handlers in refs
- `advanced-use-latest` - useLatest for stable callback refs

## How to Use

Read individual rule files for detailed explanations and code examples:

```
rules/async-parallel.md
rules/bundle-barrel-imports.md
rules/_sections.md
```

Each rule file contains:

- Brief explanation of why it matters
- Incorrect code example with explanation
- Correct code example with explanation
- Additional context and references

## Full Compiled Document

For the complete guide with all rules expanded: `AGENTS.md`
