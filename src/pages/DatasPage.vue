<template>
  <div class="container">
    <div class="data">
      <div class="q-pa-md">
        <q-markup-table>
          <thead>
          <tr>
            <th class="text-left col-id">ID</th>
            <th class="text-left col-first-name">Nom</th>
            <th class="text-left col-last-name">Prenom</th>
            <th class="text-left col-email">Email</th>
            <th class="text-left col-stand">Stands</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in getManager">
            <td class="text-left"> {{ item.id }}</td>
            <td class="text-left"> {{ item.first_name }}</td>
            <td class="text-left"> {{ item.last_name }}</td>
            <td class="text-left"> {{ item.email }}</td>
            <td class="text-left"> {{ item.stand }}</td>
          </tr>
          </tbody>
        </q-markup-table>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: "DatasPage",
  computed: {
    ...mapGetters('mainStore', ['getManager']),
  },
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  width: 100%;
}

.data {
  width: 80%;
}

.q-pa-md {
  width: 100%;
}

.col-id {
  width: 5%;
}

.col-first-name {
  width: 15%;
}

.col-last-name {
  width: 15%;
}

.col-email {
  width: 15%;
}

.col-stand {
  width: 50%;
}
</style>
