---
title: Form Handling
impact: HIGH
tags: forms, react-hook-form, validation, zod
related:
  - typescript-types
  - conditional-rendering
  - props-typing
---

## Form Handling

### Use react-hook-form for Forms `[🔴 HIGH]`

**Core Concept**: Use `react-hook-form` for all form implementations.

**Official Documentation**: https://react-hook-form.com/docs

**Basic Example**:

```tsx
import { useForm } from 'react-hook-form';

interface LoginFormData {
  email: string;
  password: string;
}

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    // handle submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address',
          },
        })}
        placeholder='Email'
        type='email'
      />
      {errors.email && <span className='error'>{errors.email.message}</span>}

      <button type='submit' disabled={isSubmitting}>
        {isSubmitting ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
```

**With Validation Schema (Zod)**:

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Min 8 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    await submitLogin(data);
  };

  return <form onSubmit={handleSubmit(onSubmit)}>{/* form fields */}</form>;
}
```
