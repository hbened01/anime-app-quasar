<template>
  <q-page
    class="bg-primary window-height window-width row justify-center items-center"
  >
    <div class="column">
      <div class="row">
        <h5 class="text-h5 text-white q-my-md">Anime Jikan</h5>
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
            <p class="text-grey-6">Enter your credentials</p>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Login",
  data() {
    return {
      user: "",
      password: "",
    };
  },
  methods: {
    async handleLogin() {
      this.$router.push('/home')
    },
  }
});
</script>

<style>
.q-card {
  width: 360px;
}
</style>
