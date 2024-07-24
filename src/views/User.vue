<template>
  <Menu/>
  <div class="container user-list">
    <!-- Display table only if there are users available -->
    <a-table :data-source="user" v-if="user.length" row-key="id">
      <!-- Define columns for the table -->
      <a-table-column title="ID" dataIndex="id" key="id"/>
      <a-table-column title="Username" dataIndex="username" key="username"/>
      <a-table-column title="Role" dataIndex="role" key="role"/>
      <a-table-column title="Created At" dataIndex="created_at" key="created_at"/>
      <a-table-column title="Updated At" dataIndex="updated_at" key="updated_at"/>
      <a-table-column title="Actions" key="actions">
        <template #default="{ record }">
          <!-- Buttons for operations on each record -->
          <a-space>
            <a-button type="primary" @click="showUpdateModal(record)">Edit Role</a-button>
            <a-button type="primary" @click="showPasswordModal(record)">Change Password</a-button>
            <a-button type="primary" danger @click="deleteUser(record.username)">Delete</a-button>
          </a-space>
        </template>
      </a-table-column>
    </a-table>
    <!-- Message displayed when there are no users -->
    <p v-else>No users available. Please create a new user.</p>

    <!-- Include modals for updating user role, updating user password, and adding new user -->
    <a-modal v-model:open="isUpdateModalVisible" title="Update User Role" @ok="handleUpdateUserRole"
             @cancel="handleCancel">
      <a-form>
        <a-form-item label="Username">
          <a-input v-model:value="updateuser.username" :placeholder="updateuser.username" disabled/>
        </a-form-item>
        <a-form-item label="Role">
          <a-select v-model:value="updateuser.role">
            <a-select-option value="admin">Admin</a-select-option>
            <a-select-option value="user">User</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>

    <a-modal v-model:open="isPasswordModalVisible" title="Update User Password" @ok="handleUpdateUserPassword"
             @cancel="handleCancel">
      <a-form>
        <a-form-item label="Username">
          <a-input v-model:value="updatepassword.username" disabled/>
        </a-form-item>
        <a-form-item label="Password">
          <a-input v-model:value="updatepassword.password" type="password"/>
        </a-form-item>
      </a-form>
    </a-modal>

    <a-modal v-model:open="isAddModalVisible" title="Add New User" @ok="handleAddUser" @cancel="handleCancel">
      <a-form>
        <a-form-item label="Username">
          <a-input v-model:value="createuser.username"/>
        </a-form-item>
        <a-form-item label="Role">
          <a-select v-model:value="createuser.role">
            <a-select-option value="admin">Admin</a-select-option>
            <a-select-option value="user">User</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="Password">
          <a-input v-model:value="createuser.password" type="password"/>
        </a-form-item>
      </a-form>
    </a-modal>

    <!-- Buttons for creating new user and refreshing the list -->
    <a-space>
      <a-button type="primary" @click="showAddModal">Create User</a-button>
      <a-button @click="refreshUserList">Refresh</a-button>
    </a-space>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {useUser} from '../hooks/useUser';
import Menu from './Menu.vue';

// Get user data and functions from the custom hook
const {
  user,
  updateuser,
  updatepassword,
  createuser,
  fetchUser,
  updateUserData,
  updateUserPasswordData,
  deleteUserByName,
  createUserData,
  refreshUserList
} = useUser();

const isUpdateModalVisible = ref(false);
const isPasswordModalVisible = ref(false);
const isAddModalVisible = ref(false);

const showUpdateModal = (record: any) => {
  updateuser.value = {username: record.username, role: record.role};
  isUpdateModalVisible.value = true;
};

const showPasswordModal = (record: any) => {
  updatepassword.value = {username: record.username, password: ''};
  isPasswordModalVisible.value = true;
};

const handleUpdateUserRole = async () => {
  if (updateuser.value) {
    const result = await updateUserData(updateuser.value);
    if (result.success) {
      await fetchUser(); // Ensure fetching updated data
      isUpdateModalVisible.value = false;
    }
  }
};

const handleUpdateUserPassword = async () => {
  if (updatepassword.value) {
    const result = await updateUserPasswordData(updatepassword.value);
    if (result.success) {
      await fetchUser(); // Ensure fetching updated data
      isPasswordModalVisible.value = false;
    }
  }
};

const handleCancel = () => {
  isUpdateModalVisible.value = false;
  isPasswordModalVisible.value = false;
  isAddModalVisible.value = false;
};

const deleteUser = async (username: string) => {
  const result = await deleteUserByName(username);
  if (result.success) {
    await fetchUser(); // Ensure fetching updated data
  }
};

const showAddModal = () => {
  createuser.value = {username: '', role: '', password: ''};
  isAddModalVisible.value = true;
};

const handleAddUser = async () => {
  if (createuser.value) {
    const result = await createUserData(createuser.value);
    if (result.success) {
      await fetchUser(); // Ensure fetching updated data
      isAddModalVisible.value = false;
    }
  }
};

onMounted(() => {
  fetchUser(); // Fetch initial user data
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

.user-list {
  padding: 10px;
}
</style>