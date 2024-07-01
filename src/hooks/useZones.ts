import { ref } from 'vue';
import { getZones, updateZone, createZone, deleteZone, ZoneReq, Zone } from '../api/zones';
import { message } from 'ant-design-vue';

export function useZones() {
  // Reactive state to store the list of zones
  const zones = ref<Zone[]>([]);

  /**
   * Fetch all zones from the API and update the zones state
   */
  const fetchAllZones = async () => {
    try {
      // Make an API call to fetch zones
      const response = await getZones();
      // Update the reactive state with the fetched zones
      zones.value = response;
    } catch (error) {
      // Reset the zones state in case of an error
      zones.value = [];
      // Handle specific error case for no zones found
      if (error.response?.status === 400 && error.response.data.trim() === 'no zones found') {
        // Uncomment the line below to display a warning message if no zones are found
        // message.warning('No zones found.');
      } else {
        // Display an error message for other errors
        message.error('An error occurred while fetching zones');
      }
    }
  };

  /**
   * Refresh the zone list by re-fetching all zones and displaying a success message
   */
  const refreshZoneList = async () => {
    try {
      // Re-fetch all zones
      await fetchAllZones();
      // Display a success message
      message.success('Zones refreshed successfully');
    } catch (error) {
      // Display an error message if refreshing fails
      message.error('Error refreshing zones: ' + error.message);
    }
  };

  /**
   * Save zone data by either creating a new zone or updating an existing one
   * @param {ZoneReq} zoneReq - The zone data to save
   * @param {boolean} isEdit - Whether the operation is an update (true) or create (false)
   */
  const saveZoneData = async (zoneReq: ZoneReq, isEdit: boolean) => {
    try {
      // Remove `serial` property before sending the update request
      const { serial, ...updateReq } = zoneReq as Zone & { serial?: number };

      // Make an API call to either create or update the zone
      const response = isEdit ? await updateZone(updateReq) : await createZone(zoneReq);
      
      // Check response code and display appropriate message
      if (response.code === 400) {
        message.error('Failed to save zone: ' + response.context);
      } else {
        message.success('Zone saved successfully', 5);
      }
    } catch (error) {
      // Display an error message if saving fails
      message.error('Failed to save zone: ' + error);
    }
  };

  /**
   * Delete a zone by its domain and optionally with its records
   * @param {string} domain - The domain of the zone to delete
   * @param {boolean} withRecord - Whether to delete the zone with its records
   */
  const deleteZoneData = async (domain: string, withRecord: boolean) => {
    try {
      // Make an API call to delete the zone
      const response = await deleteZone(domain, withRecord);
      
      // Check response code and display appropriate message
      if (response.code === 400) {
        message.error('Failed to delete zone: ' + response.context);
      } else {
        message.success('Zone deleted successfully', 5);
      }
    } catch (error) {
      // Display an error message if deletion fails
      message.error('Failed to delete zone: ' + error);
    }
  };

  // Fetch all zones when the function is called (component mounted)
  fetchAllZones();

  // Return the state and functions to be used in components
  return {
    zones,
    fetchAllZones,
    refreshZoneList,
    saveZoneData,
    deleteZoneData
  };
}
