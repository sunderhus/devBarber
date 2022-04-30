import makeApiUrl from '../apiUrlFactory';

export interface RegisterAccountParams {
  name: string;
  email: string;
  password: string;
}

export interface RegisterAccountResponse {
  token: string;
  data: {
    id: number;
    avatar: string;
    email: string;
    name: string;
  };
  error: string;
}

const registerAccount = async (
  params: RegisterAccountParams
): Promise<RegisterAccountResponse> => {
  const url = makeApiUrl('user');

  const req = await fetch(url, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...params })
  });

  const json = await req.json();

  return json as RegisterAccountResponse;
};
export default registerAccount;
