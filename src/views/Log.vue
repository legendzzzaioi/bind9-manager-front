<template>
    <Menu />
    <a-layout class="layout">
        <a-layout-content style="padding: 24px;">
            <a-tabs v-model:activeKey="activeTab">
                <a-tab-pane key="operationLogs" tab="Operation Logs">
                    <a-table :dataSource="operationlogs?.logs" v-if="operationlogs" rowKey="id" :pagination="false">
                        <a-table-column title="ID" dataIndex="id" key="id"></a-table-column>
                        <a-table-column title="Username" dataIndex="username" key="username"></a-table-column>
                        <a-table-column title="Operation" dataIndex="operation" key="operation"></a-table-column>
                        <a-table-column title="Context" dataIndex="context" key="context"></a-table-column>
                        <a-table-column title="Created At" dataIndex="created_at" key="created_at"></a-table-column>
                    </a-table>
                    <a-pagination v-if="operationlogs" :current="page" :pageSize="pageSize" :total="operationlogs.total"
                        @change="onPageChange('operationLogs', $event)" />
                    <p v-else>No operation logs available.</p>
                </a-tab-pane>
                <a-tab-pane key="loginLogs" tab="Login Logs">
                    <a-table :dataSource="loginlogs?.logs" v-if="loginlogs" rowKey="id" :pagination="false">
                        <a-table-column title="ID" dataIndex="id" key="id"></a-table-column>
                        <a-table-column title="Username" dataIndex="username" key="username"></a-table-column>
                        <a-table-column title="Operation" dataIndex="operation" key="operation"></a-table-column>
                        <a-table-column title="Ip" dataIndex="ip" key="ip"></a-table-column>
                        <a-table-column title="Created At" dataIndex="created_at" key="created_at"></a-table-column>
                    </a-table>
                    <a-pagination v-if="loginlogs" :current="page" :pageSize="pageSize" :total="loginlogs.total"
                        @change="onPageChange('loginLogs', $event)" />
                    <p v-else>No login logs available.</p>
                </a-tab-pane>
                <a-tab-pane key="userLogs" tab="User Logs">
                    <a-table :dataSource="userlogs?.logs" v-if="userlogs" rowKey="id" :pagination="false">
                        <a-table-column title="ID" dataIndex="id" key="id"></a-table-column>
                        <a-table-column title="Username" dataIndex="username" key="username"></a-table-column>
                        <a-table-column title="Operation" dataIndex="operation" key="operation"></a-table-column>
                        <a-table-column title="Context" dataIndex="context" key="context"></a-table-column>
                        <a-table-column title="Created At" dataIndex="created_at" key="created_at"></a-table-column>
                    </a-table>
                    <a-pagination v-if="userlogs" :current="page" :pageSize="pageSize" :total="userlogs.total"
                        @change="onPageChange('userLogs', $event)" />
                    <p v-else>No user logs available.</p>
                </a-tab-pane>
            </a-tabs>
        </a-layout-content>
    </a-layout>
</template>

<script setup lang="ts">
import Menu from './Menu.vue';
import { useLog } from '../hooks/useLog';
import { ref, onMounted, watch } from 'vue';

const { operationlogs, loginlogs, userlogs, fetchAllOperationLogs, fetchAllLoginLogs, fetchAllUserLogs } = useLog();

const pageSize = ref(10);
const page = ref(1);
const activeTab = ref('operationLogs');

// Function to fetch operation logs with pagination
const getAllOperationLogs = async () => {
    await fetchAllOperationLogs(page.value, pageSize.value);
};

// Function to fetch login logs with pagination
const getAllLoginLogs = async () => {
    await fetchAllLoginLogs(page.value, pageSize.value);
};

// Function to fetch user logs with pagination
const getAllUserLogs = async () => {
    await fetchAllUserLogs(page.value, pageSize.value);
};

// Function to handle page change
const onPageChange = async (tab: string, newPage: number) => {
    page.value = newPage;
    if (tab === 'operationLogs') {
        await getAllOperationLogs();
    } else if (tab === 'loginLogs') {
        await getAllLoginLogs();
    } else if (tab === 'userLogs') {
        await getAllUserLogs();
    }
};

// Watch for tab change to reset the page number and fetch logs
watch(activeTab, async (newValue) => {
    page.value = 1;
    if (newValue === 'operationLogs') {
        await getAllOperationLogs();
    } else if (newValue === 'loginLogs') {
        await getAllLoginLogs();
    } else if (newValue === 'userLogs') {
        await getAllUserLogs();
    }
});

// Initial fetch on component mount based on active tab
onMounted(async () => {
    if (activeTab.value === 'operationLogs') {
        await getAllOperationLogs();
    } else if (activeTab.value === 'loginLogs') {
        await getAllLoginLogs();
    } else if (activeTab.value === 'userLogs') {
        await getAllUserLogs();
    }
});
</script>

<style scoped>
/* Add scoped styles here */
</style>
