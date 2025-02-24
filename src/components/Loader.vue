<template>
  <div class="loader-container">
    <v-progress-circular
      indeterminate
      color="primary"
      :size="70"
      :width="7"
    />
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}
</style> 