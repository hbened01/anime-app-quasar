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
import Utils from "./../utils/Utils.vue";

export default defineComponent({
  name: "IndexPage",
  components: {
    Card,
  },
  mixins: [Utils],
  data() {
    return {
      data: [],
    };
  },
  setup() {
    return {
      expanded: ref(false),
    };
  },
  methods: {
    getDataAnime() {
      api
        .get("/search/anime?q=naruto")
        .then((response) => {
          this.data = response.data.results;
          this.sendNotify({
            key: 0,
            msg: "Data load sucessfully!!!",
            type: "positive",
            icon: "announcement",
            position: "top",
          });
        })
        .catch((e) => {
          this.sendNotify({
            key: 1,
            msg: `${e.response.data.message}`,
          });
        });
    },
  },
  created() {
    this.validateStatus()
      .then((res) => {
        switch (res.data.status) {
          case true:
            this.getDataAnime();
            break;
          default:
            this.logout().then(() => {
              this.$router.push("/");
            })
            break;
        }
      })
      .catch((e) => {
        this.sendNotify({
          key: 1,
          msg: `${e.response.data.message}`,
        });
      });
  },
});
</script>
