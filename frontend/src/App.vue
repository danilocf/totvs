<template>
  <v-app> </v-app>
</template>

<script>
import ServiceApi from "@/services/ServiceApi";

export default {
  name: "App",
  components: {},
  data: () => ({
    loading: true,
    list: []
  }),
  mounted() {
    this.apiIndex();
  },
  methods: {
    async apiIndex() {
      try {
        this.loading = true;
        this.list = [];
        const { data } = await ServiceApi.index();
        this.list = data;
      } catch (error) {
        console.log("error", error);
      } finally {
        setTimeout(() => {
          this.loading = false;
        }, 500);
      }
    }
  }
};
</script>

<style lang="scss"></style>
