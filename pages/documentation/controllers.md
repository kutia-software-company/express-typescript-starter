# Controllers

Controllers are the front door of your application. They intercept all incoming requests and return the responses to the client.

The code of a controller should be concise. If necessary, controllers can delegate some tasks to services (usually the business logic).

## Example of usage

```typescript
import { Controller, Param, Body, Get, Post, Put, Delete } from 'routing-controllers';

@Controller()
export class UserController {
    @Get('/users')
    getAll() {
      return 'This action returns all users';
    }

    @Get('/users/:id')
    getOne(@Param('id') id: number) {
      return 'This action returns user #' + id;
    }

    @Post('/users')
    post(@Body() user: any) {
      return 'Saving user...';
    }

    @Put('/users/:id')
    put(@Param('id') id: number, @Body() user: any) {
      return 'Updating a user...';
    }

    @Delete('/users/:id')
    remove(@Param('id') id: number) {
      return 'Removing user...';
    }
}
```

This class will register routes specified in method decorators in your server framework express.js.

Open in browser `http://localhost:3000/users`. You will see `This action returns all users` in your browser.
If you open `http://localhost:3000/users/1` you will see `This action returns user #1`.

## More examples

#### Working with json

If you are designing a REST API where your endpoints always receive and return JSON then
you can use `@JsonController` decorator instead of `@Controller`.
This will guarantee you that data returned by your controller actions always be transformed to JSON
and `Content-Type` header will be always set to `application/json`.
It will also guarantee `application/json` header is understood from the requests and the body parsed as JSON:

```typescript
import { JsonController, Param, Body, Get, Post, Put, Delete } from 'routing-controllers';

@JsonController()
export class UserController {
  @Get('/users')
  getAll() {
    return userRepository.findAll();
  }

  @Get('/users/:id')
  getOne(@Param('id') id: number) {
    return userRepository.findById(id);
  }

  @Post('/users')
  post(@Body() user: User) {
    return userRepository.insert(user);
  }
}
```

#### Return promises

You can return a promise in the controller, and it will wait until promise resolved and return promise result in a response body.

```typescript
import { JsonController, Param, Body, Get, Post, Put, Delete } from 'routing-controllers';

@JsonController()
export class UserController {
  @Get('/users')
  getAll() {
    return userRepository.findAll();
  }

  @Get('/users/:id')
  getOne(@Param('id') id: number) {
    return userRepository.findById(id);
  }

  @Post('/users')
  post(@Body() user: User) {
    return userRepository.insert(user);
  }

  @Put('/users/:id')
  put(@Param('id') id: number, @Body() user: User) {
    return userRepository.updateById(id, user);
  }

  @Delete('/users/:id')
  remove(@Param('id') id: number) {
    return userRepository.removeById(id);
  }
}
```

#### Using Request and Response objects

You can use framework's request and response objects directly. If you want to handle the response by yourself,
just make sure you return the response object itself from the action.

```typescript
import { Controller, Req, Res, Get } from 'routing-controllers';

@Controller()
export class UserController {
  @Get('/users')
  getAllUsers(@Req() request: any, @Res() response: any) {
    return response.send('Hello response!');
  }

  @Get('/posts')
  getAllPosts(@Req() request: any, @Res() response: any) {
    // some response functions don't return the response object,
    // so it needs to be returned explicitly
    response.redirect('/users');

    return response;
  }
}
```

`@Req()` decorator injects you a `Request` object, and `@Res()` decorator injects you a `Response` object.
If you have installed typings, you can use their types:

```typescript
import { Request, Response } from 'express';
import { Controller, Req, Res, Get } from 'routing-controllers';

@Controller()
export class UserController {
  @Get('/users')
  getAll(@Req() request: Request, @Res() response: Response) {
    return response.send('Hello response!');
  }
}
```

#### Prefix controller with base route

You can prefix all specific controller's actions with base route:

```typescript
@Controller('/users')
export class UserController {
  // ...
}
```

#### Inject routing parameters

You can use `@Param` decorator to inject parameters in your controller actions:

```typescript
@Get("/users/:id")
getOne(@Param("id") id: number) { // id will be automatically casted to "number" because it has type number
}
```

If you want to inject all parameters use `@Params()` decorator.

#### Inject query parameters

To inject query parameters, use `@QueryParam` decorator:

```typescript
@Get("/users")
getUsers(@QueryParam("limit") limit: number) {
}
```

If you want to inject all query parameters use `@QueryParams()` decorator.
The biggest benefit of this approach is that you can perform validation of the params.

```typescript
enum Roles {
    Admin = "admin",
    User = "user",
    Guest = "guest",
}

class GetUsersQuery {

    @IsPositive()
    limit: number;

    @IsAlpha()
    city: string;

    @IsEnum(Roles)
    role: Roles;

    @IsBoolean()
    isActive: boolean;

}

@Get("/users")
getUsers(@QueryParams() query: GetUsersQuery) {
    // here you can access query.role, query.limit
    // and others valid query parameters
}
```

#### Inject request body

To inject request body, use `@Body` decorator:

```typescript
@Post("/users")
saveUser(@Body() user: User) {
}
```

If you specify a class type to parameter that is decorated with `@Body()`,
routing-controllers will use [class-transformer][4] to create instance of the given class type from the data received in request body.
To disable this behaviour you need to specify a `{ classTransformer: false }` in RoutingControllerOptions when creating a server.

#### Inject request body parameters

To inject request body parameter, use `@BodyParam` decorator:

```typescript
@Post("/users")
saveUser(@BodyParam("name") userName: string) {
}
```

#### Inject request header parameters

To inject request header parameter, use `@HeaderParam` decorator:

```typescript
@Post("/users")
saveUser(@HeaderParam("authorization") token: string) {
}
```

If you want to inject all header parameters use `@HeaderParams()` decorator.

#### Inject cookie parameters

To get a cookie parameter, use `@CookieParam` decorator:

```typescript
@Get("/users")
getUsers(@CookieParam("username") username: string) {
}
```

If you want to inject all header parameters use `@CookieParams()` decorator.

#### Inject session object

To inject a session value, use `@SessionParam` decorator:

```typescript
@Get("/login")
savePost(@SessionParam("user") user: User, @Body() post: Post) {}
```

If you want to inject the main session object, use `@Session()` without any parameters.

```typescript
@Get("/login")
savePost(@Session() session: any, @Body() post: Post) {}
```

The parameter marked with `@Session` decorator is required by default. If your action param is optional, you have to mark it as not required:

```typescript
action(@Session("user", { required: false }) user: User) {}
```

Express uses [express-session][5] to handle session, so firstly you have to install it manually to use `@Session` decorator.

#### Inject uploaded file

To inject uploaded file, use `@UploadedFile` decorator:

```typescript
@Post("/files")
saveFile(@UploadedFile("fileName") file: Express.Multer.File)) {
}
```

You can also specify uploading options to multer this way:

```typescript
// to keep code clean better to extract this function into separate file
export const fileUploadOptions = () => {
    storage: multer.diskStorage({
        destination: (req: any, file: any, cb: any) => { ...
        },
        filename: (req: any, file: any, cb: any) => { ...
        }
    }),
    fileFilter: (req: any, file: any, cb: any) => { ...
    },
    limits: {
        fieldNameSize: 255,
        fileSize: 1024 * 1024 * 2
    }
};

// use options this way:
@Post("/files")
saveFile(@UploadedFile("fileName", { options: fileUploadOptions }) file: any) {
}
```

To inject all uploaded files use `@UploadedFiles` decorator instead.
Routing-controllers uses [multer][3] to handle file uploads.
You can install multer's file definitions via typings, and use `files: File[]` type instead of `any[]`.

#### Make parameter required

To make any parameter required, simply pass a `required: true` flag in its options:

```typescript
@Post("/users")
save(@Body({ required: true }) user: any) {
    // your method will not be executed if user is not sent in a request
}
```

Same you can do with all other parameters `@QueryParam`, `@BodyParam` and others.
If user request does not contain required parameter routing-controllers will throw an error.

#### Convert parameters to objects

If you specify a class type to parameter that is decorated with parameter decorator,
routing-controllers will use [class-transformer][4] to create instance of that class type.
More info about this feature is available [here](#creating-instances-of-classes-from-action-params).

#### Set custom ContentType

You can specify a custom ContentType header:

```typescript
@Get("/users")
@ContentType("text/csv")
getUsers() {
    // ...
}
```

#### Set Location

You can set a Location header for any action:

```typescript
@Get("/users")
@Location("http://github.com")
getUsers() {
    // ...
}
```

#### Set Redirect

You can set a Redirect header for any action:

```typescript
@Get("/users")
@Redirect("http://github.com")
getUsers() {
    // ...
}
```

You can override the Redirect header by returning a string value:

```typescript
@Get("/users")
@Redirect("http://github.com")
getUsers() {
    return "https://www.google.com";
}
```

You can use template to generate the Redirect header:

```typescript
@Get("/users")
@Redirect("http://github.com/:owner/:repo")
getUsers() {
    return {
        owner: "typestack",
        repo: "routing-controllers"
    };
}
```

#### Set custom HTTP code

You can explicitly set a returned HTTP code for any action:

```typescript
@HttpCode(201)
@Post("/users")
saveUser(@Body() user: User) {
    // ...
}
```

#### Controlling empty responses

If your controller returns `void` or `Promise<void>` or `undefined` it will throw you 404 error.
To prevent this if you need to specify what status code you want to return using `@OnUndefined` decorator.

```typescript
@Delete("/users/:id")
@OnUndefined(204)
async remove(@Param("id") id: number): Promise<void> {
    return userRepository.removeById(id);
}
```

`@OnUndefined` is also useful when you return some object which can or cannot be undefined.
In this example `findOneById` returns undefined in the case if user with given id was not found.
This action will return 404 in the case if user was not found, and regular 200 in the case if it was found.

```typescript
@Get("/users/:id")
@OnUndefined(404)
getOne(@Param("id") id: number) {
    return userRepository.findOneById(id);
}
```

You can also specify error class you want to use if it returned undefined:

```typescript
import { HttpError } from 'routing-controllers';

export class UserNotFoundError extends HttpError {
  constructor() {
    super(404, 'User not found!');
  }
}
```

```typescript
@Get("/users/:id")
@OnUndefined(UserNotFoundError)
saveUser(@Param("id") id: number) {
    return userRepository.findOneById(id);
}
```

If controller action returns `null` you can use `@OnNull` decorator instead.

#### Set custom headers

You can set any custom header in a response:

```typescript
@Get("/users/:id")
@Header("Cache-Control", "none")
getOne(@Param("id") id: number) {
    // ...
}
```

#### Render templates

If you are using server-side rendering you can render any template:

```typescript
@Get("/users/:id")
@Render("index.html")
getOne() {
    return {
        param1: "these params are used",
        param2: "in templating engine"
    };
}
```

To use rendering ability make sure to configure express properly.