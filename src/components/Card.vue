<template>
  <q-card class="q-pa-md my-card col-lg-3 col-md-4 col-sm-6 col-xs-12" bordered>
    <slot name="card-img" />
    <q-card-section class="pb-0">
      <q-btn
        fab
        color="primary"
        icon="fa-solid fa-ranking-star"
        class="absolute top-0 right-[12px] -translate-y-[50%]"
      />

      <div class="row no-wrap items-center">
        <div class="col text-h6 ellipsis">
          <slot name="card-title">Title</slot>
        </div>
        <div
          class="col-auto text-grey text-caption q-pt-md row no-wrap items-center ml-1"
        >
          <slot name="card-icon-img-text">Rank</slot>
        </div>
      </div>
    </q-card-section>
    <q-card-section class="pt-0">
      <div class="text-overline text-orange-9">
        <slot name="card-overline">Overline</slot>
      </div>
      <div class="text-h6 q-mb-xs text-orange-10 ellipsis">
        <slot name="card-rating">Rating</slot>
      </div>
      <div class="text-caption text-grey h-[20vh] text-justify mb-5">
        <q-scroll-area
          :thumb-style="thumbStyle"
          :bar-style="barStyle"
          style="height: 18vh"
          class="pr-5"
        >
          <slot name="card-synopsis">Synopsis</slot>
        </q-scroll-area>
      </div>
    </q-card-section>
    <q-card-actions>
      <q-btn
        class="absolute bottom-5 w-[85%]"
        color="primary"
        :label="btLabelAction"
      />
    </q-card-actions>
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
    btLabelAction: {
      type: String,
      required: false,
      default: "read"
    }
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
</style>
