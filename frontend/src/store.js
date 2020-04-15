import Vue from "vue";
import Vuex from "vuex";
import numeral from "numeral";
import moment from "moment";
import ServiceApi from "@/services/ServiceApi";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    menuLinks: [
      {
        icon: "people",
        label: "Clientes Inadimplentes"
      }
    ],
    clientsHeaders: [
      {
        text: "Nome do cliente",
        align: "start",
        value: "name"
      },
      { text: "Valor", value: "value" },
      { text: "Desde", value: "date" }
    ],
    clientsLoading: null,
    clients: []
  },
  mutations: {
    setClientsLoading(state, clientsLoading) {
      state.clientsLoading = clientsLoading;
    },
    setClients(state, clients) {
      state.clients = clients;
    }
  },
  actions: {
    async getClients({ commit }) {
      try {
        commit("setClientsLoading", true);
        commit("setClients", []);
        const { data } = await ServiceApi.index();
        commit(
          "setClients",
          data.map(i => {
            i.formattedValue = numeral(i.value).format("$0,0.00");
            i.date = moment(i.date).format("DD/MM/YYYY");
            return i;
          })
        );
      } catch (error) {
        console.log("error", error);
      } finally {
        setTimeout(() => {
          commit("setClientsLoading", false);
        }, 500);
      }
    }
  }
});
