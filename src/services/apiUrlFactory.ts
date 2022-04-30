const BASE_API = 'https://api.b7web.com.br/devbarber/api';

const makeApiUrl = (path: string): string => {
  return `${BASE_API}/${path}`;
};

export default makeApiUrl;
