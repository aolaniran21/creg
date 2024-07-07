import { ILoginUser } from "../entity/users/user.interface";
interface ISuccessResponse {
  success: true;
  message: string;
  id?: string;
}

interface GoogleSuccessResponse {
  success: true;
  message: string;
  data: ILoginUser;
}

interface IFailureResponse {
  success: false;
  message: string;
}

interface ILoginAuthSuccessMsg {
  success: true;
  message: string;
  user: ILoginUser;
}

class AuthResponseMsg {
  static successResponse = (id: string): ISuccessResponse => {
    return { success: true, id, message: "registration successful" };
  };

  static failureResponse = (message: string): IFailureResponse => {
    return { success: false, message };
  };

  static googleSuccessResponse = (
    message: string,
    data
  ): GoogleSuccessResponse => {
    return { success: true, message, data };
  };

  static googleFailureResponse = (message: string): IFailureResponse => {
    return { success: false, message };
  };

  static loginAuthSuccessResponse = (
    message: string,
    user: ILoginUser
  ): ILoginAuthSuccessMsg => {
    return { success: true, message, user };
  };

  static requestResetPasswordSuccessResponse = (
    message: string
  ): ISuccessResponse => {
    return { success: true, message };
  };

  static submitResetPasswordSuccessResponse = (
    message: string
  ): ISuccessResponse => {
    return { success: true, message };
  };
}

export default AuthResponseMsg;
