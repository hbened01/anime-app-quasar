<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          {{ appName }} {{ version }}
        </q-toolbar-title>
        <q-toolbar-title shrink>
          <q-icon name="account_circle" size="md" /> {{ username }}
        </q-toolbar-title>
        <q-btn flat round dense icon="more_vert">
          <q-menu>
            <div class="row no-wrap q-pa-md">
              <div class="column items-center">
                <q-btn
                  color="secondary"
                  label="Logout"
                  push
                  size="md"
                  v-close-popup
                  @click.prevent="handleLogout"
                />
              </div>
            </div>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, onMounted, computed, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import useUtils from "./../utils/useUtils.js";

export default defineComponent({
  name: "MainLayout",
  setup() {
    const router = useRouter();
    const route = useRoute();
    const $store = useStore();
    const { logout } = useUtils();

    const handleLogout = () => {
      logout().then(() => {
        router.push("/");
      });
    };

    const username = ref("");
    const version = computed(() => $store.state.jikanApp.version);
    const getUserInfo = computed(() => $store.getters["jikanApp/getUserInfo"]);

    onMounted(() => {
      username.value = getUserInfo?.value?.username;
    });

    return {
      version,
      username,
      appName: "Anime Jikan",
      handleLogout
    };
  }
});
</script>
