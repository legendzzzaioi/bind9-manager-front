import apiClient from './apiClient';

// 定义Login接口
export interface LoginReq {
    username: string;
    password: string;
}

// 定义返回接口
export interface LoginRes {
    token: string;
}

export const login = async (req: LoginReq): Promise<LoginRes> => {
    const { data } = await apiClient.post<LoginRes>('/login', req);
    return data;
};


export const logout = async () => {
    await apiClient.post('/logout');
}