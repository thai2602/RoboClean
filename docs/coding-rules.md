# CODING RULES
# RoboClean Landing Page

Version: 1.0

---

# 1. General Principles

## Code Quality

- Readability over cleverness.
- Simplicity over complexity.
- Reusability over duplication.
- Composition over inheritance.
- Follow SOLID principles where applicable.

---

## Languages

Frontend

- TypeScript

Backend

- Java 17+

---

## Formatting

Frontend

- 2 spaces

Backend

- 4 spaces

UTF-8 encoding.

Every file must end with a newline.

---

## Comments

Only explain **why**, not **what**.

Good

```ts
// Delay animation to improve perceived performance.
```

Bad

```ts
// Increase count by one.
count++;
```

---

# 2. Project Structure

Frontend

```
src/

app/
components/
hooks/
lib/
services/
store/
types/
utils/
```

Backend

```
controller/

service/

repository/

entity/

dto/

mapper/

config/

exception/
```

---

# 3. Naming Convention

## Files

Component

```
hero-section.tsx
```

Hook

```
use-scroll.ts
```

Store

```
cart-store.ts
```

Utility

```
format-price.ts
```

---

## React Components

PascalCase

```
HeroSection
```

---

## Hooks

```
useScrollDepth
```

---

## Variables

camelCase

```
productPrice
```

---

## Constants

UPPER_SNAKE_CASE

```
MAX_ITEMS
```

---

## Java

Class

PascalCase

```
SubscriberService
```

Method

camelCase

```
findSubscriber()
```

Package

lowercase

```
controller
service
```

---

# 4. Frontend Rules

## Components

- Functional Components only.
- One component = one responsibility.
- Prefer composition.
- Avoid deeply nested components.

---

## Styling

- Tailwind CSS only.
- No inline styles except dynamic values.
- No duplicated utility classes.
- Reuse UI components whenever possible.

---

## State Management

Global State

- Cart
- Wishlist
- Recently Viewed

Local State

Use useState.

Server State

Fetch directly from API.

Do not store API data inside Zustand.

---

## useEffect

Only use when necessary.

Avoid using useEffect for data fetching if Server Components can be used.

---

## Data Fetching

Prefer Server Components.

Use Client Components only for interactive UI.

---

# 5. Backend Rules

## Architecture

```
Controller

↓

Service

↓

Repository

↓

Database
```

Controller must never contain business logic.

---

## DTO

Always use DTO.

Never expose Entity directly.

---

## Validation

Use

```
@Valid
```

Use Bean Validation annotations.

---

## Exception Handling

Global Exception Handler only.

Never return stack trace.

Every error must have

```
timestamp

status

message

path
```

---

## Logging

Use SLF4J.

Do not use

```
System.out.println()
```

---

# 6. API Rules

RESTful API.

Example

```
GET /products

GET /products/{id}

POST /subscribers

POST /chat

GET /reviews
```

Response

```json
{
  "success": true,
  "data": {}
}
```

Error

```json
{
  "success": false,
  "message": ""
}
```

---

# 7. Database Rules

UUID as Primary Key.

Snake_case.

UTC timezone.

Never hardcode SQL.

Use Spring Data JPA.

---

# 8. Security Rules

Never expose API Keys.

Store secrets in environment variables.

Validate all input.

Escape user-generated content.

---

# 9. Performance Rules

Frontend

- Lazy Loading
- next/image
- Code Splitting
- Dynamic Import

Backend

- Pagination
- Avoid N+1 Query
- Connection Pool

---

# 10. Testing Rules

Frontend

- Test responsive layouts.
- Test dark mode.
- Test cart persistence.

Backend

- Validate request.
- Test API responses.
- Test exception handling.

---

# 11. Git Workflow

Branch

```
main

develop

feature/*

bugfix/*

hotfix/*
```

---

Commit Message

Use Conventional Commits.

Examples

```
feat: add chatbot widget

fix: resolve hydration error

refactor: simplify product service

docs: update API documentation

style: improve spacing

test: add subscriber tests
```

---

# 12. Pull Request Rules

Before merge

✓ Build passes

✓ No ESLint errors

✓ No TypeScript errors

✓ No console.log()

✓ Responsive verified

✓ API tested

---

# 13. Code Review Checklist

Before completing any feature:

✓ Readable

✓ Reusable

✓ Responsive

✓ Accessible

✓ Type-safe

✓ No duplicated code

✓ No hardcoded values

✓ Performance optimized

✓ Follows Design System