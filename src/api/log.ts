import apiClient from './apiClient';

// 定义获取Operation日志接口
export interface OperationLog {
    id: number;
    username: string;
    operation: string;
    context: string;
    created_at: string;
}

// 定义获取User日志接口
export interface UserLog {
    id: number;
    username: string;
    operation: string;
    context: string;
    created_at: string;
}

// 定义获取Login日志接口
export interface LoginLog {
    id: number;
    username: string;
    ip: string;
    operation: string;
    created_at: string;
}

// 定义获取Operation日志列表
export interface OperationLogResp {
    logs: OperationLog[];
    total: number;
}

// 定义获取User日志列表
export interface UserLogResp {
    logs: UserLog[];
    total: number;
}

// 定义获取Login日志列表
export interface LoginLogResp {
    logs: LoginLog[];
    total: number;
}


export const getOperationLog = async (page: number, pageSize: number): Promise<OperationLogResp> => {
    const { data } = await apiClient.get<OperationLogResp>(`/operation_logs?page=${page}&pageSize=${pageSize}`);
    return data;
}

export const getUserLog = async (page: number, pageSize: number): Promise<UserLogResp> => {
    const { data } = await apiClient.get<UserLogResp>(`/user_logs?page=${page}&pageSize=${pageSize}`);
    return data;
}

export const getLoginLog = async (page: number, pageSize: number): Promise<LoginLogResp> => {
    const { data } = await apiClient.get<LoginLogResp>(`/login_logs?page=${page}&pageSize=${pageSize}`);
    return data;
}