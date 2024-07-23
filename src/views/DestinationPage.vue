<script setup>
import HeaderHomeVue from "../components/layout/HeaderHome.vue";
import Layout from "../components/layout/LayoutHome.vue";
import searchIcon from "../assets/icons/Search Bar Icons & Headline icons/search bar search icon.svg";
import { useRouter } from "vue-router";
import { useSettingStore } from "../stores/setting";
import { useCityStore } from "../stores/city";
import { ref, watch, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useDestinationStore } from "../stores/destination";

const router = useRouter();
const destinationStore = useDestinationStore();
const settingStore = useSettingStore();
const cityStore = useCityStore();
const myBottomSheet = ref(null);
const { dests } = storeToRefs(destinationStore);
// const { cars } = storeToRefs(carStore);
const { language } = storeToRefs(settingStore);

const open = () => {
  myBottomSheet.value.open();
};

// const openBottomSheet = async () => {
//   open();
// };

const close = () => {
  myBottomSheet.value.close();
};

const filterId = ref("");
const city_name = ref("");

// const filteredHotel = async () => {
//   router.push({
//     name: "HomeVantourResult",
//     params: { id: filterId.value, name: city_name.value },
//   });
//   close();
// };

const changePage = async (url) => {
  console.log(url);
  if (url != null) {
    await destinationStore.getChangePage(url);
  }
};

const bottomOfWindow = ref(false);
const isStickey = ref(false);

const handleScroll = () => {
  bottomOfWindow.value =
    Math.floor(document.documentElement.scrollTop + window.innerHeight) >=
    document.documentElement.offsetHeight - 100;

  const scrolledDown = document.documentElement.scrollTop > 250.39999389648438;
  isStickey.value = document.documentElement.scrollTop > 270;

  if (scrolledDown) {
    showSearch.value = true;
  } else {
    showSearch.value = false;
  }
};

watch(bottomOfWindow, (newVal) => {
  if (bottomOfWindow.value == true) {
    let changePageCalled = false;
    if (newVal && !changePageCalled) {
      console.log("This is the bottom of the window");
      if (dests?.value?.meta?.current_page < dests?.value?.meta?.last_page) {
        changePageCalled = true; // Set the flag to true
        changePage(
          dests?.value?.meta?.links[dests?.value?.meta?.current_page + 1].url
        );
      }
    }
  }
});

const count_filter = ref(0);
// const car_id = ref("");

watch([filterId], async ([newValue]) => {
  let data = {
    city_id: newValue,
  };

  const res = await destinationStore.getFilterAction(data);
  console.log(res, "this is data");
  count_filter.value = res.meta.total;
});

const showSearch = ref(false);

const searchFunction = (data) => {
  city_name.value = data.name;
  filterId.value = data.id;
};

const destList = ref([]);

const goDetialPage = (id) => {
  router.push({ name: "HomeVantourDetail", params: { id: id } });
};

// const getRange = (data) => {
//   // console.log(data);
//   router.push({
//     name: "HomeAttractionResult",
//     params: { id: 2, name: "Bangkok" },
//   });
// };
//  activitydb = activitydb;

onMounted(async () => {
  window.addEventListener("scroll", handleScroll);
  let res = await destinationStore.getListAction();
  await cityStore.getSimpleListAction();
  destList.value = res.data;
  console.log(destList.value, "this is entrance list add");
  // await carStore.getSimpleListAction();
  // console.log(cars.value, "this is car");
});

watch(dests, async (newValue) => {
  if (newValue) {
    destList.value = [...destList.value, ...newValue.data];
  }

  console.log(destList.value, "this is add new");
});
</script>

<template>
  <Layout>
    <HeaderHomeVue :showTitle="true">
      <div class="px-6 space-y-6">
        <div class="text-white pt-4">
          <p class="text-base font-semibold tracking-wider">
            check out destinations
          </p>
          <p class="text-xs">bangkok, pattaya, phuket, etc...</p>
        </div>
        <div class="relative" @click="router.push('/home/destination-search')">
          <input
            type="search"
            name=""
            placeholder=" where "
            class="w-full rounded-full px-6 py-4 text-xs text-main focus:outline-none"
            id=""
          />

          <img
            :src="searchIcon"
            class="w-5 h-5 absolute top-3.5 right-5 text-main"
            alt=""
          />
        </div>
      </div>
    </HeaderHomeVue>
    <div class="h-auto pb-20 pt-8 space-y-4 px-6">
      <h1 class="text-main font-semibold">explore in bangkok</h1>
      <div
        class="border border-black/10 rounded-2xl shadow-sm bg-white grid grid-cols-11 gap-3 p-2.5"
        v-for="i in destList ?? []"
        :key="i"
      >
        <div class="w-full col-span-5 h-[180px] overflow-hidden rounded-2xl">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEoaTsWQuPn6bW-_n6hqZvmy5Lh64qwETLg&s"
            class="w-full h-full object-cover"
            alt=""
          />
        </div>
        <div class="col-span-6 relative">
          <div class="overflow-hidden space-y-1">
            <div>
              <p class="text-xs font-semibold text-main pr-4">
                bangkok day trip 1
              </p>
              <!-- <HeartIcon class="w-4 h-4 absolute top-0 right-0 text-main" /> -->
            </div>
            <div class="flex justify-start gap-1 flex-wrap items-center">
              <p
                class="whitespace-nowrap bg-black/10 text-[8px] px-1 py-0.5 rounded-md text-black/70"
                v-for="a in 2"
                :key="a"
              >
                bangkok
              </p>
            </div>
            <p class="text-[8px] h-[70px] overflow-hidden">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe id
              labore fuga esse, nesciunt sapiente impedit odit voluptatibus
              molestiae, consequuntur deleniti, magni quasi expedita velit
              tenetur cum dolorum minus libero!
            </p>
            <div class="absolute bottom-0 space-y-0.5">
              <!-- <p class="text-[10px] pb-1">starting price</p> -->
              <p
                class="bg-main text-white text-xs font-medium px-3 inline-block py-1 rounded-full"
              >
                read details
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>
