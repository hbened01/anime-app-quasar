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
    <div>
      <q-pagination
        class="mb-10"
        v-model="current"
        :max="pagination?.last_visible_page || 0"
        :max-pages="pagination?.items?.per_page || 0"
        direction-links
        push
        color="teal"
        active-design="push"
        active-color="primary"
        :ellipses="true"
        @update:model-value="handleUpdatePage"
      />
    </div>
  </q-page>
</template>

<script>
import { map, filter, findIndex } from "lodash";
import { defineComponent, ref, computed, onBeforeMount, onMounted } from "vue";
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
    const current = computed(
      () => $store.state.jikanApp.pagination?.current_page
    );
    const pagination = computed(() => $store.state.jikanApp.pagination);
    const getDataAnime = () => {
      const page = current?.value || 1;
      console.log("aca");
      if (findIndex(databaseAnimeTop?.value, ["page", page]) == -1) {
        getListAnimeTopByPage(page)
          .then((res) => {
            data.value = map(res?.data?.data, (item) => {
              item = { page, ...item };
              return item;
            });
            // SAVE DATA PAGINATION INTO STORE:
            $store.dispatch(
              "jikanApp/setPaginationData",
              res?.data?.pagination
            );
            // SAVE DATA ANIME INTO STORE:
            $store.dispatch("jikanApp/setDataTopAnimeByPage", {
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

    const handleUpdatePage = (value) => {
      // SAVE CURRENT PAGE INTO STORE:
      $store.dispatch("jikanApp/setCurrentPage", value);
      // VALIDATE STATUS AND GET DATA:
      validateStatusCookie();
    };

    const validateStatusCookie = () => {
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
          sendNotify({
            key: 1,
            msg: `${e.message}`
          });
        });
    };

    // LIFE CICLE FUNCTIONS:
    onBeforeMount(() => {
      console.info("OnMounted");
      validateStatusCookie();
    });
    onMounted(() => {
      console.info("Mounted");
      getDataAnime();
    });

    return {
      data,
      current,
      pagination,
      expanded: ref(false),
      getDataAnime,
      databaseAnimeTop,
      handleUpdatePage
    };
  }
});
</script>
