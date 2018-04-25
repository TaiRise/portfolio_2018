<template>
  <div class="scrollbar">
    <p class="scrollbar__current">{{ current }}</p>
    <div class="scrollbar__container">
      <span class="scrollbar__progress" :style="{ transform: `translate3d(${progress}%,0,0)` }"></span>
    </div>
    <p class="scrollbar__total">{{ total }}</p>
  </div>
</template>

<script>
  export default {
    name: "Scrollbar",
    props: {
      current: {
        type: Number,
        required: true
      },
      total: {
        type: Number,
        required: true
      },
      progress: {
        type: Number,
        required: true
      }
    }
  }
</script>
