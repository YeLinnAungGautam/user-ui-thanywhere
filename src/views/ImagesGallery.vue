<template>
  <div class="">
    <div
      class="flex justify-between sticky top-0 bg-white shadow-custom-filter items-center px-4 py-2 z-20"
    >
      <div @click="router.back()">
        <ChevronLeftIcon class="w-6 h-6 text-main" />
      </div>
      <div
        @click="shareContent"
        class="bg-white rounded-full p-2 w-9 h-9 text-main"
      >
        <img :src="ShareIcon" class="w-full h-full object-cover" alt="" />
      </div>
    </div>
    <div v-for="(item, index) in data" :key="index" class="space-y-6 pt-4 pb-3">
      <div
        :id="item.title"
        class="text-sm font-semibold text-black px-4 bg-white sticky top-[52px] py-2 flex items-center gap-x-2"
      >
        {{ item.title }}
      </div>
      <div class="flex flex-wrap gap-y-4 px-4">
        <img
          v-for="(image, index) in item.images"
          :key="index"
          :src="image.image"
          class="w-full h-auto object-cover rounded-lg shadow-custom"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, watch } from "vue";
import { ChevronLeftIcon } from "@heroicons/vue/24/outline";
import ShareIcon from "../assets/web/send.png";

const route = useRoute();
const router = useRouter();

const data = ref([]);

const shareContent = () => {
  // Check if the Web Share API is supported
  if (navigator.share) {
    // Get the previous route
    const previousRoute = router.options.history.state.back;
    const shareUrl = previousRoute
      ? new URL(previousRoute, window.location.origin).href
      : window.location.origin;

    navigator
      .share({
        title: "Check out this awesome content!",
        text: "Here is some interesting content you might like.",
        url: shareUrl, // Use the previous route URL or fallback to the origin
      })
      .then(() => console.log("Successful share"))
      .catch((error) => console.error("Error sharing", error));
  } else {
    console.error("Web Share API not supported");
  }
};

const title = ref("");

watch(
  () => title.value,
  (newTitle) => {
    // Scroll to the element with the new title as id
    setTimeout(() => {
      const element = document.getElementById(newTitle);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 500);
  }
);

onMounted(() => {
  const encodedData = route.query.data;
  if (encodedData) {
    const decodedData = decodeURIComponent(encodedData);
    data.value = JSON.parse(decodedData);
    title.value = route.query.title ? route.query.title : "";
  }
});
</script>
