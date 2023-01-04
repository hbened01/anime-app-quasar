<!-- <script>
import { defineComponent } from "vue";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "Utils",
  setup() {
    const $q = useQuasar();
    return $q;
  },
  methods: {
    async validateStatus() {
      const res = await this.$backend.get("/statusToken");
      return await res;
    },
    async logout() {
      const res = await this.$backend.get("/logout");
      return await res;
    },
    async getListAnimeTopByPage(pageNumber = 0, itemsPerPage = 10) {
      const res = await this.$api.get(
        `/top/anime?page=${pageNumber}&limit=${itemsPerPage}`
      );
      return await res;
    },
    sendNotify(d = {}) {
      switch (d?.key) {
        case 0:
          // NOTIFY CUSTOM ICON:
          this.$q.notify({
            message: d?.msg,
            icon: d?.icon,
            color: d?.color,
            type: d?.type,
            position: d?.position
          });
          break;
        case 1:
          // NOTIFY WHEN ERROR CASE:
          this.$q.notify({
            message: d?.msg,
            icon: "report_problem"
          });
          break;
        case 2:
          // NOTIFY WHEN SUCCESS CASE:
          this.$q.notify({
            message: d?.msg,
            color: "secondary",
            icon: "thumb_up_alt"
          });
          break;
      }
    }
  }
});
</script> -->
