import { get, post, put, del } from './index';

export default {
  login(data) {
    return post('/api/login', data);
  },
};
