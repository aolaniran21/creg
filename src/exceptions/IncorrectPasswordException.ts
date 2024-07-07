import HttpExceptions from "./HttpExceptions";

export default class IncorrectPasswordException extends HttpExceptions {
  constructor() {
    super(false, 401, "Incorrect password.");
  }
}
