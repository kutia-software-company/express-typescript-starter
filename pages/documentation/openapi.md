# OpenAPI

OpenAPI Specification (formerly known as Swagger Specification) is an API description format for REST APIs. An OpenAPI document allows developers to describe entirely an API.

Swagger UI is a graphical interface to visualize and interact with the API’s resources. It is automatically generated from one or several OpenAPI documents.

Project included [routing-controllers-openapi](https://github.com/epiphone/routing-controllers-openapi) to make API Documentation easy.

To view docs open: `http://localhost:3000/docs`.

### Decorating with additional keywords

Use the `@OpenAPI` decorator to supply your actions with additional keywords:

```typescript
import { OpenAPI } from 'routing-controllers-openapi'

@JsonController('/users')
export class UsersController {
  @Get('/')
  @OpenAPI({
    description: 'List all available users',
    responses: {
      '400': {
        description: 'Bad request',
      },
    },
  })
  listUsers() {
    // ...
  }
}
```


The parameter object consists of any number of properties from the [Operation object](https://swagger.io/specification/#operationObject). These properties are then merged into the spec, overwriting any existing values.

Alternatively you can call `@OpenAPI` with a function of type `(source: OperationObject, route: IRoute) => OperationObject`, i.e. a function receiving the existing spec as well as the target route, spitting out an updated spec. This function parameter can be used to implement for example your own merging logic or custom decorators.

#### Multiple `@OpenAPI` decorators

A single handler can be decorated with multiple `@OpenAPI`s. Note though that since decorators are applied top-down, any possible duplicate keys are overwritten by subsequent decorators:

```typescript
  @OpenAPI({
    summary: 'This value will be overwritten!',
    description: 'This value will remain'
  })
  @OpenAPI({
    summary: 'This value will remain'
  })
  listUsers() {
    // ...
  }
```

Multiple `@OpenAPI`s are merged together with [`lodash/merge`](https://lodash.com/docs/4.17.11#merge) which has [a few interesting properties](https://github.com/lodash/lodash/issues/1313) to keep in mind when it comes to arrays. Use the function parameter described above when strict control over merging logic is required.

#### Class `@OpenAPI` decorator

Using `@OpenAPI` on the controller class effectively applies given spec to each class method. Method-level `@OpenAPI`s are merged into class specs, with the former having precedence:

```typescript
@OpenAPI({
  security: [{ basicAuth: [] }], // Applied to each method
})
@JsonController('/users')
export class UsersController {
  // ...
}
```

### Annotating response schemas

As a workaround you can use the `@ResponseSchema` decorator to supply the response body schema:

```typescript
import { ResponseSchema } from 'routing-controllers-openapi'

@JsonController('/users')
export class UsersController {
  @Get('/:id')
  @ResponseSchema(User)
  getUser() {
    // ...
  }
}
```

`@ResponseSchema` takes as an argument either a class-validator class or a plain string schema name. You can also supply an optional secondary `options` argument:

```typescript
  @Post('/')
  @ResponseSchema(User, {
    contentType: 'text/csv',
    description: 'A list of created user objects',
    isArray: true
    statusCode: '201'})
  createUsers() {
    // ...
  }
```

`contentType` and `statusCode` default to routing-controller's `@ContentType` and `@HttpCode` values. To specify a response schema of an array, set `options.isArray` as `true`. You can also annotate a single handler with multiple `ResponseSchema`s to specify responses with different status codes.

Note that when using `@ResponseSchema` together with `@JSONSchema`, the outer decorator will overwrite keys of inner decorators. So in the following example, information from `@ResponseSchema` would be overwritten by `@JSONSchema`:

```typescript
@JSONSchema({responses: {
  '200': {
    'content': {
      'application/json': {
        schema: {
          '$ref': '#/components/schemas/Pet'
        }
      }
    ]
  }
}})
@ResponseSchema(SomeResponseObject)
handler() { ... }
```

#### Multiple ResponseSchemas

Multiple ResponseSchemas with different status codes are supported as follows.

```typescript
@ResponseSchema(Response1)
@ResponseSchema(Response2, {statusCode: '400'})
```

In case of multiple ResponseSchemas being registered with the same status code, we resolve them
using the [oneOf](https://swagger.io/docs/specification/data-models/oneof-anyof-allof-not/#oneof) operator.

```typescript
@ResponseSchema(Response1)
@ResponseSchema(Response2)
```

will generate

```json
"200": {
  "content": {
    "application/json":{
      "schema": {
        "oneOf": [
          {$ref: "#/components/schemas/Response1"},
          {$ref: "#/components/schemas/Response2"}
        ]
      }
    }
  }
}
```