import HttpExceptions from "./HttpExceptions";

export default class ThereIsAlreadyAUserWithThatEmail extends HttpExceptions {
  constructor(email: string) {
    super(false, 401, `A user with the email ${email} already exists.`);
  }
}
