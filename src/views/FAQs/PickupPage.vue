<template>
  <div>
    <div class="text-black pb-10">
      <div class="text-xs space-y-3" v-if="language == 'english'">
        <p class="font-semibold text-sm text-main">
          What time will you arrive for pick-up?
        </p>
        <p>
          Guests are welcome at a time that suits them best. For the 10-hour
          trip, the duration will begin from the time of departure.
        </p>
        <p class="font-semibold text-sm text-main">
          How many days in advance to book the car?
        </p>
        <p>
          For overnight trips, it's best to book 3 days ahead if the travel date
          is confirmed. For last-minute trips, booking at least 1 day in advance
          is ideal.
        </p>
        <p class="font-semibold text-sm text-main">
          Is a deposit required when booking?
        </p>
        <p>
          No need to pay in advance—you can settle the payment with the driver
          after the trip.
        </p>
        <p class="font-semibold text-sm text-main">
          How many hours can the car be used?
        </p>
        <p>
          For all-day service, the time is set for 10 hours. If you don’t need
          it all day, you can rent the car for 3, 4, or 6 hours.
        </p>
        <p class="font-semibold text-sm text-main">
          How many places can be visited in 10 hours by car?
        </p>
        <p>
          In Bangkok, you can typically visit 3 to 5 places, depending on the
          distance. Outside the city, you can visit 2 to 3 places, including
          travel time.
        </p>
        <p class="font-semibold text-sm text-main">
          What services are offered related to the car?
        </p>
        <p>
          We provide day trip car rentals, hotel pickup and drop-off, overnight
          car rentals, and transfer or one-way car services.
        </p>
        <p class="font-semibold text-sm text-main">
          What is included in the car package?
        </p>
        <p>
          The package includes a professional driver, fuel, tolls, and parking
          fees—all fully covered.
        </p>
        <p class="font-semibold text-sm text-main">
          How many people can rent a car?
        </p>
        <p>
          Our cars can accommodate a minimum of 3 passengers, but solo rentals
          are also available. Pricing will vary based on the type of car.
        </p>
        <p class="font-semibold text-sm text-main">
          How can payment be made if the time is exceeded?
        </p>
        <p>
          If you go over the specified time, you can continue the rental by
          paying an additional 300 BHT per hour.
        </p>
        <p class="font-semibold text-sm text-main">
          Can the car route for tours be planned?
        </p>
        <p>
          Just provide the city and its notable attractions. We will create a
          route covering various famous places and activities and produce a
          detailed itinerary.
        </p>
        <p class="font-semibold text-sm text-main">
          Are there any travel packages available?
        </p>
        <p>
          Packages vary by city based on the location you want to visit.
          Customizable packages are also offered.
        </p>
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
        <p class="font-semibold text-sm text-main">ဘယ်အချိန် လာကြိုပေးလဲ ?</p>
        <p>
          ဧည့်သည်တွေ အဆင်ပြေတဲ့ အချိန်လာကြို ပေးပါတယ်။ ၁၀နာရီ ခရီးစဉ်အတွက်ဆို
          စထွက်တဲ့အချိန် မှ စ ပြီး သတ်မှတ်ပေးတာဖြစ်ပါတယ်။
        </p>
        <p class="font-semibold text-sm text-main">
          ကား Booking ဘယ်နှရက်လောက် ကြိုတင်ရင်ရမလဲ?
        </p>
        <p>
          ညအိပ်ခရီးစဉ်တွေအတွက် ခရီးသွားရက်လေး သေချာသိရင်တော့
          ၃ရက်လောက်ကြိုပြီးဘိုကင်တင်ထားလို့ရပါတယ်
          ။အရေးပေါ်ခရီးစဉ်တွေအတွက်ဆိုရင်လည်းအနည်းဆုံး ၁ ရက်တော့ ကြိုတင် Booking
          တင်ရင် အဆင်ပြေပါတယ်။
        </p>
        <p class="font-semibold text-sm text-main">
          Booking တင်ရင် စရံ ကြိုပေးရလား?
        </p>
        <p>စရံ ကြိုပေးစရာမလိုပါဘူး ။ ခရီးစဥ်ပြီးမှကားဆရာနဲ့ချေပေးလို့ရပါတယ်။</p>
        <p class="font-semibold text-sm text-main">
          ကားအသုံးပြုချိန်ဘယ်နှနာရီ ရပါသလဲ?
        </p>
        <p>
          တစ်နေ့လုံးစာအတွက်ဆိုရင်တော့ အချိန် ၁၀ နာရီသတ်မှတ်ထားပါတယ်။တရက်လုံး
          အသုံးမပြုချင်သူများအနေနဲ့ဆိုရင်တော့ ၃ နာရီ ၊ ၄ နာရီ ၊ ၆ နာရီ ဆိုပြီး
          ငှားရမ်းနိုင်ပါတယ်။
        </p>
        <p class="font-semibold text-sm text-main">
          ကားသုံးချိန် ၁၀ နာရီအတွင်း နေရာဘယ်နှခုသွားလို့ရလဲ ?
        </p>
        <p>
          ဘန်ကောက်မြို့တွင်းဆိုရင်တော့ အနီးအဝေးပေါ်မူတည်ပြီး ၃ နေရာမှ ၅
          နေရာထိသွားလို့ရပါတယ်။ မြို့ပြင်ဆိုရင်တော့ အသွားအပြန် အချိန်တေါအပါအဝင်
          ၂ နေရာ မှ ၃ နေရာ ထိသွားနိုင်ပါတယ်။
        </p>
        <p class="font-semibold text-sm text-main">
          ကားနဲ့ ပတ်သတ်ပြီး ဘာ Service တွေရှိလဲ ?
        </p>
        <p>
          ကား နဲ့ ပတ်သတ်ရင်တော့ Day Trip နေ့ချင်းပြန်ကားအငှား ဝန်ဆောင်မှု ၊
          ဟိုတယ် ကြို /ပို့ ဝန်ဆောင်မှု ၊ ညအိပ် ခရီးစဉ် ကားအငှားဝန်ဆောင်မှု ၊
          Transfer တစ်ကြောင်းစာ ကား ဝန်ဆောင်မှုတို့ရရှိနိုင်ပါတယ်။
        </p>
        <p class="font-semibold text-sm text-main">
          Car Package တွေမှာဘာတွေပါလဲ?
        </p>
        <p>
          Car Package တွေမှာ ကျွမ်းကျင်ယဉ်မောင်း ၊ ဆီ ၊ လမ်းတံတာကြေး နှင့်
          ကားပါကင်ကြေးများ အပြီးအစီးပါဝင်ပါတယ်။
        </p>
        <p class="font-semibold text-sm text-main">
          လူဘယ်နှယောက်ကစပြီး ကားစငှားလို့ ရမလဲ?
        </p>
        <p>
          ကား အမျိုးအစားတွေမှာဆိုရင်တော့ အနည်းဆုံး ၃ယောက်ကနေ စတင်စီးနိုင်ပြီး ၊
          တစ်ယောက်ထဲလည်း ကားစီးလုံး ငှားရမ်းအသုံးပြုနိုင်ပါတယ်။
          ကားအမျိုးအစားပေါ်မူတည်ပြီး ဈေးနှုန်းက ကွာခြားသွားမှာဖြစ်ပါတယ်။
        </p>
        <p class="font-semibold text-sm text-main">
          သတ်မှတ်ချိန်ထက် အချိန်ကျော်လွန်ခဲ့ပါက ဘယ်လိုလုပ်ပေးလဲ?
        </p>
        <p>
          သတ်မှတ်ထားတဲ့အချိန်ထပ် ကျော်လွန်ခဲ့ပါက ၁ နာရီကို 300 BHT extra charge
          ပေး၍ ဆက်လက်ငှားရမ်းနိုင်ပါတယ်။
        </p>
        <p class="font-semibold text-sm text-main">
          ကားလမ်းကြောင်းရော ဆွဲပေးလား ?
        </p>
        <p>
          ဧည့်သည်တော်များသွားလိုတဲ့ မြို့ကိုပြောပြပေးရုံနဲ့ မြို့ရဲ့အထင်ကရ
          နေရာတွေ ၊ နာမည်ကြီး နေရာတွေနဲ့ Activities နေရာမျိုးစုံကို
          လမ်းကြောင်းဆွဲပြီး အသေးစိတ် package ထုတ်ပေးပါတယ်။
        </p>
        <p class="font-semibold text-sm text-main">
          ဆွဲထားတဲ့ Car Package တွေရှိလား?
        </p>
        <p>
          သွားချင်တဲ့ မြို့ ၊ နေရာပေါ်မူတည်ပြီး မြို့တိုင်းအတွက် package
          တွေရှိပါတယ်။ Customize package တွေလည်းရေဆွဲပေးပါတယ်။
        </p>
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
