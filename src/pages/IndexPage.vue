<template>
  <q-page class="flex flex-center">
    <div class="row q-pa-sm items-stretch">
      <card class="q-ma-2" v-for="(item, key) in data" :key="key" :item="item">
        <template v-slot:card-img>
          <q-img
            :src="item.image_url"
            fit="cover"
            loading="lazy"
            spinner-color="white"
            height="300px"
          />
        </template>
        <template v-slot:card-title>
          {{ item.title }}
        </template>
        <template v-slot:card-synopsis>
          {{ item.synopsis }}
        </template>
      </card>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import Card from "components/Card.vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "IndexPage",
  components: {
    Card,
  },
  setup() {
    const $q = useQuasar();
    const data = ref(null);
    const getDataAnime = () => {
      api
        .get("/search/anime?q=naruto")
        .then((response) => {
          data.value = response.data.results;
          $q.notify({
            position: "top",
            message: `Data load sucessfully!!!`,
            type: "positive",
            icon: "announcement",
          });
        })
        .catch((e) => {
          $q.notify({
            message: `${e.message}`,
            icon: "report_problem",
          });
        });
    };
    return {
      data,
      getDataAnime,
      expanded: ref(false),
    };
  },
  created() {
    this.getDataAnime();
  },
});
</script>
