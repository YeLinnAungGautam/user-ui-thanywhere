<template>
  <div>
    <div class="grid grid-cols-3 gap-2" v-for="d in data" :key="d">
      <img :src="d.image" alt="" />
      <div class="py-2 col-span-2">
        <p class="text-sm pb-2 font-medium text-main">{{ d.title }}</p>
        <p class="text-sm font-normal">{{ d.location }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import image1 from "@/assets/icons/Website Related Photos/Trust (2).png";
import image2 from "@/assets/icons/Website Related Photos/Trust.png";
import image3 from "@/assets/icons/Website Related Photos/Background item.png";

const data = [
  {
    id: 1,
    image: image1,
    title: "Bangkok Office",
    location: `-The Palladium
  Shopping Mall, 4th Floor , Zone B, Room: IT-95, 555 Ratchaprarop Rd.,
  Makkasan, Ratchathewi, Bangkok, Thailand 10400.`,
    location_mm: `-The Palladium
  Shopping Mall, 4th Floor , Zone B, Room: IT-95, 555 Ratchaprarop Rd.,
  Makkasan, Ratchathewi, Bangkok, Thailand 10400.`,
  },
  {
    id: 2,
    image: image2,
    title: "Yangon Office",
    location: `No. 39, Room 101
  (Ground Floor), United Condo, Flag Buddha Road, Dagon Township,
  Yangon.`,
    location_mm: `- အမှတ်-၃၉၊ အခန်း
  (၁၀၁-မြေညီ)၊ United Condo၊ အလံပြဘုရာလမ်း၊ ဒဂုံမြို့နယ်၊ ရန်ကုန်မြို့။`,
  },
  {
    id: 3,
    image: image3,
    title: "Mandalay Office",
    location: ` No. 74, 84th
  Street, Between 28th and 29th Street, Chan Aye Thar Zan Township,
  Mandalay.`,
    location_mm: ` No. 74, 84th
  Street, Between 28th and 29th Street, Chan Aye Thar Zan Township,
  Mandalay.`,
  },
];
</script>
