<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item link v-for="link in menuLinks" :key="link.icon">
          <v-list-item-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ link.label }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>TOTVS</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container class="fill-height pt-0" fluid>
        <v-row align="start" justify="center" class="fill-height">
          <v-col>
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
                :headers="clientsHeaders"
                :items="clients"
                :search="search"
                :loading="loading"
                class="elevation-1"
              >
                <!-- formatando apenas na renderizacao, para que o 'search' busque pelo valor sem formtacao -->
                <template v-slot:item.value="{ item }">
                  {{ item.formattedValue }}
                </template>
              </v-data-table>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>

    <v-footer app>
      <span>&copy; Danilo Freire Challenge TOTVS 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
import ServiceApi from "@/services/ServiceApi";

export default {
  name: "App",
  components: {},
  data: () => ({
    drawer: true,
    menuLinks: [
      {
        icon: "people",
        label: "Clientes Inadimplentes",
      },
    ],
    loading: true,
    search: "",
    clientsHeaders: [
      {
        text: "Nome do cliente",
        align: "start",
        value: "name",
      },
      { text: "Valor", value: "value" },
      { text: "Desde", value: "date" },
    ],
    clients: [],
  }),
  created() {
    this.apiIndex();
  },
  methods: {
    async apiIndex() {
      try {
        this.loading = true;
        this.clients = [];
        const { data } = await ServiceApi.index();
        this.clients = data.map((i) => {
          i.formattedValue = this.$numeral(i.value).format("$0,0.00");
          i.date = this.$moment(i.date).format("DD/MM/YYYY");
          return i;
        });
      } catch (error) {
        console.log("error", error);
      } finally {
        setTimeout(() => {
          this.loading = false;
        }, 500);
      }
    },
  },
};
</script>
