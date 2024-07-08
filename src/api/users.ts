import apiClient from './apiClient';

// 定义创建User接口
export interface CreateUserReq {
    username: string;
    password: string;
    role: string;
}

// 定义获取User列表接口
export interface GetUserResp {
    id: number;
    username: string;
    role: string;
    created_at: string;
    updated_at: string;
}

// 定义更新User角色接口
export interface UpdateUserReq {
    username: string;
    role: string;
}

// 定义更新User密码接口
export interface UpdateUserPasswordReq {
    username: string;
    password: string;
}

// 定义Message返回接口
export interface Message {
    code: number;
    context: string;
}

export const getUsers = async (): Promise<GetUserResp[]> => {
    const { data } = await apiClient.get<GetUserResp[]>('/user');
    return data;
};

export const createUser = async (req: CreateUserReq): Promise<Message> => {
    const { data } = await apiClient.post<Message>('/user', req);
    return data;
};

export const updateUser = async (req: UpdateUserReq): Promise<Message> => {
    const { data } = await apiClient.put<Message>('/user', req);
    return data;
};

export const updateUserPassword = async (req: UpdateUserPasswordReq): Promise<Message> => {
    const { data } = await apiClient.put<Message>('/password', req);
    return data;
}

export const deleteUser = async (username: string): Promise<Message> => {
    const { data } = await apiClient.delete<Message>(`/user?username=${username}`);
    return data;
}