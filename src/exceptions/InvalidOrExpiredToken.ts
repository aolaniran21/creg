import HttpExceptions from "./HttpExceptions";

export default class InvalidOrExpiredToken extends HttpExceptions {
  constructor() {
    super(false, 401, `Invalid verification token.`);
  }
}
