<template>
    <!-- Card to display configuration -->
    <a-card title="Configuration">
        <!-- Table to display configuration details -->
        <a-table :dataSource="[config]" rowKey="key" :pagination="false">
            <!-- Column for the file name -->
            <a-table-column title="File" dataIndex="key" key="key" />
            <!-- Column for the context -->
            <a-table-column title="Context" key="value">
                <template #default="{ record }">
                    <!-- Textarea for editing the config value if in edit mode -->
                    <div v-if="isEdit">
                        <a-textarea v-model:value="config.value" :rows="30" />
                    </div>
                    <!-- Tooltip for displaying the config value if not in edit mode -->
                    <div v-else>
                        <a-tooltip :title="record.value">
                            <span class="ellipsis">{{ record.value }}</span>
                        </a-tooltip>
                    </div>
                </template>
            </a-table-column>
            <!-- Column for action buttons -->
            <a-table-column title="Action" key="action">
                <!-- Edit button (visible when not in edit mode) -->
                <a-button v-if="!isEdit" @click="startEdit" type="primary">Edit</a-button>
                <!-- Save and Cancel buttons (visible when in edit mode) -->
                <a-button v-if="isEdit" @click="handleUpdateConfig" type="primary">Save</a-button>
                <a-button v-if="isEdit" @click="cancelEdit" style="margin-left: 8px;">Cancel</a-button>
            </a-table-column>
        </a-table>
    </a-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useConfigs } from '../hooks/useConfigs';
import { Config } from '../api/configs';

// Reactive state to control edit mode
const isEdit = ref(false);

// Use the custom hook to fetch and save config data
const { fetchConfig, saveConfig } = useConfigs();

// Reactive state to store the configuration
const config = ref<Config>({ key: 'named.conf.options', value: '' });

// Function to start editing (enables edit mode)
const startEdit = async () => {
    isEdit.value = true;
};

// Function to cancel editing (disables edit mode)
const cancelEdit = () => {
    isEdit.value = false;
};

// Function to refresh the configuration by fetching it from the API
const refreshConfig = async () => {
    const fetchedConfig = await fetchConfig(config.value.key);
    if (fetchedConfig) {
        config.value = fetchedConfig;
    }
};

// Function to handle updating the configuration
const handleUpdateConfig = async () => {
    await saveConfig(config.value);
    cancelEdit();
};

// Fetch initial configuration when the component is mounted
onMounted(() => {
    refreshConfig();
});
</script>

<style scoped>
.ellipsis {
    display: inline-block;
    max-width: 800px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
