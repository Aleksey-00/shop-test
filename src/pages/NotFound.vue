<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" class="text-center">
        <div class="text-h1 font-weight-bold primary--text mb-4">
          404
        </div>
        <div class="text-h4 mb-4">
          Страница не найдена
        </div>
        <div class="text-subtitle-1 mb-8">
          Извините, но страница, которую вы ищете, не существует или была перемещена
        </div>
        <v-btn
          color="primary"
          rounded
          elevation="2"
          :to="{ name: 'home' }"
        >
          Вернуться на главную
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style scoped>
.fill-height {
  min-height: calc(100vh - 64px);
}
</style>
