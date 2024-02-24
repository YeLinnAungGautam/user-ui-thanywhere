<script setup>
import {
  HeartIcon,
  ArrowUpTrayIcon,
  MapPinIcon,
  WifiIcon,
  LockClosedIcon,
  FireIcon,
  HomeModernIcon,
  BuildingStorefrontIcon,
} from "@heroicons/vue/24/outline";
import { ref, defineProps, defineEmits, onMounted } from "vue";

const props = defineProps({
  data: [Object],
  facility: [Object],
  lowest: Number,
});

const room_type = ref("");
const date = ref("");

const change = ref({
  name: "",
  price: "-",
  max_person: "-",
  descriptioin: "",
  images: "",
});

const chooseType = () => {
  console.log(room_type.value);
  change.value = {
    name: room_type.value.name,
    price: room_type.value.room_price,
    max_person: room_type.value.max_person,
    description: room_type.value.description,
    images: room_type.value.images[0].image,
  };
};

const goContact = () => {
  window.open("https://www.facebook.com/messages/t/100156219490319");
};

onMounted(() => {
  console.log(props?.data, "this is data");
  for (let i = 0; i < props?.data?.length; i++) {
    if (props.data[i].room_price == props.lowest) {
      change.value = {
        name: props.data[i].name,
        price: props.data[i].room_price,
        max_person: props.data[i].max_person,
        description: props.data[i].description,
        images: props.data[i].images[0].image,
      };
    }
  }

  // console.log(props.facility, "this is room");
});
</script>

<template>
  <div class="space-y-4 border border-black/10 px-5 mb-4 py-5 rounded-lg">
    <h1 class="text-xl font-medium">Facilities</h1>
    <div
      class="grid grid-cols-2 gap-6 border-b border-black/10 pb-6"
      v-if="facility"
    >
      <div
        class="flex justify-start items-center space-x-4"
        v-for="f in facility"
        :key="f.id"
      >
        <!-- <BuildingStorefrontIcon class="w-6 h-6" /> -->
        <div class="w-6 h-6 overflow-hidden">
          <img :src="f.image" class="w-full h-full object-center" alt="" />
        </div>
        <p class="text-xs font-medium">{{ f.name }}</p>
      </div>
    </div>
    <div class="py-2 space-y-2">
      <p class="pb-3 text-base font-semibold" v-if="change.name">
        {{ change.name }}
      </p>
      <img
        v-if="!change.images"
        src="https://www.thespruce.com/thmb/vf_MEDifLRzzmQNjMyUDR1FGA14=/3000x0/filters:no_upscale():max_bytes(150000):strip_icc()/tips-for-decorating-a-beautiful-bedroom-1976169-hero-e960fbb8311c4b9b875a1813962d34eb.jpg"
        alt=""
        class="w-full rounded-lg shadow-md mb-5"
      />
      <img
        v-if="change.images"
        :src="change.images"
        alt=""
        class="w-full rounded-lg shadow-md mb-5"
      />
      <h1 class="text-lg font-medium flex justify-start items-center">
        <img src="../../../public/thailand-baht.png" alt="" class="w-5 h-5" />{{
          change.price
        }}
        / night
      </h1>
      <div class="space-y-2" v-if="change.description">
        <label for="" class="text-xs">DESCRIPTON</label>
        <p class="text-xs text-main">{{ change.description }}</p>
      </div>
      <div class="space-y-2">
        <label for="" class="text-xs">ROOM TYPE</label>
        <v-select
          class="border border-black/10 px-4 rounded-md py-1"
          v-model="room_type"
          :options="data ?? []"
          label="name"
          :clearable="false"
          @option:selected="chooseType"
          :reduce="(a) => a"
          placeholder="Choose Room"
        />
      </div>
      <div class="space-y-2">
        <label for="" class="text-xs">CHECKIN & CHECKOUT DATE</label>

        <VueDatePicker
          v-model="date"
          range
          placeholder="Select check in & out date"
          text-input
        />
      </div>

      <div class="pt-3">
        <input
          type="button"
          @click="goContact"
          name=""
          value="Contact Sales"
          id=""
          class="w-full text-center px-4 py-3 text-white font-semibold bg-main focus:outline-none rounded-md"
        />
      </div>
      <p class="text-xs text-black/90 text-center">You won't be charged yet.</p>
    </div>
  </div>
</template>
