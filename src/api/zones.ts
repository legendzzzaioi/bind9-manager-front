import apiClient from './apiClient';

// 定义Zone返回接口
export interface Zone {
    domain: string;
    ttl: number;
    cache_ttl: number;
    expire: number;
    mail_address: string;
    primary_name_server: string;
    refresh: number;
    retry: number;
    serial: number;
  }

  // 定义Zone请求接口
export interface ZoneReq {
    domain: string;
    ttl: number;
    cache_ttl: number;
    expire: number;
    mail_address: string;
    primary_name_server: string;
    refresh: number;
    retry: number;
  }

// 定义Message返回接口
export interface Message {
  code: number;
  context: string;
}

export const getZones = async (): Promise<Zone[]> => {
  const { data } = await apiClient.get<Zone[]>('/zones');
  return data;
};

export const createZone = async (req: ZoneReq): Promise<Message> => {
  const { data } = await apiClient.post<Message>('/zones', req);
  return data;
};

export const updateZone = async (req: ZoneReq): Promise<Message> => {
  const { data } = await apiClient.put<Message>(`/zones`, req);
  return data;
}

export const deleteZone = async (domain: string, withrecord: boolean=false): Promise<Message> => {
  const { data } = await apiClient.delete<Message>(`/zones?domain=${domain}&record=${withrecord}`);
  return data;
}