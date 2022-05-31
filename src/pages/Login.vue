<template>
  <q-page
    class="bg-primary window-height window-width row justify-center items-center"
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
                @keyup.enter="handleLogin()"
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
                @keyup.enter="handleLogin()"
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
              @click.prevent="handleLogin()"
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
import { mapActions } from "vuex";
import Utils from "./../utils/Utils.vue";

export default defineComponent({
  name: "Login",
  data() {
    return {
      user: "",
      password: "",
    };
  },
  computed: {},
  components: {},
  mixins: [Utils],
  methods: {
    ...mapActions("jikanApp", ["setUserData"]),
    handleGoToRegister() {
      this.$router.push("/register");
    },
    async handleLogin() {
      if (this.name === "" || this.password === "") {
        this.sendNotify({
          key: 1,
          msg: "Insert user and password",
        });
        return true;
      }
      await this.$backend
        .post("/login", {
          user: this.user,
          password: this.password,
        })
        .then((res) => {
          switch (res.data.success) {
            case true:
              // SEND MESSAGE
              this.sendNotify({
                key: 2,
                msg: `${res.data.message}`,
              });
              // SAVE DATA INTO STORE:
              this.setUserData(res.data.params);
              // GO TO HOME:
              this.$router.push("/home");
              break;
            default:
              this.sendNotify({
                key: 1,
                msg: `${res.data.message}`,
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
  },
});
</script>

<style>
.q-card {
  width: 360px;
}
</style>
