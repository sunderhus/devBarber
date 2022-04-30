import makeApiUrl from '../apiUrlFactory';

interface RefreshAuthenticationResponse {
  token: string;
  data: {
    avatar: string;
  };
}

const refreshAuthentication = async (
  token: string
): Promise<RefreshAuthenticationResponse> => {
  const url = makeApiUrl('auth/refresh');

  const response = await fetch(`${url}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token })
  });

  const parsedResponse =
    (await response.json()) as RefreshAuthenticationResponse;

  return parsedResponse;
};

export default refreshAuthentication;
