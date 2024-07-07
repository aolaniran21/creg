class HttpExceptions extends Error {
  success: boolean;
  message: string;
  status: number;
  constructor(success: boolean, status: number, message: string) {
    super(message);
    this.success = success;
    this.status = status;
    this.message = message;
  }
}

export default HttpExceptions;
