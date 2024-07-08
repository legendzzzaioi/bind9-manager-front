import { ref } from 'vue';
import { LoginReq, LoginRes, login, logout } from '../api/login';
import { message } from 'ant-design-vue';

export const useLogin = () => {
    const loginRes = ref<LoginRes | null>(null);
    const loginReq = ref<LoginReq>({ username: '', password: '' });
    const isLogin = ref<boolean>(!!localStorage.getItem('token'));

    const loginHandler = async () => {
        try {
            loginRes.value = await login(loginReq.value);
            if (loginRes.value) {
                isLogin.value = true;
                message.success('Login successfully!');
                localStorage.setItem('token', loginRes.value.token);
            }
        } catch (error) {
            message.error('Failed to login: ' + error);
        }
    };

    const logoutHandler = async () => {
        await logout();
        localStorage.removeItem('token');
        isLogin.value = false;
        message.success('Logout successfully!');
    };

    return { loginHandler, logoutHandler, loginRes, loginReq, isLogin };
};
