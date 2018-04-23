<template>
  <main>
    <header class="intro">
      <h1>Tai Le</h1>
      <p>{{ windowHeight }}</p>
    </header>
    <section class="projet__container">
      <Projet
        v-for="{ title, date, type } in projets"
        :key="title"
        :title="title"
        :date="date"
        :type="type"
        :middle="windowHeight"
      />
    </section>
    <footer class="outro">

    </footer>
  </main>
</template>

<script>
  const data = require('~/data')

  let isScrolling

  import Projet from '~/components/projet'

  export default {
    components:{
      Projet
    },
    asyncData() {
      return {
        projets: data
      }
    },
    data() {
      return {
        windowHeight: false
      }
    },
    methods: {
      init() {
        this.windowHeight = window.innerHeight
      },
      handleResize () {
        this.windowHeight = window.innerHeight
      }
    },
    beforeMount () {
      this.init()
      window.addEventListener('resize', this.handleResize)
    },
    beforeDestroy () {
      window.removeEventListener('resize', this.handleResize)
    }
  }
</script>
