import { useMutation } from '@apollo/client';
import { CREATE_USER } from './queries';
import Cookies from 'js-cookie';
import { trackSignUpOnQuotesFirstStep } from '../quoteParts/quoteHelpers/googleAdsTrackingFunctions';

const onAutoCreateUserCompleted = ({ createUser, onCompleted, identifyUser }) => {
  identifyUser({
    email: createUser.user?.email,
    id: createUser.user.id,
    firstName: createUser.user?.firstName,
  });
  trackSignUpOnQuotesFirstStep();
  let { authenticationToken, ...user } = createUser.user;
  Cookies.set('user', JSON.stringify(user), { secure: true });
  Cookies.set('token', authenticationToken, { secure: true });
  onCompleted();
};

const useAutoCreateUser = () => {
  const [createUser, { loading: createUserLoading }] = useMutation(CREATE_USER);

  const autoCreateUser = async ({
    email,
    firstName,
    lastName,
    password,
    onCompleted,
    setError,
    identifyUser,
  }) =>
    await createUser({
      variables: {
        input: { email, firstName, lastName, password, passwordConfirmation: password },
      },
      onCompleted: ({ createUser }) =>
        onAutoCreateUserCompleted({ createUser, onCompleted, identifyUser }),
      onError: ({ message }) => {
        if (message.search('Email has already been taken') !== -1) {
          setError({ email: 'Email has already been taken' });
        } else {
          setError({ unknown: message });
        }
      },
    });
  return { createUserLoading, autoCreateUser };
};

export default useAutoCreateUser;
