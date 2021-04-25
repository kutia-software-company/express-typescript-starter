# Decorators

## Custom parameter decorators

You can create your own parameter decorators.
Here is simple example how "session user" can be implemented using custom decorators:

```typescript
import { createParamDecorator } from 'routing-controllers';

export function UserFromSession(options?: { required?: boolean }) {
  return createParamDecorator({
    required: options && options.required ? true : false,
    value: action => {
      const token = action.request.headers['authorization'];
      return database.findUserByToken(token);
    },
  });
}
```

And use it in your controller:

```typescript
@JsonController()
export class QuestionController {
  @Post()
  save(@Body() question: Question, @UserFromSession({ required: true }) user: User) {
    // here you'll have user authorized and you can safely save your question
    // in the case if user returned your undefined from the database and "required"
    // parameter was set, routing-controllers will throw you ParameterRequired error
  }
}
```

## Decorators Reference

#### Controller Decorators

| Signature                            | Example                                              | Description                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ------------------------------------ | ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@Controller(baseRoute: string)`     | `@Controller("/users") class SomeController`         | Class that is marked with this decorator is registered as controller and its annotated methods are registered as actions. Base route is used to concatenate it to all controller action routes.                                                                                                                                                                                                                                                     |
| `@JsonController(baseRoute: string)` | `@JsonController("/users") class SomeJsonController` | Class that is marked with this decorator is registered as controller and its annotated methods are registered as actions. Difference between @JsonController and @Controller is that @JsonController automatically converts results returned by controller to json objects (using JSON.parse) and response being sent to a client is sent with application/json content-type. Base route is used to concatenate it to all controller action routes. |

#### Controller Action Decorators

| Signature                                            | Example                                | Description                                                                                                                                                                                                      | express.js analogue                |
| ---------------------------------------------------- | -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| `@Get(route: string\|RegExp)`                        | `@Get("/users") all()`                 | Methods marked with this decorator will register a request made with GET HTTP Method to a given route. In action options you can specify if action should response json or regular text response.                | `app.get("/users", all)`           |
| `@Post(route: string\|RegExp)`                       | `@Post("/users") save()`               | Methods marked with this decorator will register a request made with POST HTTP Method to a given route. In action options you can specify if action should response json or regular text response.               | `app.post("/users", save)`         |
| `@Put(route: string\|RegExp)`                        | `@Put("/users/:id") update()`          | Methods marked with this decorator will register a request made with PUT HTTP Method to a given route. In action options you can specify if action should response json or regular text response.                | `app.put("/users/:id", update)`    |
| `@Patch(route: string\|RegExp)`                      | `@Patch("/users/:id") patch()`         | Methods marked with this decorator will register a request made with PATCH HTTP Method to a given route. In action options you can specify if action should response json or regular text response.              | `app.patch("/users/:id", patch)`   |
| `@Delete(route: string\|RegExp)`                     | `@Delete("/users/:id") delete()`       | Methods marked with this decorator will register a request made with DELETE HTTP Method to a given route. In action options you can specify if action should response json or regular text response.             | `app.delete("/users/:id", delete)` |
| `@Head(route: string\|RegExp)`                       | `@Head("/users/:id") head()`           | Methods marked with this decorator will register a request made with HEAD HTTP Method to a given route. In action options you can specify if action should response json or regular text response.               | `app.head("/users/:id", head)`     |
| `@All(route: string\|RegExp)`                        | `@All("/users/me") rewrite()`          | Methods marked with this decorator will register a request made with any HTTP Method to a given route. In action options you can specify if action should response json or regular text response.                | `app.all("/users/me", rewrite)`    |
| `@Method(methodName: string, route: string\|RegExp)` | `@Method("move", "/users/:id") move()` | Methods marked with this decorator will register a request made with given `methodName` HTTP Method to a given route. In action options you can specify if action should response json or regular text response. | `app.move("/users/:id", move)`     |

#### Method Parameter Decorators

| Signature                                               | Example                                          | Description                                                                                                                | express.js analogue                |
| ------------------------------------------------------- | ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| `@Req()`                                                | `getAll(@Req() request: Request)`                | Injects a Request object.                                                                                                  | `function (request, response)`     |
| `@Res()`                                                | `getAll(@Res() response: Response)`              | Injects a Response object.                                                                                                 | `function (request, response)`     |
| `@Param(name: string, options?: ParamOptions)`          | `get(@Param("id") id: number)`                   | Injects a router parameter.                                                                                                | `request.params.id`                |
| `@Params()`                                             | `get(@Params() params: any)`                     | Injects all router parameters.                                                                                             | `request.params`                   |
| `@QueryParam(name: string, options?: ParamOptions)`     | `get(@QueryParam("id") id: number)`              | Injects a query string parameter.                                                                                          | `request.query.id`                 |
| `@QueryParams()`                                        | `get(@QueryParams() params: any)`                | Injects all query parameters.                                                                                              | `request.query`                    |
| `@HeaderParam(name: string, options?: ParamOptions)`    | `get(@HeaderParam("token") token: string)`       | Injects a specific request headers.                                                                                        | `request.headers.token`            |
| `@HeaderParams()`                                       | `get(@HeaderParams() params: any)`               | Injects all request headers.                                                                                               | `request.headers`                  |
| `@CookieParam(name: string, options?: ParamOptions)`    | `get(@CookieParam("username") username: string)` | Injects a cookie parameter.                                                                                                | `request.cookie("username")`       |
| `@CookieParams()`                                       | `get(@CookieParams() params: any)`               | Injects all cookies.                                                                                                       | `request.cookies`                  |
| `@Session()`                                            | `get(@Session() session: any)`                   | Injects the whole session object.                                                                                          | `request.session`                  |
| `@SessionParam(name: string)`                           | `get(@SessionParam("user") user: User)`          | Injects an object from session property.                                                                                   | `request.session.user`             |
| `@Body(options?: BodyOptions)`                          | `post(@Body() body: any)`                        | Injects a body. In parameter options you can specify body parser middleware options.                                       | `request.body`                     |
| `@BodyParam(name: string, options?: ParamOptions)`      | `post(@BodyParam("name") name: string)`          | Injects a body parameter.                                                                                                  | `request.body.name`                |
| `@UploadedFile(name: string, options?: UploadOptions)`  | `post(@UploadedFile("filename") file: any)`      | Injects uploaded file from the response. In parameter options you can specify underlying uploader middleware options.      | `request.file.file` (using multer) |
| `@UploadedFiles(name: string, options?: UploadOptions)` | `post(@UploadedFiles("filename") files: any[])`  | Injects all uploaded files from the response. In parameter options you can specify underlying uploader middleware options. | `request.files` (using multer)     |

#### Middleware and Interceptor Decorators

| Signature                                  | Example                                                | Description                                                                      |
| ------------------------------------------ | ------------------------------------------------------ | -------------------------------------------------------------------------------- |
| `@Middleware({ type: "before"\|"after" })` | `@Middleware({ type: "before" }) class SomeMiddleware` | Registers a global middleware.                                                   |
| `@UseBefore()`                             | `@UseBefore(CompressionMiddleware)`                    | Uses given middleware before action is being executed.                           |
| `@UseAfter()`                              | `@UseAfter(CompressionMiddleware)`                     | Uses given middleware after action is being executed.                            |
| `@Interceptor()`                           | `@Interceptor() class SomeInterceptor`                 | Registers a global interceptor.                                                  |
| `@UseInterceptor()`                        | `@UseInterceptor(BadWordsInterceptor)`                 | Intercepts result of the given controller/action and replaces some values of it. |

#### Other Decorators

| Signature                                                        | Example                                           | Description                                                                                                                                 |
| ---------------------------------------------------------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `@Authorized(roles?: string\|string[])`                          | `@Authorized("SUPER_ADMIN")` get()                | Checks if user is authorized and has given roles on a given route. `authorizationChecker` should be defined in routing-controllers options. |  |
| `@CurrentUser(options?: { required?: boolean })`                 | get(@CurrentUser({ required: true }) user: User)  | Injects currently authorized user. `currentUserChecker` should be defined in routing-controllers options.                                   |
| `@Header(headerName: string, headerValue: string)`               | `@Header("Cache-Control", "private")` get()       | Allows to explicitly set any HTTP header returned in the response.                                                                          |
| `@ContentType(contentType: string)`                              | `@ContentType("text/csv")` get()                  | Allows to explicitly set HTTP Content-Type returned in the response.                                                                        |
| `@Location(url: string)`                                         | `@Location("http://github.com")` get()            | Allows to explicitly set HTTP Location header returned in the response.                                                                     |
| `@Redirect(url: string)`                                         | `@Redirect("http://github.com")` get()            | Allows to explicitly set HTTP Redirect header returned in the response.                                                                     |
| `@HttpCode(code: number)`                                        | `@HttpCode(201)` post()                           | Allows to explicitly set HTTP code to be returned in the response.                                                                          |
| `@OnNull(codeOrError: number\|Error)`                            | `@OnNull(201)` post()                             | Sets a given HTTP code when controller action returned null.                                                                                |
| `@OnUndefined(codeOrError: number\|Error)`                       | `@OnUndefined(201)` post()                        | Sets a given HTTP code when controller action returned undefined.                                                                           |
| `@ResponseClassTransformOptions(options: ClassTransformOptions)` | `@ResponseClassTransformOptions({/*...*/})` get() | Sets options to be passed to class-transformer when it used for classToPlain a response result.                                             |
| `@Render(template: string)`                                      | `@Render("user-list.html")` get()                 | Renders a given html template. Data returned by a controller serve as template variables.                                                   |
