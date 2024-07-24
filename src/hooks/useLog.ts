import { ref } from 'vue';
import { LoginLogResp, OperationLogResp, UserLogResp, getOperationLog, getLoginLog, getUserLog } from '../api/log';
import { message } from 'ant-design-vue';

export function useLog() {
    const operationlogs = ref<OperationLogResp>();
    const loginlogs = ref<LoginLogResp>();
    const userlogs = ref<UserLogResp>();
    const total = ref<number>(0);

    const fetchAllOperationLogs = async (page: number, pageSize: number) => {
        try {
            const response = await getOperationLog(page, pageSize);
            operationlogs.value = response;
            total.value = response.total;
        } catch (error) {
            operationlogs.value = undefined;
            total.value = 0;
            message.error('Failed to fetch operation logs: ' + error.response.data.trim());
        }
    };

    const fetchAllLoginLogs = async (page: number, pageSize: number) => {
        try {
            const response = await getLoginLog(page, pageSize);
            loginlogs.value = response;
            total.value = response.total;
        } catch (error) {
            loginlogs.value = undefined;
            total.value = 0;
            message.error('Failed to fetch login logs: ' + error.response.data.trim());
        }
    };

    const fetchAllUserLogs = async (page: number, pageSize: number) => {
        try {
            const response = await getUserLog(page, pageSize);
            userlogs.value = response;
            total.value = response.total;
        } catch (error) {
            userlogs.value = undefined;
            total.value = 0;
            message.error('Failed to fetch user logs: ' + error.response.data.trim());
        }
    };

    return {
        operationlogs,
        loginlogs,
        userlogs,
        total,
        fetchAllOperationLogs,
        fetchAllLoginLogs,
        fetchAllUserLogs
    }
}