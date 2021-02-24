import { AuthState } from 'features/auth/authSlice'


export const setToken = (authSate: AuthState) => {
  localStorage.setItem("userData", JSON.stringify(authSate));
};

export const getToken = (): AuthState | null => {
  const tokenString = localStorage.getItem("userData");
  if (tokenString) return JSON.parse(tokenString);
  return null;
};
