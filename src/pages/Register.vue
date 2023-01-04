<template>
  <q-page
    class="bg-primary window-height window-width row justify-center items-center"
  >
    <div class="column">
      <div class="row">
        <h5 class="text-h5 text-white q-my-md">Anime Jikan Register</h5>
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
                v-model="name"
                type="text"
                label="User Name"
              >
                <template v-slot:append>
                  <q-icon name="drive_file_rename_outline" color="secondary" />
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
              icon="save_alt"
              unelevated
              color="positive"
              size="md"
              class="full-width"
              label="Save"
              align="center"
              @click.prevent="handleRegister"
            />
          </q-card-actions>
          <q-card-section class="text-center q-pa-none">
            <p class="text-grey-6">Enter new user</p>
            <q-item
              clickable
              tag="a"
              class="text-primary"
              @click.prevent="handleGoToLogin"
            >
              <q-item-section>
                <q-item-label>
                  <q-icon name="keyboard_return" /> Return to login!!!
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import useUtils from "./../utils/useUtils.js";

export default defineComponent({
  name: "Register",
  setup() {
    const router = useRouter();
    const { sendNotify, register } = useUtils();
    const user = ref("");
    const name = ref("");
    const password = ref("");

    const handleRegister = () => {
      register({
        user: user.value,
        name: name.value,
        password: password.value
      })
        .then((res) => {
          switch (res.data.success) {
            case true:
              sendNotify({
                key: 2,
                msg: `${res.data.message}`
              });
              router.push("/");
              break;
            default:
              sendNotify({
                key: 1,
                message: `${res.data.message}`
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
    const handleGoToLogin = () => {
      router.push("/");
    };
    return {
      user,
      name,
      password,
      handleRegister,
      handleGoToLogin
    };
  }
});
</script>

<style>
.q-card {
  width: 360px;
}
</style>
