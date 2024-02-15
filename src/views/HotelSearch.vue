<script setup>
import LayoutVue from "../components/Layout/Layout.vue";
import ProductVue from "../components/Layout/ProductHotel.vue";
import ProductCartVue from "../components/ProductCart/HotelFilterCart.vue";
import { useRoute } from "vue-router";
import { onMounted, ref, watch } from "vue";
import { useHotelStore } from "../stores/hotel";
import Pagination from "../components/Layout/Pagination.vue";

const route = useRoute();
const hotelStore = useHotelStore();
const city_name = ref("");
const hotel = ref(null);
const place = ref("");

const handleSearchD = (data) => {
  console.log(data, "this is data");
  place.value = data;
};

const changePage = async (url) => {
  console.log(url, "this is url");
  let data = {
    product_type: "hotel",
  };
  if (place.value) {
    data.place = place.value;
  }
  await hotelStore.getChangePage(url, data);
};

onMounted(async () => {
  city_name.value = route.params.city;
  const res = await hotelStore.getSimpleListAction({
    city_id: route.params.id,
    limit: 20,
  });
  console.log(res, "this is rs");
  hotel.value = res;
});

watch(place, async (newValue) => {
  const res = await hotelStore.getSimpleListAction({
    city_id: route.params.id,
    place: place.value,
    limit: 20,
  });
  hotel.value = res;
});
</script>

<template>
  <div>
    <div class="relative min-h-[100vh]">
      <ProductVue
        class="sticky top-[70px] z-10"
        :name="city_name"
        :data="hotel?.data"
        :total="hotel?.data.length"
        @searchD="handleSearchD"
      />
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-4 px-4"
      >
        <div v-for="a in hotel?.data" :key="a">
          <ProductCartVue :data="a" />
        </div>
        <div v-if="hotel?.data.length == 0">
          <p class="text-xs">
            Your search - "{{ city_name }}" isn't data now !
          </p>
          <img
            src="https://img.freepik.com/free-photo/folder-icon-with-magnifying-document-search-file-scanning-icon-symbol-background-3d-illustration_56104-2072.jpg?size=626&ext=jpg&uid=R70610921&ga=GA1.2.302966112.1678379959&semt=ais"
            alt=""
            class="mt-10"
          />
        </div>
        <div
          class="col-span-1 sm:col-span-2 md:grid-cols-3"
          v-if="hotel?.data.length > 0"
        >
          <Pagination :data="hotel" @change-page="changePage" />
        </div>
      </div>
    </div>
  </div>
</template>
