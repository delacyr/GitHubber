import { create } from 'apisauce';

const api = create({
  baseURL: 'http://api.github.com',
  header: {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'githubber',
  },
});

export default api;
