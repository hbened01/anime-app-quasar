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
import Utils from "./../utils/Utils.vue";
import { map, filter, findIndex } from "lodash";
import { mapActions, mapState } from "vuex";

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
  computed: {
    ...mapState("jikanApp", ["databaseAnimeTop"]),
  },
  setup() {
    return {
      expanded: ref(false),
    };
  },
  methods: {
    ...mapActions("jikanApp", ["setDataTopAnimeByPage"]),
    getDataAnime() {
      const page = 0;
      if (findIndex(this.databaseAnimeTop, ["page", page]) == -1) {
        this.getListAnimeTopByPage(page)
          .then((res) => {
            this.data = map(res.data.top, (item) => {
              item = { page, ...item };
              return item;
            });
            // SAVE DATA INTO STORE:
            this.setDataTopAnimeByPage({
              page,
              data: this.data,
            });
            this.sendNotify({
              key: 0,
              msg: "Data load sucessfully!!!",
              type: "positive",
              color: "positive",
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
      } else {
        this.data = filter(this.databaseAnimeTop, ["page", page])
      }
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
            });
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
