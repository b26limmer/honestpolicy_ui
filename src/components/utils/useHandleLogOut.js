import { navigate } from 'gatsby';
import Cookies from 'js-cookie';
import { useMutation } from '@apollo/client';
import { SIGN_OUT } from './queries';

const useHandleLogOut = () => {
  const [signOut] = useMutation(SIGN_OUT);
  const clearSession = () => {
    localStorage.clear();
    Cookies.remove('token');
    Cookies.remove('user');
    navigate('/');
  };
  const handleLogOutError = error => {
    console.error(error);
    clearSession();
  };
  const handleLogout = () => {
    signOut({
      onCompleted: ({ signOut }) => {
        const { success, errors } = signOut;
        clearSession();
        if (!success) {
          handleLogOutError(errors);
        }
      },
      onError: error => handleLogOutError(error),
    });
  };
  return handleLogout;
};

export default useHandleLogOut;
