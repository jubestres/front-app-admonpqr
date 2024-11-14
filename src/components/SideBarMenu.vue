<template>
  <el-menu
    :default-active="$route.path"
    router
    class="el-menu-vertical-demo"
    background-color="#242629"
    text-color="#fff"
    collapse-transition
  >
    <el-sub-menu index="1">
      <template #title>
        <el-icon><Location /></el-icon>
        <span>Administrador</span>
      </template>
      <el-menu-item index="/personas">Personas</el-menu-item>
      <el-menu-item index="/cargos">Cargos</el-menu-item>
      <el-menu-item index="/paises">Paises</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="2">
      <template #title>
        <el-icon><Location /></el-icon>
        <span>Configuracion</span>
      </template>
      <el-menu-item index="/configuracion/personas">Personas</el-menu-item>
      <el-menu-item index="/configuracion/cargos">Cargos</el-menu-item>
      <el-menu-item index="/configuracion/paises">Paises</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts" setup>
import { Location } from '@element-plus/icons-vue';
</script>

<style scoped>
html, body {
  margin: 0;
}

.el-menu-vertical-demo {
  width: 250px;
  min-height: 100%;
}
</style>
