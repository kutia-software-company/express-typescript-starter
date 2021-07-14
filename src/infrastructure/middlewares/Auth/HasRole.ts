export function HasRole(role: string | string[]): any {
  return function (request: any, response: any, next: any) {
    const loggedUser = request.loggedUser;
    let haveAccess = true;

    if (!loggedUser) {
      return response.status(403).send({ status: 401, message: 'Unauthorized!' });
    }

    if (typeof role == 'string') {
      if (loggedUser.role != role) {
        haveAccess = false;
      }
    } else {
      if (!role.includes(loggedUser.role)) {
        haveAccess = false;
      }
    }

    if (!haveAccess) {
      return response.status(403).send({
        status: 403,
        message: 'User does not have the right permissions!',
      });
    }

    return next();
  };
}
