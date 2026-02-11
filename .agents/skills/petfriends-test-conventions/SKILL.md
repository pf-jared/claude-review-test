---
name: petfriends-test-conventions
description: Test code conventions and best practices for Petfriends. Use when writing tests, reviewing test code, setting up test infrastructure, or writing Jest/testing-library tests. Covers AAA pattern, mocking strategies, component testing, and test organization.
metadata:
  author: petfriends
  version: '1.0.0'
  argument-hint: <file-or-pattern>
---

# Petfriends Test Conventions

Test conventions for maintaining consistent and effective test code across the Petfriends project. These guidelines emphasize clarity, maintainability, and meaningful test coverage.

## Table of Contents

1. [Testing Tech Stack](#testing-tech-stack)
2. [File Naming and Organization](#file-naming-and-organization)
3. [Test Naming Conventions](#test-naming-conventions)
4. [Test Patterns and Structure](#test-patterns-and-structure)
5. [Mocking and Stubbing](#mocking-and-stubbing)
6. [Common Patterns](#common-patterns)
7. [Guidelines and Best Practices](#guidelines-and-best-practices)
8. [Troubleshooting](#troubleshooting)

---

## Testing Tech Stack

- **JEST** - Testing framework
- **testing-library** - React component testing utilities
- **vitest** - Alternative/complementary test runner

---

## File Naming and Organization

### File Naming Rules

**Format**: `*.test.[ts|tsx]`

**Example**:

```
Button.test.tsx
utils.test.ts
calculatePrice.test.ts
```

### Test File Location

**Rule**: Place test files in the same directory as the source file

**Rationale**: Co-locate test files with their source to make dependencies clear and maintenance easier

**Example**:

```
src/
├── components/
│   ├── Button.tsx
│   └── Button.test.tsx          # Same directory
├── utils/
│   ├── formatDate.ts
│   └── formatDate.test.ts       # Same directory
```

---

## Test Naming Conventions

### Describe and It Blocks

**Format**: Use `describe()` / `it()` or `test()` consistently

```tsx
describe('ComponentName', () => {
  describe('specific behavior group', () => {
    it('should do something specific', () => {
      // test code
    });
  });
});
```

**Rules**:

- `describe` - Groups related tests together
- `it` or `test` - Defines individual test cases (choose one and use consistently)
- Nest describe blocks to organize related functionality

---

## Test Patterns and Structure

### AAA Pattern (Arrange - Act - Assert)

The most widely used test pattern with three clear phases:

#### 1. **Arrange** - Set up test environment

```tsx
// Arrange: Create test data and initialize the component
const initialValue = { name: 'John', age: 30 };
const expectedResult = { name: 'John', age: 31 };
```

**What to do**:

- Create test data and objects
- Initialize the component under test
- Set up necessary state or conditions

#### 2. **Act** - Execute the code being tested

```tsx
// Act: Call the function or trigger user interaction
const result = incrementAge(initialValue);
```

**What to do**:

- Call the function being tested
- Trigger user interactions (clicks, input)
- Execute the specific behavior you're testing

#### 3. **Assert** - Verify the results

```tsx
// Assert: Check that the result is correct
expect(result).toEqual(expectedResult);
```

**What to do**:

- Verify the output matches expectations
- Check that side effects occurred correctly
- Ensure state changed as intended

### Complete AAA Example

```tsx
describe('calculateTotal function', () => {
  it('should correctly sum array of numbers', () => {
    // Arrange
    const numbers = [1, 2, 3, 4, 5];
    const expectedSum = 15;

    // Act
    const result = calculateTotal(numbers);

    // Assert
    expect(result).toBe(expectedSum);
  });
});
```

### Benefits of AAA Pattern

- **Readability**: Clear structure makes tests easy to understand
- **Maintainability**: Each phase is independent and modifiable
- **Clarity**: Easy to identify what failed and why

---

## Mocking and Stubbing

### Hook Mocking with jest.mock()

**Pattern**: Mock external hooks and dependencies

```tsx
jest.mock('react-hook-form', () => ({
  useController: jest.fn(),
}));

jest.mock('custom-hooks', () => ({
  useClaimApplyFormContext: jest.fn(),
}));
```

### beforeEach Setup

**Pattern**: Initialize mocks before each test

```tsx
beforeEach(() => {
  jest.clearAllMocks();

  (useClaimApplyFormContext as jest.Mock).mockReturnValue({
    control: {},
  });

  (useController as jest.Mock).mockReturnValue({
    field: mockField,
  });
});
```

### Common Hook Mocks

**useQuery with QueryClientProvider**:

```tsx
render(
  <QueryClientProvider client={new QueryClient()}>
    <YourComponent />
  </QueryClientProvider>
);
```

**useContext/Custom Hooks**:

```tsx
(useClaimApplyFormContext as jest.Mock).mockReturnValue({
  control: {},
  formState: { errors: {} },
});
```

---

## Common Patterns

### Testing Async Code

```tsx
it('should fetch data correctly', async () => {
  // Arrange
  const mockData = { id: 1, name: 'Test' };

  // Act
  const data = await fetchData();

  // Assert
  expect(data).toEqual(mockData);
});
```

### Testing Component State Changes

```tsx
it('should update onChange handler when input changes', () => {
  // Arrange
  const mockOnChange = jest.fn();
  render(<TextInput onChange={mockOnChange} />);

  const input = screen.getByRole('textbox');

  // Act
  fireEvent.change(input, { target: { value: 'test input' } });

  // Assert
  expect(mockOnChange).toHaveBeenCalledWith(expect.anything());
});
```

### Testing with Time (useFakeTimers)

```tsx
it('should format date correctly', () => {
  // Arrange
  jest.useFakeTimers();
  jest.setSystemTime(new Date('2024-01-01'));

  // Act
  const result = getDayLabel('2024-01-01');

  // Assert
  expect(result).toBe('오늘');

  jest.useRealTimers();
});
```

---

## Guidelines and Best Practices

### 1. DRY Principle - Avoid Repetition

**Pattern**: Use `beforeEach`/`afterEach` and shared utilities

```tsx
beforeEach(() => {
  jest.clearAllMocks();
  setupDefaultMocks();
});

afterEach(() => {
  cleanup();
});

// Shared mock setup
const setupDefaultMocks = () => {
  (useQuery as jest.Mock).mockReturnValue({
    data: defaultData,
    isLoading: false,
  });
};
```

### 2. Organize Tests with Describe Blocks

**Bad**:

```tsx
it('test 1', () => {});
it('test 2', () => {});
it('test 3', () => {});
```

**Good**:

```tsx
describe('ClaimReason Component', () => {
  describe('when rendering', () => {
    it('should display placeholder text', () => {});
    it('should show character count', () => {});
  });

  describe('when user interacts', () => {
    it('should call onChange handler on input', () => {});
    it('should update character count on type', () => {});
  });
});
```

### 3. Use Clear and Descriptive Test Names

**Bad**:

```tsx
it('test input', () => {});
it('validates', () => {});
it('check', () => {});
```

**Good**:

```tsx
it('should display email validation error when email is invalid', () => {});
it('should call onSubmit with form data when submit button is clicked', () => {});
it('should disable submit button when form has errors', () => {});
```

### 4. Avoid Hardcoded Values in Test Names

**Bad**:

```tsx
it('should work before 12:00 AM', () => {}); // Specific time value
it('should render for 300ms', () => {}); // Hardcoded timing
```

**Good**:

```tsx
it('should work before delivery cutoff time', () => {});
it('should complete animation within expected duration', () => {});
```

### 5. Consider Using `each` for Similar Tests

**Pattern**: Test multiple cases with shared logic

```tsx
describe.each([
  { status: 'pending', expected: '$primary' },
  { status: 'approved', expected: '$success' },
  { status: 'rejected', expected: '$error' },
])('getFontColor for %s status', ({ status, expected }) => {
  it('should return correct color', () => {
    const result = getFontColor(status);
    expect(result).toBe(expected);
  });
});
```

### 6. Add AAA Comments for Clarity

```tsx
it('should increment counter on button click', () => {
  // Arrange
  render(<Counter initialValue={0} />);
  const button = screen.getByRole('button');

  // Act
  fireEvent.click(button);

  // Assert
  expect(screen.getByText('1')).toBeInTheDocument();
});
```

### 7. Test Both Success and Failure Cases

**Anti-pattern**: Only testing happy path

```tsx
// ❌ Bad - only success case
it('should submit form', () => {
  const { getByRole } = render(<Form />);
  fireEvent.click(getByRole('button'));
  expect(mockSubmit).toHaveBeenCalled();
});
```

**Good pattern**: Include error cases

```tsx
// ✅ Good - multiple scenarios
describe('Form submission', () => {
  it('should submit valid form data', () => {});
  it('should show validation errors for invalid email', () => {});
  it('should prevent submission when required fields are empty', () => {});
  it('should handle server errors gracefully', () => {});
});
```

---

## Troubleshooting

### Common Issues

#### Hook Mocking Issues

**Error**: `useRouter is not defined`, `useQuery is not set up`

**Solution**: Mock the hook in `beforeEach`:

```tsx
beforeEach(() => {
  (useRouter as jest.Mock).mockReturnValue({
    query: {},
    push: jest.fn(),
  });
});
```

#### QueryClient Not Initialized

**Error**: `No QueryClient set up`

**Solution**: Wrap component with QueryClientProvider

```tsx
render(
  <QueryClientProvider client={new QueryClient()}>
    <YourComponent />
  </QueryClientProvider>
);
```

#### State Updates Not Wrapped in act()

**Error**: `Warning: An update to ... was not wrapped in act(...)`

**Solution**: Use `act()` function from testing-library

```tsx
import { act } from '@testing-library/react';

act(() => {
  fireEvent.click(button);
});
```

#### Date/Time Related Test Failures

**Error**: Tests fail when run at different times

**Solution**: Use `jest.useFakeTimers()` to control time

```tsx
beforeEach(() => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date('2024-01-15'));
});

afterEach(() => {
  jest.useRealTimers();
});
```

---

## Real-World Examples

### Utility Function Test

```tsx
describe('getFontColor function', () => {
  describe('for refund/exchange status', () => {
    it('should return $primary for blank status', () => {
      // Arrange
      const status = '';
      const expected = '$primary';

      // Act
      const { fontColor } = getFontColor(status);

      // Assert
      expect(fontColor).toBe(expected);
    });

    it('should return $red for rejected status', () => {
      // Arrange
      const status = '반려';
      const expected = '$red';

      // Act
      const { fontColor } = getFontColor(status);

      // Assert
      expect(fontColor).toBe(expected);
    });
  });
});
```

### Component Test

```tsx
describe('ClaimReason Component', () => {
  const mockField = {
    onChange: jest.fn(),
    value: '',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useClaimApplyFormContext as jest.Mock).mockReturnValue({
      control: {},
    });
    (useController as jest.Mock).mockReturnValue({ field: mockField });
  });

  it('should display placeholder text correctly', () => {
    // Arrange
    render(<ClaimReason />);

    // Act
    const textarea = screen.getByPlaceholderText(/교환\/반품 신청사유를 자세히 적어주세요/i);

    // Assert
    expect(textarea).toBeInTheDocument();
  });

  it('should call onChange handler when user types', () => {
    // Arrange
    render(<ClaimReason />);
    const textarea = screen.getByRole('textbox');

    // Act
    fireEvent.change(textarea, { target: { value: '상품이 마음에 들지 않아요' } });

    // Assert
    expect(mockField.onChange).toHaveBeenCalledWith(expect.anything());
  });

  it('should display character count correctly', () => {
    // Arrange
    (useController as jest.Mock).mockReturnValue({
      field: { onChange: jest.fn(), value: '테스트 입력' },
    });
    render(<ClaimReason />);

    // Assert
    expect(screen.getByText('6/500자')).toBeInTheDocument();
  });
});
```

---

## Key Principles

1. **Test Behavior, Not Implementation** - Focus on what the component does, not how it does it
2. **Write Readable Tests** - Tests are documentation; they should be clear to others
3. **One Assertion Focus** - Each test should verify one main behavior
4. **Independent Tests** - Tests should not depend on each other or execution order
5. **Test Both Paths** - Include success cases, error cases, and edge cases
6. **Maintain Tests** - Update tests when requirements change, keep them in sync with code

---

## References

- [Jest Documentation](https://jestjs.io/)
- [Testing Library Documentation](https://testing-library.com/)
- [React Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
