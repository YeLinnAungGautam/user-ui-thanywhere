<template>
  <div>
    <div class="pt-20 relative">
      <ProductVue class="sticky top-[70px] z-10" />
      <div class="grid grid-cols-4 gap-10 py-8 px-[80px]">
        <div v-for="a in 14" :key="a">
          <ProductCartVue />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import LayoutVue from "../components/Layout/Layout.vue";
import ProductVue from "../components/Layout/Product.vue";
import ProductCartVue from "../components/ProductCart/HotelCart.vue";
</script>
