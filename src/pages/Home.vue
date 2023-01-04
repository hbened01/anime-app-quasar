<template>
  <q-page class="flex flex-center">
    <div class="row q-pa-sm items-stretch justify-around">
      <card
        class="q-ma-2 my-5"
        v-for="(item, key) in data"
        :key="key"
        :item="item"
      >
        <template v-slot:card-img>
          <q-img
            :src="item?.images?.jpg?.image_url"
            fit="cover"
            loading="lazy"
            spinner-color="white"
            height="300px"
            class="rounded"
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
import { map, filter, findIndex } from "lodash";
import { defineComponent, ref, computed, onMounted, onUpdated } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import useUtils from "./../utils/useUtils.js";
import Card from "components/Card.vue";

export default defineComponent({
  name: "IndexPage",
  components: {
    Card
  },
  setup() {
    const data = ref([]);
    const router = useRouter();
    const route = useRoute();
    const $store = useStore();
    const { sendNotify, getListAnimeTopByPage, validateStatus, logout } =
      useUtils();
    const databaseAnimeTop = computed(
      () => $store.state.jikanApp.databaseAnimeTop
    );
    const getDataAnime = () => {
      const page = 1;
      if (findIndex(databaseAnimeTop?.value, ["page", page]) == -1) {
        getListAnimeTopByPage(page)
          .then((res) => {
            data.value = map(res?.data?.data, (item) => {
              item = { page, ...item };
              return item;
            });
            // SAVE DATA INTO STORE:
            $store.dispatch("jikanApp/setDataTopAnimeByPage", {
              page,
              data: data?.value
            });
            sendNotify({
              key: 0,
              msg: "Data load sucessfully!!!",
              type: "positive",
              color: "positive",
              icon: "announcement",
              position: "top"
            });
          })
          .catch((e) => {
            sendNotify({
              key: 1,
              msg: `${e.message}`
            });
          });
      } else {
        data.value = filter(databaseAnimeTop?.value, ["page", page]);
      }
    };

    // LIFE CICLE:
    onMounted(() => getDataAnime());

    onUpdated(() => {
      validateStatus()
        .then((res) => {
          switch (res?.data?.status) {
            case true:
              getDataAnime();
              break;
            default:
              logout().then(() => {
                router.push("/");
              });
              break;
          }
        })
        .catch((e) => {
          this.sendNotify({
            key: 1,
            msg: `${e.message}`
          });
        });
    });

    return {
      data,
      expanded: ref(false),
      getDataAnime,
      databaseAnimeTop
    };
  }
});
</script>
