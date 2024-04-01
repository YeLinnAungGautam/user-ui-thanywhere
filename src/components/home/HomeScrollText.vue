<template>
  <div class="scroll-container" ref="container">
    <div
      class="scrolling-text text-main text-xs"
      :style="{ animationDuration: duration + 's' }"
    >
      {{ text }}
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const text = ref(
  "မင်္ဂလာပါ။ 🙏 Thailand Anywhere ​၏ product ပေါင်း ၂၀၀ကျော်ကို ဤ Website မှာ ကြည့်ရှုနိုင်ပါတယ် ရှင့်။ 😍Update ဈေးများကို သိရန်တွက် Facebook Messenger မှ Sale Assistants များကိုဆက်သွယ်မေးမြန်းရန် မေတ္တာရပ်ခံပါတယ်။ 🥰🙏"
);
const duration = ref(10); // Adjust the duration according to the length of text and desired speed

onMounted(() => {
  // Adjust duration dynamically based on text length and container width
  const containerWidth = container.value.offsetWidth;
  const textWidth = text.value.length * 10; // Approximate texwidth, adjust as needed
  const pixelsPerSecond = 50; // Adjust speed here
  const calculatedDuration = (textWidth + containerWidth) / pixelsPerSecond;
  duration.value = calculatedDuration > 0 ? calculatedDuration : 10;
});

const container = ref(null);
</script>

<style>
.scroll-container {
  width: 100%;
  overflow: hidden;
}

.scrolling-text {
  white-space: nowrap;
  animation: scrollLeftRight linear infinite;
}

@keyframes scrollLeftRight {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>
