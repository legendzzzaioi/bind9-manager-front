<template>
  <!-- Modal for confirming the deletion -->
  <a-modal v-model:open="isModalVisible" title="Confirm Deletion" ok-text="Delete with Record" cancel-text="Cancel"
           @ok="handlerRemoveZone(true)" @cancel="closeModal">
    <!-- Message prompting the user for confirmation -->
    <p>Are you sure you want to delete this zone? Do you also want to delete the corresponding record?</p>
    <!-- Footer with action buttons -->
    <template #footer>
      <a-button type="primary" danger @click="handlerRemoveZone(true)">Delete with Record</a-button>
      <a-button danger @click="handlerRemoveZone(false)">Delete without Record</a-button>
      <a-button type="primary" @click="closeModal">Cancel</a-button>
    </template>
  </a-modal>
</template>

<script setup lang="ts">
import {ref, inject} from 'vue';
import {useZones} from '../hooks/useZones';

// Inject the function to refresh the zone list
const fetchAllZones = inject<() => void>('fetchAllZones');

// Use the custom hook for deleting zone data
const {deleteZoneData} = useZones();

// State to track the visibility of the modal
const isModalVisible = ref(false);
// State to track the zone to be deleted
const zoneToDelete = ref<string | null>(null);

/**
 * Open the modal and bind the domain to be deleted
 * @param {string} domain - The domain of the zone to be deleted
 */
const openModal = (domain: string) => {
  zoneToDelete.value = domain;
  isModalVisible.value = true;
};

// Close the modal
const closeModal = () => {
  isModalVisible.value = false;
};

/**
 * Handle the removal of the zone
 * @param {boolean} withRecord - Whether to delete the corresponding record as well
 */
const handlerRemoveZone = async (withRecord: boolean) => {
  if (!zoneToDelete.value) return;
  const {success} = await deleteZoneData(zoneToDelete.value, withRecord);
  if (!success) return;
  closeModal();
  fetchAllZones?.();
};

// Expose the openModal function to the parent component
defineExpose({
  openModal,
});
</script>
