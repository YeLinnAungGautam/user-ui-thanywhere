<script setup>
import {
  HeartIcon,
  ArrowUpTrayIcon,
  GlobeAltIcon,
  LockClosedIcon,
  FireIcon,
  HomeModernIcon,
} from "@heroicons/vue/24/outline";
import { ref, defineProps, defineEmits, onMounted } from "vue";

const props = defineProps({
  data: [Object],
});

const car_type = ref("");
const change = ref({
  price: "-",
  person: "-",
  image:
    "https://img.freepik.com/free-vector/blue-hatchback-car-isolated-white-vector_53876-64419.jpg?size=626&ext=jpg&ga=GA1.2.302966112.1678379959&semt=ais",
});
const date = ref("");
const chooseType = () => {
  console.log(car_type.value);
  change.value = {
    price: car_type.value.price,
    person: car_type.value.max_person,
  };

  switch (car_type.value.name) {
    case "Saloon":
      change.value.image =
        "https://www.gac-motor.com/static/en/model/images/ga6/car.png";
      break;
    case "SUV":
      change.value.image =
        "https://i.pinimg.com/originals/af/a4/00/afa400007496b0014137d94dd1e4a496.png";
      break;
    case "VIP Van":
      change.value.image =
        "https://static.wixstatic.com/media/1a69a8_84dee4fdfd394afabe492cafbe27e049~mv2.png/v1/crop/x_0,y_43,w_640,h_393/fill/w_544,h_294,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/mercedes-vito-transfer-istanbul-sabiha-gokcen-7-kisilik.png";
      break;
    case "VVIP Van (Luxury)":
      change.value.image =
        "https://static.wixstatic.com/media/1a69a8_84dee4fdfd394afabe492cafbe27e049~mv2.png/v1/crop/x_0,y_43,w_640,h_393/fill/w_544,h_294,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/mercedes-vito-transfer-istanbul-sabiha-gokcen-7-kisilik.png";
      break;
    case "Bus (30 seaters)":
      change.value.image =
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbKn-fBmU3QIp9McNgSrbIxiHaLdxAtamH1AZ2C0thzY5xO1w0CRpQjuv5k_n4vbVdTww&usqp=CAU";
      break;
    case "Bus(20 Seaters)":
      change.value.image =
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbKn-fBmU3QIp9McNgSrbIxiHaLdxAtamH1AZ2C0thzY5xO1w0CRpQjuv5k_n4vbVdTww&usqp=CAU";
      break;
    case "50 Seaters Bus":
      change.value.image =
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbKn-fBmU3QIp9McNgSrbIxiHaLdxAtamH1AZ2C0thzY5xO1w0CRpQjuv5k_n4vbVdTww&usqp=CAU";
      break;
    default:
      // Handle the case when car_type.value.name doesn't match any of the above cases
      break;
  }
};

const goContact = () => {
  window.open("https://www.facebook.com/messages/t/100156219490319");
};

onMounted(() => {
  change.value = {
    price: "-",
    person: "-",
    image:
      "https://img.freepik.com/free-vector/blue-hatchback-car-isolated-white-vector_53876-64419.jpg?size=626&ext=jpg&ga=GA1.2.302966112.1678379959&semt=ais",
  };
  console.log(props.data, "this is car");
});
</script>

<template>
  <div class="space-y-4 border border-black/10 px-5 mb-4 py-5 rounded-lg">
    <h1 class="text-xl font-medium">Inclusives</h1>
    <div class="grid grid-cols-2 gap-6 border-b border-black/10 pb-6">
      <div class="flex justify-start items-center space-x-4">
        <GlobeAltIcon class="w-6 h-6" />
        <p class="text-xs font-medium">Tolls</p>
      </div>
      <div class="flex justify-start items-center space-x-4">
        <LockClosedIcon class="w-6 h-6" />
        <p class="text-xs font-medium">Fuel</p>
      </div>
      <div class="flex justify-start items-center space-x-4">
        <FireIcon class="w-6 h-6" />
        <p class="text-xs font-medium">Driver</p>
      </div>
      <div class="flex justify-start items-center space-x-4">
        <HomeModernIcon class="w-6 h-6" />
        <p class="text-xs font-medium">Hotel Pickup & Dropoff</p>
      </div>
    </div>
    <div class="py-2 space-y-2">
      <img :src="change.image" alt="" />
      <h1 class="text-xl font-medium flex justify-start items-center">
        <img src="../../../public/thailand-baht.png" alt="" class="w-5 h-5" />{{
          change.price
        }}
        for {{ change.person }} Seater
      </h1>
      <div class="space-y-2">
        <label for="" class="text-xs">CAR TYPE</label>
        <v-select
          class="border border-black/10 px-4 rounded-md py-1"
          v-model="car_type"
          :options="data ?? []"
          label="name"
          :clearable="false"
          @option:selected="chooseType"
          :reduce="(a) => a"
          placeholder="Choose Car"
        />
      </div>
      <div class="space-y-2">
        <label for="" class="text-xs">TRAVEL DATE</label>
        <!-- <input
          type="date"
          name=""
          id=""
          class="w-full px-4 py-2 border border-black/30 focus:outline-none rounded-md"
        /> -->
        <VueDatePicker v-model="date">select travel date</VueDatePicker>
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
