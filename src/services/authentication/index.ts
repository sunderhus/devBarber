import makeApiUrl from '../apiUrlFactory';

export interface SignInParams {
  email: string;
  password: string;
}

export interface SignInResponse {
  token: string;
  data: {
    avatar: string;
  };
}

const remoteAuthentication = async (
  params: SignInParams
): Promise<SignInResponse> => {
  const url = makeApiUrl('auth/login');

  const request = await fetch(url, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...params
    })
  });

  const response = await request.json();

  return response as SignInResponse;
};

export default remoteAuthentication;
