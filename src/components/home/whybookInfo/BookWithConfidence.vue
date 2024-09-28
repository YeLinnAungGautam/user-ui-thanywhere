<template>
  <div>
    <div class="text-black pb-10">
      <div class="text-xs space-y-3" v-if="language == 'english'">
        <p class="font-semibold text-sm text-main">About Our Team :</p>
        <div class="space-y-3">
          <p class="text-sm">
            Thailand Anywhere was founded in 2022 with a van, and two people.
            Today we are a direct partner of more than 200 attractions, hotels
            and logistic partners. With offices in Myanmar and Thailand. We
            serve hundreds of travelers every week and continously grow our team
            to best serve our customers.
          </p>
          <p class="text-sm">
            Our small but hard-working team provide travelers with many more
            reasons to travel to Thailand! We offer best prices for hotels,
            unique van tour packages, affordable tickets to attraction and
            reading materials about destinations in Thailand.
          </p>
          <p class="text-sm">
            Our sucess is the result of trust from thousands of travelers who
            book with us. Our drive is fuled by the smiles we get to see on
            customers trips.
          </p>
        </div>
        <p class="font-semibold text-sm text-main">
          Learn More About Our Team :
        </p>
        <div>
          <SaleTeamVue />
        </div>
      </div>
      <div class="text-xs space-y-3" v-if="language != 'english'">
        <p class="font-semibold text-sm text-main">About Our Team :</p>
        <div class="space-y-3">
          <p class="text-sm">
            Thailand Anywhere was founded in 2022 with a van, and two people.
            Today we are a direct partner of more than 200 attractions, hotels
            and logistic partners. With offices in Myanmar and Thailand. We
            serve hundreds of travelers every week and continously grow our team
            to best serve our customers.
          </p>
          <p class="text-sm">
            Our small but hard-working team provide travelers with many more
            reasons to travel to Thailand! We offer best prices for hotels,
            unique van tour packages, affordable tickets to attraction and
            reading materials about destinations in Thailand.
          </p>
          <p class="text-sm">
            Our sucess is the result of trust from thousands of travelers who
            book with us. Our drive is fuled by the smiles we get to see on
            customers trips.
          </p>
        </div>
        <p class="font-semibold text-sm text-main">
          Learn More About Our Team :
        </p>
        <div>
          <SaleTeamVue />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSettingStore } from "@/stores/setting";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import SaleTeamVue from "@/components/cart/SaleTeam.vue";
const settingStore = useSettingStore();
const { language } = storeToRefs(settingStore);

onMounted(() => {
  settingStore.getLanguage();
});
</script>
