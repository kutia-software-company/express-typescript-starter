# HTTP Errors

If you want to return errors with specific error codes, there is an easy way:


```typescript
@Get("/users/:id")
getOne(@Param("id") id: number) {

    const user = this.userRepository.findOneById(id);
    if (!user)
        throw new NotFoundError(`User was not found.`); // message is optional

    return user;
}
```

Now, when user won't be found with requested id, response will be with http status code 404 and following content:

```json
{
  "name": "NotFoundError",
  "message": "User was not found."
}
```

There are set of prepared errors you can use:

- HttpError
- BadRequestError
- ForbiddenError
- InternalServerError
- MethodNotAllowedError
- NotAcceptableError
- NotFoundError
- UnauthorizedError

You can also create and use your own errors by extending `HttpError` class.
To define the data returned to the client, you could define a toJSON method in your error.

```typescript
class DbError extends HttpError {
  public operationName: string;
  public args: any[];

  constructor(operationName: string, args: any[] = []) {
    super(500);
    Object.setPrototypeOf(this, DbError.prototype);
    this.operationName = operationName;
    this.args = args; // can be used for internal logging
  }

  toJSON() {
    return {
      status: this.httpCode,
      failedOperation: this.operationName,
    };
  }
}
```