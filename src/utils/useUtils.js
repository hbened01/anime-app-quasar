//useUtils.js
//import ref function to define reactive properties
import { ref, getCurrentInstance } from "vue";
import { useQuasar } from "quasar";
export default function useUtils() {
  const $q = ref(useQuasar());
  const app = getCurrentInstance();
  const { $backend, $api } = app.appContext.config.globalProperties;

  const sendNotify = (d = {}) => {
    switch (d?.key) {
      case 0:
        // NOTIFY CUSTOM ICON:
        $q.value.notify({
          message: d?.msg,
          icon: d?.icon,
          color: d?.color,
          type: d?.type,
          position: d?.position,
        });
        break;
      case 1:
        // NOTIFY WHEN ERROR CASE:
        $q.value.notify({
          message: d?.msg,
          icon: "report_problem",
        });
        break;
      case 2:
        // NOTIFY WHEN SUCCESS CASE:
        $q.value.notify({
          message: d?.msg,
          color: "secondary",
          icon: "thumb_up_alt",
        });
        break;
    }
  };

  const validateStatus = async () => {
    const res = await $backend.get("/statusToken");
    return await res;
  };

  const logout = async () => {
    const res = await $backend.get("/logout");
    return await res;
  };

  const login = async (usr, passwd) => {
    const res = await $backend.post("/login", {
      user: usr,
      password: passwd,
    });
    return await res;
  };

  const register = async (usr, name, passwd) => {
    const res = await $backend.post("/register", {
      user: usr,
      name,
      password: passwd,
    });
    return await res;
  };

  const getListAnimeTopByPage = async (pageNumber = 0, itemsPerPage = 10) => {
    const res = await $api.get(
      `/top/anime?page=${pageNumber}&limit=${itemsPerPage}`
    );
    return await res;
  };

  return {
    login,
    logout,
    register,
    sendNotify,
    validateStatus,
    getListAnimeTopByPage,
  };
}
