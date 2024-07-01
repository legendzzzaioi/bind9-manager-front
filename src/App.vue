<template>
  <a-layout class="layout">
    <a-layout-header>
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }">
        <a-menu-item key="1">
          <router-link to="/">Zones</router-link>
        </a-menu-item>
        <a-menu-item key="2">
          <router-link to="/config">Config</router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-header>
  </a-layout>
  <router-view></router-view>
</template>

<script setup lang="ts" name="App">
import { ref } from 'vue';
const selectedKeys = ref<string[]>(['1']);
</script>
