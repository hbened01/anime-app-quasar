<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          {{ appName }} {{version}}
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
import { defineComponent } from "vue";
import { mapGetters, mapState } from "vuex";
import Utils from "./../utils/Utils.vue";

export default defineComponent({
  name: "MainLayout",
  components: {},
  data() {
    return {
      username: "",
      appName: "Anime Jikan",
    };
  },
  computed: {
    ...mapGetters("jikanApp", ["getUserInfo"]),
    ...mapState("jikanApp", ["version"]),
  },
  mixins: [Utils],
  created() {
    this.username = this.getUserInfo.username
  },
  methods: {
    handleLogout() {
      this.logout().then(() => {
        this.$router.push("/");
      })
    }
  }
});
</script>
