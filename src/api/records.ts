import apiClient from './apiClient';

// 定义Record获取或更新接口
export interface Record {
    id: number;
    domain: string;
    name: string;
    type: string;
    value: string;
  }

  // 定义Record创建接口
export interface CreateRecordReq {
    domain: string;
    name: string;
    type: string;
    value: string;
  }

// 定义Message返回接口
export interface Message {
  code: number;
  context: string;
}

export const getRecords = async (domain: string): Promise<Record[]> => {
  const { data } = await apiClient.get<Record[]>(`/records?domain=${domain}`);
  return data;
};

export const createRecord = async (req: CreateRecordReq): Promise<Message> => {
  const { data } = await apiClient.post<Message>('/records', req);
  return data;
};

export const updateRecord = async (req: Record): Promise<Message> => {
  const { data } = await apiClient.put<Message>(`/records`, req);
  return data;
}

export const deleteRecord = async (id: number): Promise<Message> => {
  const { data } = await apiClient.delete<Message>(`/records?id=${id}`);
  return data;
}