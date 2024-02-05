<script setup>
import {
  HeartIcon,
  ArrowUpTrayIcon,
  MapPinIcon,
  WifiIcon,
  LockClosedIcon,
  FireIcon,
  HomeModernIcon,
} from "@heroicons/vue/24/outline";
import { ref, defineProps, defineEmits, onMounted } from "vue";

const props = defineProps({
  data: [Object],
});

const room_type = ref("");

const change = ref({
  price: "-",
  max_person: "-",
  descriptioin: "",
  images: "",
});

const chooseType = () => {
  console.log(room_type.value);
  change.value = {
    price: room_type.value.room_price,
    max_person: room_type.value.max_person,
    description: room_type.value.description,
    images: room_type.value.images[0].image,
  };
};

onMounted(() => {
  change.value = {
    price: "-",
    max_person: "-",
    descriptioin: "",
    images: "",
  };
  console.log(props.data, "this is room");
});
</script>

<template>
  <div class="space-y-4 border border-black/10 px-5 mb-4 py-5 rounded-lg">
    <h1 class="text-xl font-medium">Inclusives</h1>
    <div class="grid grid-cols-2 gap-6 border-b border-black/10 pb-6">
      <div class="flex justify-start items-center space-x-4">
        <WifiIcon class="w-6 h-6" />
        <p class="text-xs font-medium">Wifi free</p>
      </div>
      <div class="flex justify-start items-center space-x-4">
        <LockClosedIcon class="w-6 h-6" />
        <p class="text-xs font-medium">Security</p>
      </div>
      <div class="flex justify-start items-center space-x-4">
        <FireIcon class="w-6 h-6" />
        <p class="text-xs font-medium">Nice Services</p>
      </div>
      <div class="flex justify-start items-center space-x-4">
        <MapPinIcon class="w-6 h-6" />
        <p class="text-xs font-medium">Center</p>
      </div>
    </div>
    <div class="py-2 space-y-2">
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
      <h1 class="text-xl font-medium flex justify-start items-center">
        <img src="../../../public/thailand-baht.png" alt="" class="w-5 h-5" />{{
          change.price
        }}
        for {{ change.max_person }} persons
      </h1>
      <div class="space-y-2" v-if="change.description">
        <label for="" class="text-xs">DESCRIPTON</label>
        <p class="text-xs text-main">{{ change.description }}</p>
      </div>
      <div class="space-y-2">
        <label for="" class="text-xs">ROOM TYPE</label>
        <v-select
          class="border border-black/30 px-4 rounded-md py-1"
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
        <label for="" class="text-xs">CHECKIN DATE</label>
        <input
          type="date"
          name=""
          id=""
          class="w-full px-4 py-2 border border-black/30 focus:outline-none rounded-md"
        />
      </div>
      <div class="space-y-2">
        <label for="" class="text-xs">CHECKOUT DATE</label>
        <input
          type="date"
          name=""
          id=""
          class="w-full px-4 py-2 border border-black/30 focus:outline-none rounded-md"
        />
      </div>

      <div class="pt-3">
        <input
          type="submite"
          name=""
          value="Contact Sales"
          id=""
          class="w-full text-center px-4 py-3 text-white font-semibold bg-main border border-black/30 focus:outline-none rounded-md"
        />
      </div>
      <p class="text-xs text-black/90 text-center">You won't be charged yet.</p>
    </div>
  </div>
</template>
