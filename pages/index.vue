<template>
  <main>
    <Scrollbar :current="index"
      :total="projets.length"
      :progress="progress"/>
    <section class="intro">
      <h1>Tai Le</h1>
      <p>{{ windowHeight }}</p>
    </section>
    <section class="projet__container">
      <Projet
        v-for="({ title, date, type }, index) in projets"
        :key="title"
        :index="index + 1"
        :title="title"
        :date="date"
        :type="type"
        :offset="offset"
        :windowHeight="windowHeight"
        @id="setIndex"
      />
    </section>
    <section class="outro">

    </section>
  </main>
</template>

<script>
  const data = require('~/data')

  import Projet from '~/components/projet'
  import Scrollbar from '~/components/scrollbar'

  export default {
    components: {
      Projet,
      Scrollbar
    },
    asyncData() {
      return {
        projets: data
      }
    },
    data() {
      return {
        windowHeight: false,
        bodyHeight: false,
        offset: false,
        index: 0
      }
    },
    computed: {
      progress() {
        return ((this.offset-(this.windowHeight/4))/this.bodyHeight)*100
      }
    },
    methods: {
      init() {
        this.windowHeight = window.innerHeight
        this.bodyHeight = document.body.offsetHeight - this.windowHeight
        this.getOffset()
      },
      setIndex(id){
        this.index = id
      },
      getOffset() {
        let doc = document.documentElement,
          pageOffsetTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0)

        this.offset = pageOffsetTop + (this.windowHeight / 4)
      },
      goTo() {
        console.log('End ' + this.offsetTop)
        let vm = this,
          options = {
            container: 'body',
            easing: [0.45, 0.05, 0.55, 0.95],
            offsetTop: -parseInt(this.offset / 4),
            cancelable: true,
            onStart(element) {
              vm.autoScroll = false
            },
            onDone(element) {
              setTimeout(() => {
                vm.autoScroll = true
                vm.active = true
              }, 150)

            },
            onCancel() {
              setTimeout(() => vm.autoScroll = true, 150)
            },
            x: false,
            y: true
          }

        cancelScroll = this.$scrollTo(this.$el, 500, options)
      },
      handleResize() {
        this.init()
      },
      handleScroll() {
        this.getOffset()
      }
    },
    beforeMount() {
      this.init()
      window.addEventListener('scroll', this.handleScroll)
      window.addEventListener('resize', this.handleResize)
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.handleScroll)
      window.removeEventListener('resize', this.handleResize)
    }
  }
</script>
