import { apiClient } from "../client";
import { ENDPOINTS } from "../endpoints";
import { LoginDto, LoginResponseDto } from "../types";

export const authService = {
  login: async (data: LoginDto): Promise<LoginResponseDto> => {
    const response = await apiClient.post<LoginResponseDto>(ENDPOINTS.AUTH.LOGIN, data);
    return { user: response.data.user, token: response.headers.authorization };
  },

  account: async () => {
    const response = await apiClient.get<LoginResponseDto>(ENDPOINTS.AUTH.ACCCOUNT);
    return response.data;
  },

  logout: async () => {
    await apiClient.post(ENDPOINTS.AUTH.LOGOUT);
  }
};
