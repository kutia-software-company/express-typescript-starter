# Interceptors

Interceptors are used to change or replace the data returned to the client.
You can create your own interceptor class or function and use to all or specific controller or controller action.
It works pretty much the same as middlewares.

### Interceptor function

The easiest way is to use functions directly passed to `@UseInterceptor` of the action.

```typescript
import { Get, Param, UseInterceptor } from "routing-controllers";

// ...

@Get("/users")
@UseInterceptor(function(action: Action, content: any) {
    // here you have content returned by this action. you can replace something
    // in it and return a replaced result. replaced result will be returned to the user
    return content.replace(/Mike/gi, "Michael");
})
getOne(@Param("id") id: number) {
    return "Hello, I am Mike!"; // client will get a "Hello, I am Michael!" response.
}
```

You can use `@UseInterceptor` per-action, or per-controller.
If its used per-controller then interceptor will apply to all controller actions.

### Interceptor classes

You can also create a class and use it with `@UseInterceptor` decorator:

```typescript
import { Interceptor, InterceptorInterface, Action } from 'routing-controllers';

export class NameCorrectionInterceptor implements InterceptorInterface {
  intercept(action: Action, content: any) {
    return content.replace(/Mike/gi, 'Michael');
  }
}
```

And use it in your controllers this way:

```typescript
import { Get, Param, UseInterceptor } from "routing-controllers";
import { NameCorrectionInterceptor } from "./NameCorrectionInterceptor";

// ...

@Get("/users")
@UseInterceptor(NameCorrectionInterceptor)
getOne(@Param("id") id: number) {
    return "Hello, I am Mike!"; // client will get a "Hello, I am Michael!" response.
}
```

### Global interceptors

You can create interceptors that will affect all controllers in your project by creating interceptor class
and mark it with `@Interceptor` decorator:

```typescript
import { Interceptor, InterceptorInterface, Action } from 'routing-controllers';

@Interceptor()
export class NameCorrectionInterceptor implements InterceptorInterface {
  intercept(action: Action, content: any) {
    return content.replace(/Mike/gi, 'Michael');
  }
}
```
