<template>
  <main>
    <Scrollbar :current="index"
      :total="projets.length"
      :progress="progress"
      :class="{ active: loaded }"/>
    <div id="scroll__container" ref="main">
    <section class="intro" :class="{ active: loaded }">
      <p :inner-html.prop="intro[0] | splitSpan"></p>
      <h1 :inner-html.prop="intro[1] | splitSpan"></h1>
      <p :inner-html.prop="intro[2] | splitSpan"></p>
    </section>
    <section class="projet__container" :class="{ active: loaded }">
      <Projet
        v-for="({ title, date, type, key }, index) in projets"
        :key="key"
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
    </div>
  </main>
</template>

<script>
  // const data = require('~/data')
  import {db} from '~/db'
  import Projet from '~/components/projet'
  import Scrollbar from '~/components/scrollbar'
  import VirtualScroll from 'virtual-scroll'

  export default {
    components: {
      Projet,
      Scrollbar
    },
    data() {
      return {
        intro: [
          'Hello There.',
          'My name is Huu-Tai LE and i\'m a Creative Developer',
          'Working at 148 Agency'
        ],
        windowHeight: false,
        bodyHeight: false,
        offset: false,
        index: 0,
        main: false,
        mainHeight: false,
        scrollY: 0,
        loaded: false
      }
    },
    firebase: {
      projets: {
        source: db.ref(),
        cancelCallback(err) {
          console.error(err);
        },
        readyCallback() {
          setTimeout(() => this.init(), 500)
        }
      }
    },
    computed: {
      progress() {
        return ((this.offset-(this.windowHeight/4))/this.bodyHeight)*100
      }
    },
    watch: {
      scrollY() {
        this.getOffset()
      } 
    },
    methods: {
      init() {
        window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame
        this.main = this.$refs.main
        this.handleResize()
        this.offset = this.windowHeight / 4
        this.vScrollInit()
        this.loaded = true
      },
      vScrollInit() {
        this.vScroll = new VirtualScroll({
          mouseMultiplier: 0.4
        })
        this.vScroll.on((e, context) => {
          this.scrollY += e.deltaY
          this.scrollY = Math.max(-this.bodyHeight, this.scrollY)
          this.scrollY = Math.min(0, this.scrollY)

          requestAnimationFrame(() => {
            this.vScrollUpdate()
          })
        })
      },
      vScrollUpdate() {
        this.main.style.transform = `translate3d(0,${this.scrollY}px,0)`
      },
      setIndex(id){
        this.index = id
      },
      getOffset() {
        this.offset = -this.scrollY + (this.windowHeight / 4)
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
        this.windowHeight = window.innerHeight
        this.bodyHeight = this.main.offsetHeight - this.windowHeight
      }
    },
    beforeMount() {
      window.addEventListener('resize', this.handleResize)
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.handleResize)
      this.vScroll.destroy()
    }
  }
</script>
