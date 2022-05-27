<template>
  <q-card
    class="q-pa-md my-card col-lg-3 col-md-4 col-sm-6 col-xs-12"
    bordered
  >
    <slot name="card-img"/>
    <q-card-section>
      <div class="text-h5 q-mt-sm q-mb-xs text-orange-10">
        <slot name="card-title"></slot>
      </div>
      <div class="text-caption text-grey">
        <slot name="card-synopsis"></slot>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Card",
  props: {
    item: {
      type: Object,
      required: true
    },
  },
  data() {
    return {};
  },
  setup() {
    return {
      expanded: ref(false),
    };
  },
});
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 350px
  height: auto
</style>
