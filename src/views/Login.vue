<template>
  <a-row type="flex" justify="center" display="flex" style="height: 100vh">
    <a-col :span="8">
      <a-card title="Login" bordered>
        <a-form @submit.prevent="handleSubmit">
          <a-form-item>
            <a-input v-model:value="loginReq.username" placeholder="Username"/>
          </a-form-item>
          <a-form-item>
            <a-input v-model:value="loginReq.password" type="password" placeholder="Password"/>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" html-type="submit" block>Login</a-button>
          </a-form-item>
        </a-form>
      </a-card>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import {useRouter} from 'vue-router';
import {useLogin} from '../hooks/useLogin';

const {loginHandler, loginReq, isLogin} = useLogin();
const router = useRouter();

const handleSubmit = async () => {
  if (!loginReq.value.username || !loginReq.value.password) {
    return;
  }
  await loginHandler();
  if (isLogin.value) {
    await router.push({name: 'Zone'});
  }
};
</script>
