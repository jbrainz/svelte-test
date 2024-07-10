import axios from "axios";
type CreateAccountPayload = {
  telegramId: string;
  password: string;
  fullName: string;
};

type LoginPasswordPayload = {
  telegramId: string;
  password: string;
  token: string;
};
const BASE_URL =
  "https://telegrambot-backend-production-b011.up.railway.app/api";
export const createAccount = async (payload: CreateAccountPayload) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/user`, payload);
    console.log(data);
    return {
      success: data.success,
      token: data.token,
      message: data.message,
    };
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      token: null,
      message: error.message,
    };
  }
};

export const login = async (payload: LoginPasswordPayload) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/user/login`, payload);
    localStorage.setItem("user", JSON.stringify(data.user));
    return {
      valid: data.valid,
      user: data.user,
    };
  } catch (error: any) {
    console.log(error);
    return {
      valid: false,
      user: null,
      message: error.message,
    };
  }
};
