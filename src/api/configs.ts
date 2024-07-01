import apiClient from './apiClient';


// 定义Config接口
export interface Config {
  key: string;
  value: string;
}

// 定义Message返回接口
export interface Message {
    code: number;
    context: string;
  }

export const getConfig = async (key: string): Promise<Config> => {
  const { data } = await apiClient.get<Config>(`/config?key=${key}`);
  return data;
};

export const updateConfig = async (req: Config): Promise<Message> => {
  const { data } = await apiClient.put<Message>(`/config`, req);
  return data;
}
