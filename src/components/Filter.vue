<template>
  <div class="div-container-filter">
    <div class="div-filter">
      <q-input bottom-slots v-model="text" label="Filtre" counter maxlength="30" :dense="dense">
        <template v-slot:append>
          <q-icon v-if="text !== ''" name="close" @click="text = ''" class="cursor-pointer" />
        </template>

        <template v-slot:hint>
          nom ou prénom
        </template>
      </q-input>
    </div>
  </div>
</template>

<script>
export default {
  name: "Filter"
}
</script>

<style scoped>
.div-container-filter {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.div-filter {
  width: 30%;
  margin-bottom: 1em;
  display: flex;
  justify-content: flex-end;
}

.div-filter label {
  width: 100%;
}
/******************************************
Responsive
**************************************** */
@media screen and (max-width: 900px) {
  .div-filter {
    width: 100%;
  }
}
</style>
