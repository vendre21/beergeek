import { useSelector } from 'react-redux'

import { selectToken, selectUserName } from './authSlice'


interface AuthProps {
  isAuthenticated: boolean;
  userName?: string;
}

export const useAuthentication = (): AuthProps => {
  const token = useSelector(selectToken);
  const userName = useSelector(selectUserName);

  return {
    isAuthenticated: !!token,
    userName,
  };
};
