<template>
  <div>
    <div class="text-black pb-10">
      <div class="text-xs space-y-3" v-if="language == 'english'">
        <p class="font-semibold text-sm text-main">
          Is there a contact number?
        </p>
        <p>
          <span class="font-semibold">Thai:</span> +66 983 498 197, +66 984 272
          050
        </p>
        <p>
          <span class="font-semibold">Myanmar:</span> +95 972 185 129, +95 250
          794 945, +95 262 476 803, +95 777 910 816, +95 979 515 669, +95 9757
          398 700
        </p>
        <p><span class="font-semibold">Viber:</span> +66 831 378 863</p>
        <p class="font-semibold text-sm text-main">
          Where can payment be made?
        </p>
        <p>
          <span class="font-semibold">Bangkok Office:</span> The Palladium
          Shopping Mall, 4th Floor, Zone B, Room IT-95, 555 Ratchaprarop Rd.,
          Makkasan, Ratchathewi, Bangkok 10400, Thailand.
        </p>
        <p>
          <span class="font-semibold">Online Payment:</span> You can also pay
          via Lukob, Thai Bank Account, Kpay, KBZ special, or AYA special.
        </p>
        <p>
          <span class="font-semibold">Yangon Office:</span> No. 39, Room 101
          (Ground Floor), United Condo, Flag Buddha Road, Dagon Township,
          Yangon.
        </p>
        <p>
          <span class="font-semibold">Mandalay Office:</span> No. 74, 84th
          Street, Between 28th and 29th Street, Chan Aye Thar Zan Township,
          Mandalay.
        </p>
      </div>
      <div class="text-xs space-y-3" v-if="language != 'english'">
        <p class="font-semibold text-sm text-main">
          ဆက်သွယ်ရမယ့် ဖုန်းနံပတ်တွေသိချင်ပါတယ် ?
        </p>
        <p>
          <span class="font-semibold">Thai:</span> +66 983 498 197, +66 984 272
          050
        </p>
        <p>
          <span class="font-semibold">Myanmar:</span> +95 972 185 129, +95 250
          794 945, +95 262 476 803, +95 777 910 816, +95 979 515 669, +95 9757
          398 700
        </p>
        <p><span class="font-semibold">Viber:</span> +66 831 378 863</p>
        <p class="font-semibold text-sm text-main">
          ဘယ်ကနေ ငွေပေးချေလို့ရမလဲ ?
        </p>
        <p>Thailand Anywhere ရဲ့ ရုံးခွဲနေရာတွေဖြစ်တဲ့</p>
        <p>
          <span class="font-semibold">Yangon Office</span> - အမှတ်-၃၉၊ အခန်း
          (၁၀၁-မြေညီ)၊ United Condo၊ အလံပြဘုရာလမ်း၊ ဒဂုံမြို့နယ်၊ ရန်ကုန်မြို့။
        </p>
        <p>
          <span class="font-semibold">Mandalay Office</span> - No -74 ,
          84-Street , 28 & 29 Between ၊ ChanAye TharZan Township , Mandalay
        </p>
        <p>
          <span class="font-semibold">Bangkok Office</span> -The Palladium
          Shopping Mall, 4th Floor , Zone B, Room: IT-95, 555 Ratchaprarop Rd.,
          Makkasan, Ratchathewi, Bangkok, Thailand 10400. တို့မှာလည်း
          လူကိုဘ်တိုင်လာရောက် ဝယ်ယူ ပြီးငွေပေးချေနိုင်သလို Thai Bank Account ,
          Kpay , KBZ special, AYA special တို့ကနေလည်းငွေပေးချေနိုင်ပါတယ်။
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSettingStore } from "../../stores/setting";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
const settingStore = useSettingStore();
const { language } = storeToRefs(settingStore);

onMounted(() => {
  settingStore.getLanguage();
});
</script>
