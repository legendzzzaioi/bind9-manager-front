<template>
    <!-- Modal for the zone form -->
    <a-modal
        v-model:open="isModalVisible"
        title="Zone Form"
        ok-text="Save changes"
        cancel-text="Close"
        @ok="handleSaveZone"
        @cancel="closeModal"
    >
        <!-- Form inside the modal -->
        <a-form @submit.prevent="handleSaveZone" layout="vertical">
            <!-- Form items for each field -->
            <a-form-item label="Domain" required>
                <a-input v-model:value="zoneReq.domain" />
            </a-form-item>
            <a-form-item label="TTL" required>
                <a-input-number v-model:value="zoneReq.ttl" style="width: 100%;" />
            </a-form-item>
            <a-form-item label="Primary Name Server" required>
                <a-input v-model:value="zoneReq.primary_name_server" />
            </a-form-item>
            <a-form-item label="Mail Address" required>
                <a-input v-model:value="zoneReq.mail_address" />
            </a-form-item>
            <a-form-item label="Refresh" required>
                <a-input-number v-model:value="zoneReq.refresh" style="width: 100%;" />
            </a-form-item>
            <a-form-item label="Retry" required>
                <a-input-number v-model:value="zoneReq.retry" style="width: 100%;" />
            </a-form-item>
            <a-form-item label="Expire" required>
                <a-input-number v-model:value="zoneReq.expire" style="width: 100%;" />
            </a-form-item>
            <a-form-item label="Cache TTL" required>
                <a-input-number v-model:value="zoneReq.cache_ttl" style="width: 100%;" />
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue';
import { ZoneReq } from '../api/zones';
import { useZones } from '../hooks/useZones';

// Inject the function to refresh the zone list
const refreshZoneList = inject<() => void>('refreshZoneList');

// State to track if the form is in edit mode
const isEdit = ref(false);
// State to track the visibility of the modal
const isModalVisible = ref(false);

// Default values for a new zone request
const defaultZoneReq: ZoneReq = {
    domain: '',
    ttl: 14400,
    cache_ttl: 180,
    expire: 1209600,
    mail_address: '',
    primary_name_server: '',
    refresh: 7200,
    retry: 3600,
};

// Reactive reference for the zone request data
const zoneReq = ref<ZoneReq>({ ...defaultZoneReq });

// Use the custom hook for saving zone data
const { saveZoneData } = useZones();

/**
 * Open the modal and populate it with zone data if provided
 * @param {ZoneReq | null} zoneData - The data of the zone to be edited, or null for a new zone
 */
const openModal = (zoneData: ZoneReq | null) => {
    zoneReq.value = zoneData ? { ...zoneData } : { ...defaultZoneReq };
    isEdit.value = !!zoneData;
    isModalVisible.value = true;
};

// Close the modal
const closeModal = () => {
    isModalVisible.value = false;
};

/**
 * Save the zone data (create or update)
 */
const handleSaveZone = async () => {
    await saveZoneData(zoneReq.value, isEdit.value);
    closeModal();
    refreshZoneList?.();
};

// Expose the openModal function to the parent component
defineExpose({
    openModal
});
</script>

<style scoped>
/* Add any scoped styles if necessary */
</style>
