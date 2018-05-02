<template>
  <div>
    <Mouse :x="mouseX" :y="mouseY" v-show="mouseX && mouseY"/>
    <nuxt/>
  </div>
</template>

<script>
  import Mouse from '~/components/mouse'

  export default {
    components: {
      Mouse
    },
    data() {
      return{
        mouseX: false,
        mouseY: false
      }
    },
    methods: {
      mousemove(e) {
        this.mouseX = e.clientX
        this.mouseY = e.clientY
      },
      mouseleave() {
        this.mouseX = false
        this.mouseY = false
      }
    },
    beforeMount() {
      window.addEventListener('mousemove', this.mousemove)
      document.addEventListener('mouseleave', this.mouseleave)
    },
    beforeDestroy() {
      window.removeEventListener('mousemove', this.mousemove)
      document.removeEventListener('mouseleave', this.mouseleave)      
    }
  }
</script>
