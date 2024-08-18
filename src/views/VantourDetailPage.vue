<template>
  <div>
    <transition name="fade">
      <div v-if="loading" class="animate transition">
        <LoadingPageVue />
      </div>
    </transition>
    <div class="relative" v-if="!loading">
      <ImageCarousel :data="images" />
      <ChevronLeftIcon
        @click="router.back()"
        class="bg-white rounded-full p-1.5 w-9 h-9 text-main z-20 absolute top-10 left-6"
      />
      <!-- <ArrowUpTrayIcon
        class="bg-white rounded-full p-1.5 w-9 h-9 text-main z-20 absolute top-10 right-[70px]"
      /> -->
      <div
        @click="shareContent"
        class="bg-white rounded-full p-2 w-9 h-9 text-main z-20 absolute top-10 right-[70px]"
      >
        <img :src="ShareIcon" class="w-full h-full object-cover" alt="" />
      </div>
      <HeartIcon
        class="bg-white rounded-full p-1.5 w-9 h-9 text-main z-20 absolute top-10 right-6"
      />

      <div class="px-4">
        <div
          class="bg-white mt-4 mb-4 p-5 rounded-3xl border border-black/10 space-y-4"
        >
          <div class="space-y-2 pb-4">
            <h1 class="text-main font-medium">{{ detail?.name }}</h1>
            <div class="flex justify-start items-center gap-1">
              <p class="text-[10px] py-0.5 rounded inline-block text-main">
                {{ detail?.destinations?.length }} destinations
              </p>
            </div>
            <div class="space-y-3">
              <div>
                <ul class="space-y-2 pb-3">
                  <li
                    v-for="l in detail?.destinations"
                    :key="l.id"
                    class="text-xs font-medium flex justify-start items-center gap-2"
                  >
                    <div class="w-2 h-2 rounded-full bg-main"></div>
                    <p>{{ l.name }}</p>
                  </li>
                </ul>
              </div>
              <div
                class="flex flex-1 justify-start space-x-3 mt-6 pb-4 items-center overflow-x-scroll scroll-container border-b border-black/10"
                v-if="detail?.destinations.length > 0"
              >
                <div
                  v-for="i in detail?.destinations"
                  :key="i"
                  @click="goDetialDesPage(i.id)"
                >
                  <div class="w-[200px] h-[150px] overflow-hidden rounded-2xl">
                    <img
                      :src="i?.feature_img"
                      alt=""
                      v-if="i?.feature_img"
                      class="w-full h-full object-cover"
                    />
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEoaTsWQuPn6bW-_n6hqZvmy5Lh64qwETLg&s"
                      alt=""
                      v-if="!i?.feature_img"
                      class="w-full h-full object-cover"
                    />
                  </div>
                  <p class="text-xs pt-2 font-medium pl-2 whitespace-nowrap">
                    {{ i?.name }}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <p class="text-sm font-semibold text-main pb-2">summary</p>
              <p
                class="text-[13.5px] text-black/80 leading-6"
                :class="!seeMoreShow ? 'h-[147px] overflow-hidden' : 'h-auto'"
                v-html="
                  language == 'english'
                    ? detail?.full_description_en
                    : detail?.long_description
                "
              ></p>
              <p
                class="text-[10px] text-main"
                v-if="!seeMoreShow"
                @click="seeMoreShow = true"
              >
                see more
              </p>
              <p
                class="text-[10px] text-main"
                v-if="seeMoreShow"
                @click="seeMoreShow = false"
              >
                see less
              </p>
            </div>
            <div
              v-for="d in detail?.destinations"
              :key="d"
              class="space-y-2 pb-2"
            >
              <p class="text-sm font-semibold text-main">{{ d.name }}</p>
              <p class="text-[13.5px]">{{ d.summary }}</p>
            </div>
            <div class="space-y-3">
              <h1 class="font-medium pt-3">select cars</h1>
              <div
                class="flex flex-1 justify-start space-x-3 mt-6 pb-2 items-center overflow-x-scroll scroll-container"
              >
                <div
                  v-for="i in detail?.cars"
                  :key="i"
                  class="border border-black/10 min-w-[200px] rounded-2xl shadow-sm bg-white"
                >
                  <div
                    class="w-full col-span-5 h-[150px] overflow-hidden rounded-t-2xl"
                  >
                    <img
                      :src="getCarTypeImage(i?.name)"
                      class="w-full h-full object-cover"
                      alt=""
                    />
                  </div>
                  <div class="py-3 px-2">
                    <p class="text-sm font-semibold line-clamp-1">
                      {{ i?.name }}
                    </p>

                    <div class="text-[10px] gap-0.5 pt-1 space-y-2">
                      <div class="flex justify-between items-center">
                        <p class="text-green text-xs font-medium">
                          max persons
                        </p>
                        <p
                          class="text-main bg-green/10 px-4 py-0.5 rounded-lg text-xs font-medium"
                        >
                          {{ i?.max_person }}
                        </p>
                      </div>
                      <p class="text-black text-xs font-medium">car price</p>
                      <p
                        class="text-white bg-main inline-block px-4 text-sm font-semibold py-1 rounded-full"
                      >
                        {{ i.price }} THB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="bg-main py-3 mb-10 rounded-3xl text-center text-white text-sm"
          @click="modalOpen = true"
        >
          <p>talk to sales</p>
        </div>
        <div
          class="bg-white mt-4 mb-4 p-5 rounded-3xl border border-black/10 space-y-6"
        >
          <h1 class="font-medium">
            other packages in {{ detail?.cities[0].name }}
          </h1>
          <div
            class="flex justify-start items-center flex-nowrap overflow-scroll scroll-container pb-2"
          >
            <div
              class="border border-black/10 min-w-[230px] rounded-2xl shadow-sm bg-white mr-4"
              v-for="i in relative_place ?? []"
              :key="i"
              :class="detail?.name == i?.name ? 'hidden' : ''"
            >
              <!-- @click="goDetialPage(i?.id)" -->
              <div
                @click="goDetailPage(i?.id)"
                class="w-full col-span-5 h-[150px] overflow-hidden rounded-t-2xl"
              >
                <img
                  :src="i?.cover_image"
                  class="w-full h-full object-cover"
                  alt=""
                  v-if="i?.cover_image != null"
                />
                <img
                  v-if="i?.cover_image == null"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEoaTsWQuPn6bW-_n6hqZvmy5Lh64qwETLg&s"
                  class="w-full h-full object-cover"
                  alt=""
                />
              </div>
              <div class="py-3 px-2">
                <p class="text-sm font-semibold line-clamp-1">
                  {{ i?.name }}
                </p>
                <p class="text-[10px] py-0.5 rounded inline-block text-main">
                  {{ detail?.destinations?.length }} destinations
                </p>

                <div class="text-[10px] gap-0.5 pt-1 space-y-2">
                  <p class="text-black text-xs font-medium">
                    starting car price
                  </p>
                  <p
                    class="text-white bg-main inline-block px-4 text-sm font-semibold py-1 rounded-full"
                  >
                    {{ i.lowest_car_price }} THB
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal :isOpen="modalOpen" @closeModal="modalOpen = false">
          <DialogPanel
            class="w-full font-poppins max-w-sm transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
          >
            <DialogTitle
              as="div"
              class="text-lg flex justify-between items-center font-medium leading-6 text-gray-900 mb-5"
            >
              <p class="opacity-0">...</p>
              <p class="text-sm font-medium text-main">
                select on option to book
              </p>
              <XMarkIcon class="w-5 h-5" @click="modalOpen = false" />
            </DialogTitle>
            <div class="grid grid-cols-2 gap-5">
              <a
                href="https://www.facebook.com/thailandanywherevip"
                target="_blink"
                class="outline-none text-center bg-main/20 border border-main flex flex-col justify-center items-center p-3 rounded-2xl space-y-1"
              >
                <img
                  :src="messengerIcon"
                  alt=""
                  class="w-14 h-14 my-3 object-cover mx-auto"
                />
                <div class="pt-1">
                  <p class="text-[10px]">book with</p>
                  <p class="text-xs font-medium">messenger</p>
                </div>
              </a>
              <a
                href=""
                class="outline-none text-center border border-black/20 flex flex-col justify-center items-center p-3 rounded-2xl space-y-1"
              >
                <img
                  :src="viberIcon"
                  alt=""
                  class="w-14 h-14 my-3 object-cover mx-auto"
                />
                <div class="pt-1">
                  <p class="text-[10px]">book with</p>
                  <p class="text-xs font-medium">viber</p>
                </div>
              </a>
              <a
                href=""
                class="outline-none text-center border border-black/20 flex flex-col justify-center items-center p-3 rounded-2xl space-y-1"
              >
                <img
                  :src="whatsappIcon"
                  alt=""
                  class="w-14 h-14 my-3 object-cover mx-auto"
                />
                <div class="pt-1">
                  <p class="text-[10px]">book with</p>
                  <p class="text-xs font-medium">whats app</p>
                </div>
              </a>
              <a
                href=""
                class="outline-none text-center border border-black/20 flex flex-col justify-center items-center p-3 rounded-2xl space-y-1"
              >
                <img
                  :src="callIcon"
                  alt=""
                  class="w-14 h-14 my-3 object-cover mx-auto"
                />
                <div class="pt-1">
                  <p class="text-[10px]">book with</p>
                  <p class="text-xs font-medium">call center</p>
                </div>
              </a>
            </div>
          </DialogPanel>
        </Modal>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import ImageCarousel from "../components/hotelbookings/ImageCarousel.vue";
import { ChevronLeftIcon, HeartIcon } from "@heroicons/vue/24/outline";
// import logo from "../assets/logo.png";
import ShareIcon from "../assets/web/send.png";
import LoadingPageVue from "../components/layout/LoadingPage.vue";
import { useSettingStore } from "../stores/setting";
import messengerIcon from "../assets/Booking icons/messenger.png";
import viberIcon from "../assets/Booking icons/viber.png";
import whatsappIcon from "../assets/Booking icons/whatsapp.png";
import callIcon from "../assets/Booking icons/call.png";
import Modal from "../components/layout/Modal.vue";
import { DialogPanel, DialogTitle } from "@headlessui/vue";
import { useVantourStore } from "../stores/vantour";
// import { StarIcon } from "@heroicons/vue/24/solid";
import { storeToRefs } from "pinia";

const route = useRoute();
const router = useRouter();
const vantourStore = useVantourStore();

const detail = ref(null);
const loading = ref(false);
const settingStore = useSettingStore();
const { language } = storeToRefs(settingStore);
const seeMoreShow = ref(false);
const images = ref([]);

const getDetail = async (id) => {
  loading.value = true;
  images.value = [];
  const res = await vantourStore.getDetailAction(id);
  console.log("====================================");
  console.log(res);
  console.log("====================================");
  detail.value = res.data;
  if (res.data.cover_image) {
    images.value.push({ image: res.data.cover_image });
  }
  // if (res.data.images.length > 0) {
  //   for (let i = 0; i < res.data.images.length; i++) {
  //     images.value.push({ image: res.data.images[i].image });
  //   }
  // }
  if (res.data.destinations.length > 0) {
    for (let i = 0; i < res.data.destinations.length; i++) {
      // if (res.data.destinations[i].images.length > 0) {
      //   for (let j = 0; j < res.data.destinations[i].images.length; j++) {
      //     images.value.push({
      //       image: res.data.destinations[i].images[j].image,
      //     });
      //   }
      // }
      images.value.push({
        image: res.data.destinations[i].feature_img,
      });
    }
  }
  console.log("====================================");
  console.log(images.value, "this is images");
  console.log("====================================");

  await getRelative(res.data?.cities[0]?.id);
  loading.value = false;
};

const getCarTypeImage = (cartype) => {
  switch (cartype.toLowerCase()) {
    case "saloon":
      return "https://img.freepik.com/free-vector/white-hatchback-car-isolated-white-vector_53876-64418.jpg?t=st=1723999519~exp=1724003119~hmac=a718a6c123d83226d44ae2f9e9bac7093396b599901c8941edb16f1c81de4586&w=1060";
    case "suv":
      return "https://img.freepik.com/free-vector/white-hatchback-car-isolated-white-vector_53876-67409.jpg?t=st=1723999608~exp=1724003208~hmac=39673ad52ce4b6941be751facd1002140ee220e95ff309dc64e54fb3aeca35a2&w=900";
    case "vip van":
      return "https://img.freepik.com/free-photo/3d-car-with-simple-background_23-2150796878.jpg?t=st=1723999724~exp=1724003324~hmac=90bc086f1c3138107e3a513d861ef2bfe8b06a55b92e1e3bb90b5f9079abdff8&w=740";
    case "vvip van (luxury)":
      return "https://img.freepik.com/free-vector/white-hatchback-car-isolated-white-vector_53876-64418.jpg?t=st=1723999519~exp=1724003119~hmac=a718a6c123d83226d44ae2f9e9bac7093396b599901c8941edb16f1c81de4586&w=1060";
    case "bus (30 seaters)":
      return "https://img.freepik.com/free-vector/white-hatchback-car-isolated-white-vector_53876-64418.jpg?t=st=1723999519~exp=1724003119~hmac=a718a6c123d83226d44ae2f9e9bac7093396b599901c8941edb16f1c81de4586&w=1060";
    case "bus (20 seaters)":
      return "https://img.freepik.com/free-vector/white-hatchback-car-isolated-white-vector_53876-64418.jpg?t=st=1723999519~exp=1724003119~hmac=a718a6c123d83226d44ae2f9e9bac7093396b599901c8941edb16f1c81de4586&w=1060";
    case "50 seaters bus":
      return "https://img.freepik.com/free-vector/white-hatchback-car-isolated-white-vector_53876-64418.jpg?t=st=1723999519~exp=1724003119~hmac=a718a6c123d83226d44ae2f9e9bac7093396b599901c8941edb16f1c81de4586&w=1060";
    case "40 seaters bus":
      return "https://img.freepik.com/free-vector/white-hatchback-car-isolated-white-vector_53876-64418.jpg?t=st=1723999519~exp=1724003119~hmac=a718a6c123d83226d44ae2f9e9bac7093396b599901c8941edb16f1c81de4586&w=1060";
    case "14 seater":
      return "https://img.freepik.com/free-vector/white-hatchback-car-isolated-white-vector_53876-64418.jpg?t=st=1723999519~exp=1724003119~hmac=a718a6c123d83226d44ae2f9e9bac7093396b599901c8941edb16f1c81de4586&w=1060";
    default:
      return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEoaTsWQuPn6bW-_n6hqZvmy5Lh64qwETLg&s"; // Default image
  }
};

const shareContent = () => {
  // Check if the Web Share API is supported
  if (navigator.share) {
    navigator
      .share({
        title: "Check out this awesome content!",
        text: "Here is some interesting content you might like.",
        url: window.location.href, // Current page URL
      })
      .then(() => console.log("Successful share"))
      .catch((error) => console.error("Error sharing", error));
  } else {
    console.error("Web Share API not supported");
  }
};

const relative_place = ref(null);
const getRelative = async (city_id) => {
  const res = await vantourStore.getSimpleListAction({
    city_id: city_id,
    type: "vantour",
  });
  console.log("====================================");
  console.log(res, "this is relative");
  console.log("====================================");
  relative_place.value = res.data;
};

const goDetailPage = (id) => {
  router.push({
    name: "HomeVantourDetail",
    params: { id: id },
  });
};

const goDetialDesPage = (id) => {
  router.push({ name: "HomeDestinationDetail", params: { id: id } });
};

const modalOpen = ref(false);

watch(
  () => route.params.id,
  (newId) => {
    getDetail(newId); // Re-fetch data when the ID changes
  }
);

onMounted(async () => {
  await settingStore.getLanguage();
  await getDetail(route.params.id);
});
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
