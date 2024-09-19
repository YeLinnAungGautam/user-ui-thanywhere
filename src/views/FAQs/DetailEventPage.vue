<template>
  <div class="relative h-[100vh] w-[100vw] overflow-hidden">
    <!-- Image Div -->
    <div class="absolute w-full h-[30vh] bg-blue-400">
      <img
        src="https://via.placeholder.com/800x600"
        alt="Detail Image"
        class="object-cover w-full h-full"
      />
    </div>

    <!-- Content Div -->
    <div
      class="absolute left-0 right-0 bg-background shadow-lg pt-4 rounded-md transition-all duration-500"
      :class="contentPosition"
    >
      <div
        class="mx-auto h-4 bg-black w-[60px]"
        @click="togglePosition"
        @touchstart="togglePosition"
      ></div>
      <div class="overflow-y-scroll" :class="contentdivPosition">
        <h1 class="text-2xl font-bold">Movable Content</h1>
        <p class="py-10">
          This content div can move up and down when the button is clicked.
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo
          numquam ratione repellendus porro eveniet, et praesentium tempora.
          Aperiam rerum molestias accusamus quos fuga reiciendis deserunt sint
          delectus omnis, incidunt ut explicabo provident, excepturi fugiat
          laborum, nam ducimus! Sed voluptatem, repellendus velit corporis
          quaerat obcaecati, fugit iusto ut deleniti provident repellat iste,
          est laborum soluta? At necessitatibus repellat ratione aspernatur
          itaque voluptates nemo pariatur et quos deserunt ipsam laboriosam
          inventore autem sint aut fuga cumque quibusdam minus exercitationem
          quo nisi, eum optio ad molestias? Cumque tenetur culpa tempora sed
          iure, repudiandae corporis veniam suscipit vitae magnam cupiditate
          minus, voluptate praesentium officia fuga. Sunt voluptatem quos
          assumenda eveniet dignissimos quod laudantium rem temporibus
          consequatur a laborum distinctio corrupti incidunt aliquid fugiat
          provident recusandae fuga omnis quidem ipsum quo vero, dolores labore.
          Maxime ipsa expedita ratione minus sunt repudiandae nesciunt officia
          vitae harum, sequi aspernatur consectetur rerum repellendus odit
          assumenda accusamus enim adipisci atque aperiam! Blanditiis quam ullam
          accusamus pariatur soluta illum sint perspiciatis aliquam perferendis.
          Voluptates expedita aliquid sequi numquam, harum odit maiores
          doloremque? Sint, facilis distinctio aliquam cupiditate laudantium
          pariatur sed fuga voluptatibus optio nam soluta expedita eum in iure
          beatae velit veniam quod, labore aspernatur ducimus. Praesentium nisi,
          aliquid aut voluptas laudantium quos quia, ipsum molestiae at amet
          aliquam, nihil recusandae iure sit dignissimos earum libero
          repudiandae omnis hic vero officiis sed. In dolor exercitationem
          facere, amet est error aliquam tempora sint ipsam expedita, laborum
          dicta praesentium quibusdam. Quibusdam, unde consequuntur dolore
          excepturi ipsum repellat possimus vel alias obcaecati ut repudiandae
          delectus laboriosam iure voluptate quas soluta ullam. Ab at ut culpa
          officia dolores error. Debitis facere veritatis, repudiandae, sint
          natus ea facilis neque, quo exercitationem hic consequuntur laborum
          quisquam minus culpa ab eos sunt. Iste at, fugiat nam qui consequatur
          temporibus quae natus minima corporis, illum animi voluptate est.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// State to track the position of the content div
const isAtTop = ref(false);

// Compute the class based on the position
const contentPosition = computed(() => {
  return isAtTop.value ? "top-0" : "top-[376px]";
});
const contentdivPosition = computed(() => {
  return isAtTop.value ? "h-[95vh]" : "h-[60vh]";
});

// Function to toggle the position of the content div
const togglePosition = () => {
  isAtTop.value = !isAtTop.value;
};
</script>

<style scoped>
/* Optional additional styling */
body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
}
</style>
