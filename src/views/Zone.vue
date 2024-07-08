<template>
  <Menu />
  <div class="container zone-list">
    <!-- Display table only if there are zones available -->
    <a-table :data-source="zones" v-if="zones.length" row-key="domain">
      <!-- Define columns for the table -->
      <a-table-column title="Domain" dataIndex="domain" key="domain" />
      <a-table-column title="TTL" dataIndex="ttl" key="ttl" />
      <a-table-column title="NS" dataIndex="primary_name_server" key="primary_name_server" />
      <a-table-column title="Mail" dataIndex="mail_address" key="mail_address" />
      <a-table-column title="Operation" key="operation">
        <template #default="{ record }">
          <!-- Buttons for operations on each record -->
          <a-space>
            <a-button type="primary" @click="editZone(record)">Edit</a-button>
            <a-button type="primary" @click="() => viewRecords(record.domain)">View Records</a-button>
            <a-button type="primary" danger @click="deleteZone(record.domain)">Delete</a-button>
          </a-space>
        </template>
      </a-table-column>
    </a-table>
    <!-- Message displayed when there are no zones -->
    <p v-else>No zones available. Please create a new zone.</p>

    <!-- Include components for handling zones and records -->
    <RecordList ref="recordList" />
    <ZoneForm ref="zoneForm" />
    <DeleteZoneForm ref="deleteZoneForm" />

    <!-- Buttons for creating new zone and refreshing the list -->
    <a-space>
      <a-button type="primary" @click="addNewZone">Create Zone</a-button>
      <a-button @click="refreshZoneList">Refresh</a-button>
    </a-space>
  </div>
</template>

<script setup lang="ts">
import { ref, provide, onMounted } from 'vue';
import { ZoneReq } from '../api/zones';
import ZoneForm from '../components/ZoneForm.vue';
import DeleteZoneForm from '../components/DeleteZoneForm.vue';
import RecordList from '../components/RecordList.vue';
import { useZones } from '../hooks/useZones';
import Menu from './Menu.vue';

// Get zones and functions from the custom hook
const { zones, fetchAllZones, refreshZoneList } = useZones();

// Refs for components
const zoneForm = ref<InstanceType<typeof ZoneForm> | null>(null);
const deleteZoneForm = ref<InstanceType<typeof DeleteZoneForm> | null>(null);
const recordList = ref<InstanceType<typeof RecordList> | null>(null);

// Function to open the modal for editing a zone
const editZone = (zone: ZoneReq) => {
  zoneForm.value?.openModal(zone);
};

// Function to open the modal for adding a new zone
const addNewZone = () => {
  zoneForm.value?.openModal(null);
};

// Function to open the modal for deleting a zone
const deleteZone = async (domain: string) => {
  await deleteZoneForm.value?.openModal(domain);
};

// Function to open the modal for viewing records of a domain
const viewRecords = (domain: string) => {
  recordList.value?.openModal(domain);
};

// Fetch all zones when the component is mounted
onMounted(() => {
  fetchAllZones();
});

// Provide the refresh function to be used in child components
provide('refreshZoneList', refreshZoneList);

// Expose the viewRecords function to be used externally
defineExpose({
  viewRecords
});
</script>

<style scoped>
.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.zone-list {
  padding: 10px;
}

.list-group {
  list-style: none;
  padding: 0;
}

.list-group-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>
