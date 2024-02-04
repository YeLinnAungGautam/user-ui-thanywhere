<script setup>
import LayoutVue from "../components/Layout/Layout.vue";
import ProductVue from "../components/Layout/Product.vue";
import ProductCartVue from "../components/ProductCart/VantourCart.vue";
import { useRoute } from "vue-router";
import { onMounted, ref, watch } from "vue";
import { useVantourStore } from "../stores/vantour";
import Pagination from "../components/Layout/Pagination.vue";

const route = useRoute();
const vantourStore = useVantourStore();
const city_name = ref("");
const vantour = ref(null);
const destination_id = ref("");

const handleSearchD = (data) => {
  console.log(data, "this is id");
  destination_id.value = data;
};

const changePage = async (url) => {
  console.log(url, "this is url");
  let data = {
    product_type: "private_van_tour",
  };
  if (destination_id.value) {
    data.destination_id = destination_id.value;
  }
  await vantourStore.getChangePage(url, data);
};

onMounted(async () => {
  city_name.value = route.params.city;
  const res = await vantourStore.getSimpleListAction({
    city_id: route.params.id,
    limit: 20,
  });
  console.log(res, "this is rs");
  vantour.value = res;
});

watch(destination_id, async (newValue) => {
  const res = await vantourStore.getSimpleListAction({
    city_id: route.params.id,
    destination_id: destination_id.value,
    limit: 20,
  });
  vantour.value = res;
});
</script>

<template>
  <div>
    <div class="relative min-h-[100vh]">
      <ProductVue
        class="sticky top-[70px] z-10"
        :name="city_name"
        :total="vantour?.data.length"
        @searchD="handleSearchD"
      />
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 px-4">
        <div v-for="a in vantour?.data" :key="a">
          <ProductCartVue :data="a" />
        </div>
        <div v-if="vantour?.data.length == 0">
          <p>Your search - "{{ city_name }}" isn't data now !</p>
          <img
            src="https://img.freepik.com/free-vector/curiosity-child-concept-illustration_114360-10739.jpg?size=626&ext=jpg&ga=GA1.2.302966112.1678379959&semt=ais"
            alt=""
            class="mt-10"
          />
        </div>
        <div class="col-span-1 sm:col-span-2" v-if="vantour?.data.length > 0">
          <Pagination :data="vantour" @change-page="changePage" />
        </div>
      </div>
    </div>
  </div>
</template>
