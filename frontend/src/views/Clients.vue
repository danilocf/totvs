<template>
  <v-card>
    <v-card-title>
      Clientes Inadimplentes
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Buscar"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="$store.state.clientsHeaders"
      :items="$store.state.clients"
      :search="search"
      :loading="$store.state.clientsLoading"
      class="elevation-1"
    >
      <!-- formatando apenas na renderizacao, para que o 'search' busque pelo valor sem formtacao -->
      <template v-slot:item.value="{ item }">
        {{ item.formattedValue }}
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  name: "Clients",
  data: () => ({
    search: ""
  }),
  created() {
    this.$store.dispatch("getClients");
  }
};
</script>
