<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  mounted() {
    this.$store.dispatch('mainStore/getListOfManager')
    this.$store.dispatch('mainStore/getListOfBadge')
    this.$store.dispatch('mainStore/getListOfManagerInAPI')
  }
})
</script>

<style>
:root {
  --color-divtec: #DC006B;
}
</style>
