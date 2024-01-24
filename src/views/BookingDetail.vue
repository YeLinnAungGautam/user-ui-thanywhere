<script setup>
import {
  HeartIcon,
  ArrowUpTrayIcon,
  GlobeAltIcon,
} from "@heroicons/vue/24/outline";
import BookingVue from "../components/Detail/Booking.vue";
import DescriPartVue from "../components/Detail/DescriPart.vue";
import ImagePartVue from "../components/Detail/ImagePart.vue";
import LayoutVue from "../components/Layout/Layout.vue";
import ProductCartVue from "../components/Layout/ProductCart.vue";
</script>

<template>
  <div>
    <div class="px-[80px] mt-20 pt-6 border border-black/10 space-y-6">
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-medium">Hua Hin Package 5</h1>
        <div class="flex justify-end items-center gap-8">
          <div class="flex justify-start items-start gap-3">
            <ArrowUpTrayIcon class="w-5 h-5" />
            <p>Share</p>
          </div>
          <div class="flex justify-start items-start gap-3">
            <HeartIcon class="w-5 h-5" />
            <p>Save</p>
          </div>
        </div>
      </div>
      <ImagePartVue />
      <div class="grid grid-cols-3 gap-4">
        <div class="col-span-2">
          <div class="space-y-2 pb-4 pt-4 border-b border-b-black/10">
            <h1 class="text-xl font-medium">Hua Hin Package 5</h1>
            <p class="text-main">guests</p>
          </div>
          <div class="space-y-4 py-4 border-b border-b-black/10">
            <h1 class="text-lg font-medium">Destiantions :</h1>
            <div class="space-y-3">
              <div class="flex justify-start gap-3 items-center px-6">
                <GlobeAltIcon class="w-4 h-4" />
                <p>Dream World</p>
              </div>
              <div class="flex justify-start gap-3 items-center px-6">
                <GlobeAltIcon class="w-4 h-4" />
                <p>Dream World</p>
              </div>
              <div class="flex justify-start gap-3 items-center px-6">
                <GlobeAltIcon class="w-4 h-4" />
                <p>Dream World</p>
              </div>
            </div>
          </div>
          <DescriPartVue />
        </div>
        <div>
          <BookingVue />
        </div>
        <div class="col-span-3">
          <h1 class="text-lg font-medium pb-5">Explore the Top Deals !</h1>
          <div class="flex overflow-x-scroll space-x-4 pb-6">
            <div v-for="a in 10" :key="a">
              <ProductCartVue />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
