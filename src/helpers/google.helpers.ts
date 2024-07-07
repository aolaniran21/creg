import axios from "axios";

export const getGoogleUserInfo = async (accessToken: string) => {
  // console.log("i am access tken");
  // console.log(accessToken);
  try {
    const response = await axios(
      "https://www.googleapis.com/oauth2/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = response.data;
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
