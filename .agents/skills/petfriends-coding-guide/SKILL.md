---
name: petfriends-coding-guide
description: Petfriends project coding conventions and code quality principles. Use when writing, reviewing, or refactoring React/TypeScript code to ensure maintainable, clean code following team standards. Covers component patterns, props typing, form handling, and readability-first principles.
metadata:
  author: petfriends
  version: '1.0.0'
---

# Petfriends Coding Guide

Essential coding conventions and quality principles for the Petfriends project. This guide ensures consistent, maintainable code across React/TypeScript development.

## Quick Start

**Looking for a specific rule?**

- Browse [Specific Conventions in rules/](rules/) - Direct access to project rules

**Want to understand design principles?**

- Read [Quality Principles in AGENTS.md](AGENTS.md) - Foundational code design principles

For full overview, continue reading below.

---

## Part 1: Project Conventions

Specific rules and conventions for implementing code in Petfriends. Each rule is in a separate file under `rules/` for easy lookup.

### Categories

**Core React Patterns**

- [Conditional Rendering](rules/conditional-rendering.md) - Using boolean conditions and short-circuit evaluation
- [Custom Hooks](rules/custom-hooks.md) - Arrow function syntax and generic type patterns
- [Props and Children Typing](rules/props-typing.md) - Explicit ReactNode typing

**Forms & Validation**

- [Form Handling](rules/form-handling.md) - react-hook-form integration and validation

**Code Style**

- [Control Flow Syntax](rules/control-flow.md) - Single-line if statements and block scoping
- [Naming Conventions](rules/naming-conventions.md) - Boolean, event handler, and API function naming
- [TypeScript Types](rules/typescript-types.md) - Interface vs Type, Record strategy
- [Boolean and Truthy Checks](rules/boolean-checks.md) - Explicit boolean conversion with `!!`

**Localization**

- [Localization](rules/localization.md) - Korean locale formatting with toLocaleString

---

## Part 2: Code Quality Principles

Foundational principles that guide all code decisions. Read [AGENTS.md](AGENTS.md) for detailed explanations.

**Readability** - Code that's easy to understand and follow

- Separate code paths that don't execute together
- Abstract implementation details
- Name complex conditions and magic numbers
- Minimize context switching

**Predictability** - Consistent and expected behavior

- Avoid name conflicts (same name = same behavior)
- Maintain consistent return types
- Make side effects explicit

**Cohesion** - Related code stays together

- Co-locate files that change together
- Organize by feature/domain, not by technical type

**Coupling** - Minimize dependencies

- Split by specific responsibilities
- Allow duplication when behavior might diverge
- Eliminate props drilling

---

## References

- [Frontend Fundamentals](https://frontend-fundamentals.com/code-quality/) by Toss
- [펫프렌즈 React 컨벤션](https://www.notion.so/petfriends/REACT-1cf6fc4eb78a80f8b130c5dba928bdff)
- [펫프렌즈 JS/TS 컨벤션](https://www.notion.so/petfriends/JS-TS-1cf6fc4eb78a8095b2a4ddeedffb65a6)

## Related Guidelines

When working on Petfriends code, also reference:

- **vercel-react-best-practices** - For performance patterns and optimization (when not conflicting with readability)
- **query-factory-guide** - For React Query usage and API data fetching
- **petfriends-test-conventions** - For writing tests that follow team standards
