import { ElMessage } from 'element-plus';

export function useMessage() {
  const message = (options) => {
    const { type = 'info', message = '消息提示' } = options;
    ElMessage({
      type: type,
      message,
    });
  };
  return {
    message,
  };
}
