import { Configuration, DefaultApi } from '../generated/api';
import { getApiToken } from './services';

const basePath = process.env.REACT_APP_ORIGIN;

const configuration = new Configuration({
  basePath,
  apiKey: () => {
    const token = getApiToken();
    return token ? `Authorization: Bearer ${token}` : '';
  },
});

export const api = new DefaultApi(configuration);
