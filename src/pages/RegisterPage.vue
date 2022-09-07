<template>
  <div class="container window-height">
    <h1>Register</h1>
    <button @click="$router.push('/')">j'ai déjà un compte</button>
  </div>
</template>

<script>
export default {
  name: 'RegisterPage'
}
</script>

<style scoped>
.container {
  display:flex;
  justify-content: center;
  align-items: center;
}
</style>
