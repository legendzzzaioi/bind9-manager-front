<template>
  <!-- Modal for managing records -->
  <a-modal v-model:open="isVisible" title="Manage Records" width="800px" @cancel="closeModal" :footer="null">
    <div class="container record-list">
      <!-- Row for buttons to create and refresh records -->
      <a-row justify="end">
        <a-button type="primary" @click="addNewRecord">Create Record</a-button>
        <a-button @click="handleRefreshRecords">Refresh</a-button>
      </a-row>
      <!-- Table displaying records if available -->
      <a-table :data-source="records" v-if="records.length" row-key="id">
        <!-- Define columns for the table -->
        <a-table-column title="ID" dataIndex="id" key="id" />
        <a-table-column title="Name" dataIndex="name" key="name" />
        <a-table-column title="Type" dataIndex="type" key="type" />
        <a-table-column title="Value" dataIndex="value" key="value" />
        <a-table-column title="Operation" key="operation">
          <template #default="{ record }">
            <!-- Buttons for operations on each record -->
            <a-button type="primary" @click="editRecord(record)">Edit</a-button>
            <a-button type="primary" danger @click="handleRemoveRecord(record.id)">Delete</a-button>
          </template>
        </a-table-column>
      </a-table>
      <!-- Message displayed when there are no records -->
      <p v-else>No records available. Please create a new record.</p>

      <!-- Include RecordForm component for adding/editing records -->
      <RecordForm ref="recordForm" :domain="domain" />
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, provide } from 'vue';
import RecordForm from '../components/RecordForm.vue';
import { useRecords } from '../hooks/useRecords';
import { Record } from '../api/records';

// State to control visibility of the modal
const isVisible = ref(false);
// State to hold the current domain
const domain = ref<string>('');

// Custom hook for fetching and managing records
const { records, fetchAllRecords, deleteRecordById, refreshRecordList, updateDomain } = useRecords();

// Reference to the RecordForm component
const recordForm = ref<InstanceType<typeof RecordForm> | null>(null);

// Function to open the modal for editing a record
const editRecord = (record: Record) => {
  recordForm.value?.openModal(domain.value, record);
};

// Function to open the modal for adding a new record
const addNewRecord = () => {
  recordForm.value?.openModal(domain.value, null);
};

// Function to close the modal
const closeModal = () => {
  isVisible.value = false;
};

// Function to open the modal and fetch records for the specified domain
const openModal = (zoneDomain: string) => {
  domain.value = zoneDomain;
  updateDomain(zoneDomain);
  isVisible.value = true;
  fetchAllRecords(zoneDomain);
};

// Function to handle removing a record by ID
const handleRemoveRecord = async (id: number) => {
  await deleteRecordById(id);
  await refreshRecordList(domain.value);
};

// Function to refresh the list of records
const handleRefreshRecords = async () => {
  await refreshRecordList(domain.value);
};

// Provide the refresh function to child components
provide('refreshRecordList', refreshRecordList);

// Expose the openModal function to be used externally
defineExpose({
  openModal
});
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}
</style>
