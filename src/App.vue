<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  mounted() {
    this.$store.dispatch('mainStore/getListOfManager')
  }
})
</script>

<style>
:root {
  --color-divtec: #DC006B;
}
</style>
