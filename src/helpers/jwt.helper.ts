var jwt = require("jsonwebtoken");


export class JWTHelper {
    // generateOTP(): string {
    //     const otp = Math.floor(100000 + Math.random() * 900000).toString();
    //     return otp;
    // }

    createAccessToken: any = (payload, expireIn, secret) => {
        return jwt.sign(payload, secret, {
            expiresIn: expireIn
        });
    };

    createRefreshToken: any = (payload, key, expireAt) => {
        return jwt.sign(payload, key, {
            expiresIn: expireAt,
        });
    };

    generateAuthTokens = async (username, role) => {
        const accessTokenPayload = { username: username, role: role };
        const refreshTokenPayload = { username: username, role: role };
        const accessToken = jwt.sign(
            accessTokenPayload,
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: "60m", // Access token expiration time
            }
        );
        const refreshToken = jwt.sign(
            refreshTokenPayload,
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: "3h", // Refresh token expiration time
            }
        );
        const expiresIn = new Date();
        expiresIn.setMinutes(expiresIn.getMinutes() + 60);

        const refreshTokenExpiresIn = new Date();
        refreshTokenExpiresIn.setHours(refreshTokenExpiresIn.getHours() + 3);

        return { accessToken, refreshToken, expiresIn, refreshTokenExpiresIn };
    };

    refreshToken = async (refreshToken: string) => {
        try {
            const decoded = jwt.verify(
                refreshToken,
                process.env.REFRESH_TOKEN_SECRET
            );
            const username = decoded.username;
            const role = decoded.role;
            const {
                accessToken,
                refreshToken: newRefreshToken,
                expiresIn,
                refreshTokenExpiresIn,
            } = await this.generateAuthTokens(username, role);

            return { accessToken, refreshToken, expiresIn }

        } catch (error) {
            // Sentry.captureException(error);
            throw error;
        }
    };

    getToken: any = (req) => {
        if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
            return req.headers.authorization.split(" ")[1];
        } else if (req.query && req.query.token) {
            return req.query.token;
        } else if (req.cookies && req.cookies['access_token']) {
            return req.cookies['access_token'];
        }

        return null;
    };

    // authenticateToken: any = (token, key) => {

    //     if (token == null)
    //         return null

    //     jwt.verify(token, key, (err, user) => {
    //         console.log(user)
    //         if (err)
    //             return { success: false, message: "Failed to authenticate token" };
    //         console.log(user)

    //         return user
    //     });
    // }

    authenticateToken = async (token, key) => {
        if (token == null) {
            return null;
        }

        try {
            const user = await new Promise((resolve, reject) => {
                jwt.verify(token, key, (err, user) => {
                    if (err) {
                        reject({ success: false, message: "Failed to authenticate token", err });
                    } else {
                        resolve(user);
                    }
                });
            });
            return user;
        } catch (error) {
            return error;
        }
    };
}
