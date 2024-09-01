<template>
  <div>
    <div
      class="px-4 py-2 bg-main flex justify-start items-center gap-3"
      @click="routerGoBack"
    >
      <ChevronLeftIcon class="w-6 h-6 text-main bg-white rounded-full" />
      <span class="text-xs font-medium text-white"
        >go back to van tour detail</span
      >
    </div>
    <div class="text-black px-4 pt-5 pb-10">
      <h1 class="font-semibold border-l-4 mb-4 border-main pl-3">
        How do I make a payment?
      </h1>
      <p class="text-xs">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime harum
        saepe odio animi cupiditate officia voluptates ipsam repellendus
        quisquam esse officiis, a labore accusamus consequuntur exercitationem,
        ipsa doloremque dignissimos, dolorem fugiat eius voluptatum nam
        consequatur asperiores. Placeat, reiciendis consequatur quia aut quis
        aliquid, eaque beatae illo provident tempore asperiores. Obcaecati
        perspiciatis natus autem, mollitia et vero in ipsam minima possimus
        corrupti ea. Delectus deleniti voluptatibus architecto possimus vel
        nulla asperiores labore iusto earum, voluptates culpa quam vitae ullam,
        repellendus totam sequi laudantium praesentium et fugiat quidem. Quis,
        amet quae. Corrupti temporibus libero eos optio? Consequatur iste
        numquam molestiae itaque vitae nobis. Nostrum vero fugit mollitia totam
        eum omnis voluptate neque, aliquid dolorum consectetur odio similique.
        Possimus vitae fugit nulla, placeat aliquid, esse dicta est, error
        tempora ipsum deserunt deleniti excepturi! A totam illum magnam nemo
        voluptate, neque quaerat eligendi quae excepturi porro ad non, mollitia,
        obcaecati alias aspernatur placeat asperiores earum accusamus
        praesentium. Facilis error nemo neque, commodi, maxime rem distinctio
        accusamus nobis necessitatibus beatae quasi eum esse nam aperiam
        voluptate reiciendis, at ipsa ullam nostrum nihil placeat quas vitae
        nulla dolore. Architecto voluptate porro at perspiciatis quam omnis
        voluptatibus alias in atque pariatur ipsum tenetur, quis impedit est
        nobis earum asperiores expedita dolores officia enim. Sunt, alias ea
        quod distinctio architecto fugiat corporis consectetur tenetur cumque
        eaque ad dolores mollitia numquam delectus labore optio fuga dolor
        possimus maxime corrupti hic necessitatibus accusantium! Dolore quod
        aperiam tenetur incidunt, inventore perferendis impedit. Repellat cumque
        dolores obcaecati iusto! Ipsum optio sunt iusto ab commodi laborum
        repudiandae cupiditate reiciendis, nihil ducimus voluptatibus eos
        laudantium quo. Quos minus sed reprehenderit praesentium eos labore
        corrupti deserunt veritatis explicabo fugiat voluptatibus, aspernatur
        ullam doloribus omnis, temporibus vel sit nihil rem commodi cupiditate
        aperiam error hic quam. Commodi numquam consequatur eaque dolor,
        excepturi amet! Deleniti, odit aliquid!
      </p>
    </div>
  </div>
</template>

<script setup>
import { ChevronLeftIcon } from "@heroicons/vue/24/outline";
import { useRouter } from "vue-router";

const router = useRouter();

const routerGoBack = () => {
  router.back();

  // Add a delay to ensure navigation happens before modifying the URL
  setTimeout(() => {
    const currentPath = window.location.pathname; // Get current path after back
    const updatedPath = `${currentPath}#faqs`; // Append #faqs to the path

    // Check if the hash is already added to prevent duplication
    if (!window.location.hash.includes("#faqs")) {
      window.location.replace(updatedPath); // Update the URL with the hash
    }
  }, 100); // Delay for navigation to complete
};
</script>
