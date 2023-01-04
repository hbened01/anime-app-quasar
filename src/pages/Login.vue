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
import { defineComponent, ref, getCurrentInstance } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import useUtils from "./../utils/useUtils.js";

export default defineComponent({
  name: "Login",
  setup(props, context) {
    const user = ref("");
    const password = ref("");
    const app = getCurrentInstance();
    const router = useRouter();
    const route = useRoute();
    const { sendNotify, login } = useUtils();
    const $store = useStore();

    const handleGoToRegister = () => {
      router.push("/register");
    };

    const handleLogin = async () => {
      if (user.value === "" || password.value === "") {
        sendNotify({
          key: 1,
          msg: "Insert user and password"
        });
        return true;
      }
      login(user.value, password.value)
        .then((res) => {
          switch (res.data.success) {
            case true:
              // SEND MESSAGE
              sendNotify({
                key: 2,
                msg: `${res.data.message}`
              });
              // SAVE DATA INTO STORE:
              $store.dispatch("jikanApp/setUserData", res?.data?.params);
              // GO TO HOME:
              router.push("/home");
              break;
            default:
              sendNotify({
                key: 1,
                msg: `${res.data.message}`
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

    return {
      user,
      password,
      handleLogin,
      handleGoToRegister
    };
  }
});
</script>

<style>
.q-card {
  width: 360px;
}
</style>
