<template>
  <a-layout class="layout">
    <a-layout-header>
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }">
        <a-menu-item v-for="item in menuItems" :key="item.key">
          <router-link :to="item.to">{{ item.label }}</router-link>
        </a-menu-item>
        <a-menu-item key="5" style="margin-left: auto;">
          <a-dropdown>
            <template #overlay>
              <a-menu>
                <a-menu-item key="logout" @click="handleLogout">Logout</a-menu-item>
              </a-menu>
            </template>
            <a-button type="link">
              <span>{{ username }}</span>
              <DownOutlined />
            </a-button>
          </a-dropdown>
        </a-menu-item>
      </a-menu>
    </a-layout-header>
  </a-layout>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'vue-router';
import { useLogin } from '../hooks/useLogin';
import { DownOutlined } from '@ant-design/icons-vue';

const selectedKeys = ref<string[]>([]);
const { logoutHandler } = useLogin();
const router = useRouter();

const username = ref<string>('User');

// Function to retrieve username from JWT token stored in localStorage
const getUsernameFromToken = (token: string | null): string => {
  if (!token) return 'User'; // Default value if token doesn't exist
  const decoded = jwtDecode(token) as { username: string };
  return decoded.username;
};

const menuItems = [
  { key: '1', to: { name: 'Zone' }, label: 'Zone' },
  { key: '2', to: { name: 'Config' }, label: 'Config' },
  { key: '3', to: { name: 'User' }, label: 'User' },
  { key: '4', to: { name: 'Log' }, label: 'Log' },
];

// Watch for route changes and update selectedKeys accordingly
watch(router.currentRoute, (to) => {

  selectedKeys.value = [menuItems[to.path] || '1']; // Default to '1' if no match

  // Update document title based on meta title
  if (to.meta.title) {
    document.title = to.meta.title as string;
  }
});

// Initial setup when component is mounted
const token = localStorage.getItem('token');
username.value = getUsernameFromToken(token);

// Function to handle logout
const handleLogout = async () => {
  await logoutHandler(); // Calls the logout function from useLogin hook
  router.push({ name: 'Login' }); // Redirect to login page after logout
};
</script>
