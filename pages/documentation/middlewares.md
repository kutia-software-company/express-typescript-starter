# Middlewares

You can use any existing express middleware, or create your own.
To create your middlewares there is a `@Middleware` decorator,
and to use already exist middlewares there are `@UseBefore` and `@UseAfter` decorators.

### Use existing middleware

There are multiple ways to use middleware.
For example, lets try to use [compression](https://github.com/expressjs/compression) middleware:

1. Install compression middleware: `npm install compression`
2. To use middleware per-action:

```typescript
import { Controller, Get, UseBefore } from "routing-controllers";
let compression = require("compression");

// ...

@Get("/users/:id")
@UseBefore(compression())
getOne(@Param("id") id: number) {
    // ...
}
```

This way compression middleware will be applied only for `getOne` controller action,
and will be executed _before_ action execution.
To execute middleware _after_ action use `@UseAfter` decorator instead.

3. To use middleware per-controller:

```typescript
import { Controller, UseBefore } from 'routing-controllers';
let compression = require('compression');

@Controller()
@UseBefore(compression())
export class UserController {}
```

This way compression middleware will be applied for all actions of the `UserController` controller,
and will be executed _before_ its action execution. Same way you can use `@UseAfter` decorator here.

Alternatively, you can create a custom [global middleware](#global-middlewares) and simply delegate its execution to the compression module.

### Creating your own express middleware

Here is example of creating middleware for express.js:

1. There are two ways of creating middleware:

First, you can create a simple middleware function:

```typescript
export function loggingMiddleware(request: any, response: any, next?: (err?: any) => any): any {
    console.log('do something...');
    next();
}
```

Second you can create a class:

```typescript
import { ExpressMiddlewareInterface } from 'routing-controllers';

export class MyMiddleware implements ExpressMiddlewareInterface {
    // interface implementation is optional

    use(request: any, response: any, next?: (err?: any) => any): any {
    console.log('do something...');
    next();
    }
}
```

2. Then you can use them this way:

```typescript
import { Controller, UseBefore } from 'routing-controllers';
import { MyMiddleware } from './MyMiddleware';
import { loggingMiddleware } from './loggingMiddleware';

@Controller()
@UseBefore(MyMiddleware)
@UseAfter(loggingMiddleware)
export class UserController {}
```

or per-action:

```typescript
@Get("/users/:id")
@UseBefore(MyMiddleware)
@UseAfter(loggingMiddleware)
getOne(@Param("id") id: number) {
    // ...
}
```

`@UseBefore` executes middleware before controller action.
`@UseAfter` executes middleware after each controller action.

### Global middlewares

Global middlewares run before each request, always.
To make your middleware global mark it with `@Middleware` decorator and specify if it runs after or before controllers actions.

```typescript
import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';

@Middleware({ type: 'before' })
export class LoggingMiddleware implements ExpressMiddlewareInterface {
  use(request: any, response: any, next: (err: any) => any): void {
    console.log('do something...');
    next();
  }
}
```