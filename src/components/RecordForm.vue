<template>
  <!-- Modal for the record form -->
  <a-modal v-model:open="isModalVisible" title="Record Form" ok-text="Save changes" cancel-text="Close"
    @ok="handleSaveRecord" @cancel="closeModal">
    <!-- Form inside the modal -->
    <a-form @submit.prevent="handleSaveRecord" layout="vertical">
      <!-- Form items for each field -->
      <a-form-item label="Name" required>
        <a-input v-model:value="recordReq.name" />
      </a-form-item>
      <a-form-item label="Type" required>
        <a-select v-model:value="recordReq.type" style="width: 100%;">
          <!-- Options for the record type -->
          <a-select-option value="A">A</a-select-option>
          <a-select-option value="AAAA">AAAA</a-select-option>
          <a-select-option value="CAA">CAA</a-select-option>
          <a-select-option value="CNAME">CNAME</a-select-option>
          <a-select-option value="DNSKEY">DNSKEY</a-select-option>
          <a-select-option value="IPSECKEY">IPSECKEY</a-select-option>
          <a-select-option value="KEY">KEY</a-select-option>
          <a-select-option value="MX">MX</a-select-option>
          <a-select-option value="NS">NS</a-select-option>
          <a-select-option value="PTR">PTR</a-select-option>
          <a-select-option value="SPF">SPF</a-select-option>
          <a-select-option value="SRV">SRV</a-select-option>
          <a-select-option value="TLSA">TLSA</a-select-option>
          <a-select-option value="TXT">TXT</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="Value" required>
        <a-input v-model:value="recordReq.value" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue';
import { CreateRecordReq, Record } from '../api/records';
import { useRecords } from '../hooks/useRecords';
import {message} from "ant-design-vue";

// Inject the function to refresh the record list
const fetchAllRecords = inject<() => void>('fetchAllRecords');

// Use the custom hook for saving record data
const { saveRecordData } = useRecords();

// State to track if the form is in edit mode
const isEdit = ref(false);
// State to track the visibility of the modal
const isModalVisible = ref(false);

// Default values for a new record request
const defaultRecordReq: CreateRecordReq & { id?: number } = {
  id: undefined,
  domain: '',
  name: '',
  type: 'A',
  value: '',
};

// Reactive reference for the record request data
const recordReq = ref<CreateRecordReq & { id?: number }>({ ...defaultRecordReq });

/**
 * Open the modal and populate it with record data if provided
 * @param {string} domain - The domain of the record
 * @param {Record | null} recordData - The data of the record to be edited, or null for a new record
 */
const openModal = (domain: string, recordData: Record | null) => {
  if (recordData) {
    const { ...data } = recordData;
    recordReq.value = { ...data, domain };
  } else {
    recordReq.value = { ...defaultRecordReq, domain };
  }
  isEdit.value = !!recordData;
  isModalVisible.value = true;
};

// Close the modal
const closeModal = () => {
  isModalVisible.value = false;
};

/**
 * Save the record data (create or update)
 */
const handleSaveRecord = async () => {
  try {
    if (isEdit.value) {
      const { success } = await saveRecordData(recordReq.value as Record, true);
      if (!success) { return; }
    } else {
      const { success } = await saveRecordData(recordReq.value as CreateRecordReq, false);
      if (!success) { return; }
    }
    closeModal();
    fetchAllRecords?.();
  } catch (error) {
    console.error('Failed to save record:', error);
  }
};

// Expose the openModal function to the parent component
defineExpose({
  openModal,
});
</script>
