import { ref } from 'vue';
import { getRecords, deleteRecord, createRecord, updateRecord, Record, CreateRecordReq } from '../api/records';
import { message } from 'ant-design-vue';

export function useRecords() {
  // Reactive state to store records
  const records = ref<Record[]>([]);
  // Reactive state to store the current domain
  const domain = ref<string>('');

  /**
   * Fetch all records for the specified or current domain
   * @param {string} [currentDomain] - Optional domain to fetch records for
   */
  const fetchAllRecords = async (currentDomain?: string) => {
    try {
      // Use the provided domain or the current domain
      const domainToUse = currentDomain || domain.value;
      // Fetch records from the API
      const response = await getRecords(domainToUse);
      // Update the records state with the response
      records.value = response;
    } catch (error) {
      // Reset records to an empty array in case of an error
      records.value = [];
      // Handle specific error case for no records found
      if (error.response?.status === 400 && error.response.data.trim() === 'no records found for domain ' + domain.value) {
        // message.info('No records found');
      } else {
        // Display an error message for other errors
        message.error('An error occurred while fetching records');
      }
    }
  };

  /**
   * Refresh the record list for the specified or current domain
   * @param {string} [currentDomain] - Optional domain to refresh records for
   */
  const refreshRecordList = async (currentDomain?: string) => {
    // Fetch all records and display a success message
    await fetchAllRecords(currentDomain);
    message.success('Records refreshed successfully');
  };

  /**
   * Delete a record by its ID
   * @param {number} id - The ID of the record to delete
   */
  const deleteRecordById = async (id: number) => {
    try {
      // Call the delete API and display a success message
      await deleteRecord(id);
      message.success('Record deleted successfully');
    } catch (error) {
      // Display an error message if the delete operation fails
      message.error('Failed to delete record: ' + error);
    }
  };

  /**
   * Save record data (create or update)
   * @param {CreateRecordReq & { id?: number }} record - The record data to save
   * @param {boolean} isEdit - Whether the operation is an update (true) or create (false)
   */
  const saveRecordData = async (record: CreateRecordReq & { id?: number }, isEdit: boolean) => {
    try {
      if (isEdit) {
        // Call the update API and display a success message
        await updateRecord(record as Record);
        message.success('Record updated successfully');
      } else {
        // Call the create API and display a success message
        await createRecord(record as CreateRecordReq);
        message.success('Record created successfully');
      }
    } catch (error) {
      // Display an error message if the save operation fails
      message.error('Failed to save record: ' + error);
    }
  };

  /**
   * Update the current domain
   * @param {string} newDomain - The new domain to set
   */
  const updateDomain = (newDomain: string) => {
    domain.value = newDomain;
  };

  return {
    records,
    fetchAllRecords,
    refreshRecordList,
    deleteRecordById,
    saveRecordData,
    updateDomain
  };
}
