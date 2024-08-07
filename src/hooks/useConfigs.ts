import { ref } from 'vue';
import { getConfig, updateConfig, Config } from '../api/configs';
import { message } from 'ant-design-vue';

export function useConfigs() {
  // Reactive state to store the configuration
  const config = ref<Config>();

  /**
   * Fetch a configuration by its key
   * @param {string} key - The key of the configuration to fetch
   * @returns {Promise<Config | undefined>} - The fetched configuration or undefined if an error occurs
   */
  const fetchConfig = async (key: string): Promise<Config> => {
    try {
      // Make an API call to fetch the configuration
      const response = await getConfig(key);
      // Update the reactive state with the fetched configuration
      config.value = response;
      // Return the fetched configuration
      return response;
    } catch (error) {
      // Display an error message if fetching fails
      message.error('Failed to fetch config: ' + error.response.data.trim());
      // Return undefined in case of an error
      return undefined;
    }
  };

  /**
   * Save a configuration by updating it
   * @param {Config} config - The configuration to save
   */
  const saveConfig = async (config: Config): Promise<{ success: boolean }> => {
    try {
      if (!config.value) {
        message.error('context cannot be empty');
        return { success: false };
      }
      // Make an API call to update the configuration
      await updateConfig(config);
      // Display a success message if the update is successful
      message.success('Config updated successfully');
      return { success: true };
    } catch (error) {
      // Display an error message if updating fails
      message.error('Failed to update config: ' + error.response.data.trim());
      return { success: false };
    }
  };

  // Return the functions to be used in components
  return {
    fetchConfig,
    saveConfig
  };
}
