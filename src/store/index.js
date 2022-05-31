import { store } from "quasar/wrappers";
import { createStore, createLogger } from "vuex";
import createPersistedState from "vuex-persistedstate";
import jikanApp from "./module";

// import example from './module-example'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */
// const state = jikanApp.state();

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      jikanApp,
    },
    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING,
    plugins: [createPersistedState()],
  });

  return Store;
});
