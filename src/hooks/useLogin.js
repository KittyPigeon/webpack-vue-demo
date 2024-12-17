import { ref } from 'vue';
import Http from '@/http/api';
import to from 'await-to-js';
import { useMessage } from './useMessage';
export function useLogin() {
  const { message } = useMessage();
  const userInfo = ref(null);
  const isLogin = ref(false);

  const login = async (data) => {
    const [err, res] = await to(Http.login(data));
    if (err) {
      message({
        type: 'error',
        message: err || '登录异常',
      });
      return;
    }
    console.log('res----', res.data);
    userInfo.value = res.data;
  };
  return {
    userInfo,
    isLogin,
    login,
  };
}
