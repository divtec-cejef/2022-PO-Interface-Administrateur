<template>
  <div class="q-gutter-sm">
    <q-checkbox size="sm" v-model="shape" val="1" label="Size 'sm'" />
    <q-checkbox size="sm" v-model="shape" val="2" label="Size 'sm'" />
    <q-checkbox size="sm" v-model="shape" val="3" label="Size 'sm'" />
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: "AllStands",
  setup () {
    return {
      shape: ref(['line'])
    }
  }
}
</script>

<style scoped>

</style>
