<template>
  <q-page
    class="
      bg-primary
      window-height window-width
      row
      justify-center
      items-center
    "
  >
    <div class="column">
      <div class="row">
        <h5 class="text-h5 text-white q-my-md">Anime Jikan Access</h5>
      </div>
      <div class="row">
        <q-card square bordered class="q-pa-lg shadow-1">
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input
                square
                filled
                clearable
                v-model="user"
                type="text"
                label="User"
              >
                <template v-slot:append>
                  <q-icon name="account_circle" color="secondary" />
                </template>
              </q-input>
              <q-input
                square
                filled
                clearable
                v-model="password"
                type="password"
                label="Password"
              >
                <template v-slot:append>
                  <q-icon name="password" color="secondary" />
                </template>
              </q-input>
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn
              icon="login"
              unelevated
              color="positive"
              size="md"
              class="full-width"
              label="Login"
              align="center"
              @click.prevent="handleLogin"
            />
          </q-card-actions>
          <q-card-section class="text-center q-pa-none">
            <p class="text-info">Enter your credentials</p>
            <q-item
              clickable
              tag="a"
              class="text-primary"
              @click.prevent="handleGoToRegister"
            >
              <q-item-section>
                <q-item-label
                  ><q-icon name="how_to_reg" /> Create a new user</q-item-label
                >
              </q-item-section>
            </q-item>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { useQuasar } from "quasar";
import { mapGetters, mapActions } from "vuex";

export default defineComponent({
  name: "Login",
  data() {
    return {
      user: "",
      password: "",
    };
  },
  computed: {
    ...mapGetters('jikanApp',['getState'])
  },
  components: {},
  setup() {
    const $q = useQuasar();
    return $q;
  },
  methods: {
    ...mapActions('jikanApp', ['setUpdateVersion']),
    handleGoToRegister() {
      this.$router.push("/register");
    },
    async handleLogin() {
      console.log()
      await this.$backend
        .post("/login", {
          user: this.user,
          password: this.password,
        })
        .then((res) => {
          switch (res.data.success) {
            case true:
              this.$q.notify({
                message: `${res.data.message}`,
                color: "secondary",
                icon: "thumb_up_alt",
              });
              // SAVE TOKEN JWT:
              this.$q.cookies.set("jwt_bk", res.data.token);
              // this.$router.push("/home");
              break;
            default:
              this.$q.notify({
                message: `${res.data.message}`,
                icon: "report_problem",
              });
              break;
          }
        }).catch((e) => {
          this.$q.notify({
            message: `${e.response.data.message}`,
            icon: "report_problem",
          });
        });
    },
  },
});
</script>

<style>
.q-card {
  width: 360px;
}
</style>
