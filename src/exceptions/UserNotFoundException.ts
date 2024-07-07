import HttpExceptions from "./HttpExceptions";

export default class UserNotFoundException extends HttpExceptions {
  constructor(email: string) {
    super(
      false,
      404,
      `No records found for this user. Kindly proceed to signup.`
    );
  }
}
