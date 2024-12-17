<template>
  <el-form :model="form" label-width="auto" style="max-width: 600px">
    <el-form-item label="账号">
      <el-input v-model="form.account" />
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="form.password" />
    </el-form-item>
    <div class="login-group">
      <el-button class="btn-login" @click="handleLogin">登录</el-button>
    </div>
    <el-button type="primary">按钮</el-button>
  </el-form>
</template>

<script setup>
import { reactive } from 'vue';
import { useLogin } from '@/hooks/useLogin';

// hooks
const { login } = useLogin();
const handleLogin = () => {
  login(form);
};

// do not use same name with ref
const form = reactive({
  account: '',
  password: '',
});

const onSubmit = () => {
  console.log('submit!');
};
</script>

<style scoped lang="less">
::v-deep .btn-login {
  display: block;
}
</style>
