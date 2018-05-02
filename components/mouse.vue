<template>
  <div id="mouse" :style="style">
  </div>
</template>

<script>
export default {
  name: "Mouse",
  props: {
    x: {
      type: [Number, Boolean],
      required: true
    },
    y: {
      type: [Number, Boolean],
      required: true
    }
  },
  data() {
    return {
      style: false
    }
  },
  computed: {
    transform() {
      return `translate3d(${this.x}px,${this.y}px,0)`
    }
  },
  watch: {
    transform(val) {
      setTimeout(() => this.style = { transform: val }, 100)
    }
  }
}
</script>
