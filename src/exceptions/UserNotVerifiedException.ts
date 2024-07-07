import HttpExceptions from "./HttpExceptions";

export default class UserNotVerifiedException extends HttpExceptions {
    constructor() {
        super(
            false,
            404,
            `User is not verified`
        );
    }
}
