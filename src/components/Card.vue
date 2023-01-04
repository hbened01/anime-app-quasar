<template>
  <q-card class="q-pa-md my-card col-lg-3 col-md-4 col-sm-6 col-xs-12" bordered>
    <slot name="card-img" />
    <q-card-section>
      <div class="text-h5 q-mt-sm q-mb-xs text-orange-10">
        <slot name="card-title"></slot>
      </div>
      <div class="text-caption text-grey h-[20vh] text-justify">
        <q-scroll-area
          :thumb-style="thumbStyle"
          :bar-style="barStyle"
          style="height: 18vh"
          class="pr-5"
        >
          <slot name="card-synopsis"></slot>
        </q-scroll-area>
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
    }
  },
  data() {
    return {};
  },
  setup() {
    return {
      expanded: ref(false),
      thumbStyle: {
        right: "4px",
        borderRadius: "5px",
        backgroundColor: "#027be3",
        width: "5px",
        opacity: 0.75
      },
      barStyle: {
        right: "2px",
        borderRadius: "9px",
        backgroundColor: "#027be3",
        width: "9px",
        opacity: 0.2
      }
    };
  }
});
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 350px
  height: auto
.q-scrollarea
  &__content
    padding-right: 15px !important
</style>
