//  ApplicationError is for other unknown errors only, Its not for unknown route
export class ApplicationError extends Error {
  constructor(message: string) {
    super();
    this.message = message;
  }

  getCode() {
    return 500;
  }
}

// for login only -> not for signup is db error
export class Unauthorized extends ApplicationError {
  constructor(message: string) {
    super(message);
    this.name = "Unauthorized";
  }
  getCode() {
    return 401;
  }
}

// HTTP 409 Conflict -> Duplication
export class Conflict extends ApplicationError {
  constructor(message: string) {
    super(message);
    this.name = "Conflict";
  }
  getCode() {
    return 409;
  }
}

// 403 Forbidden
export class Forbidden extends ApplicationError {
  constructor(message: string) {
    super(message);
    this.name = "Forbidden";
  }
  getCode() {
    return 403;
  }
}

export class BadRequest extends ApplicationError {
  constructor(message: string) {
    super(message);
    this.name = "BadRequest";
  }
  getCode() {
    return 400;
  }
}

export class NotFound extends ApplicationError {
  constructor(message: string) {
    super(message);
    this.name = "NotFound";
  }

  getCode() {
    return 404;
  }
}
