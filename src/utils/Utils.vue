<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Utils",
  methods: {
    async validateStatus() {
      await this.$backend.get("/statusToken").then((res) => {
        switch (res.data.status) {
          case true:
            return true;
          default:
            this.$router.push("/");
            this.$backend.get("/logout").then((res) => {});
            return false;
        }
      });
    },
  },
});
</script>
