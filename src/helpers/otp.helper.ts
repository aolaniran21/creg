export default class OTPHelper {
  generateOTP(): string {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    return otp;
  }
}
