<template>
  <article class="projet__item" :class="{ active: scale > 0.75 }" :key="title">
    <h2 class="projet__title">{{ title }}</h2>
    <p class="projet__meta">
      <span class="projet__meta--date">{{ date }}</span>&nbsp;
      <span class="projet__meta--type">{{ type }}</span>
    </p>
    <img class="projet__image" src="~/assets/test.jpg" :alt="title"
         :style="{ transform: `translate3d(-50%,-50%,0) scale(${scale})` }">
    {{ scale }}
  </article>
</template>

<script>
  let isScrolling

  export default {
    name: 'projet',
    props: {
      title: {
        type: String,
        required: true
      },
      date: {
        type: Number,
        required: true
      },
      type: {
        type: String,
        required: true
      },
      middle: {
        type: [Number, Boolean],
        required: true
      },
    },
    data() {
      return {
        offsetMiddle: false,
        scale: false
      }
    },
    methods: {
      getOffsetMiddle() {
        let height = this.$el.clientHeight,
          top = this.$el.offsetTop
        this.offsetMiddle = top + (height / 2)
      },
      getScale() {
        let doc = document.documentElement,
          pageOffsetTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0),
          pageOffsetMiddle = pageOffsetTop + (this.middle / 2),
          scale = ((this.middle - Math.abs(this.offsetMiddle - pageOffsetMiddle)) / this.middle).toFixed(2)
        this.scale = (scale > .5) ? scale : .5
      },
      goTo() {
        console.log('End ' + this.offsetMiddle)
        let options = {
          container: 'body',
          easing: [0.45, 0.05, 0.55, 0.95],
          offset: -parseInt(this.middle / 4),
          cancelable: true,
          onStart (element) {
            // scrolling started
          },
          onDone (element) {
            // scrolling is done
          },
          onCancel () {
            // scrolling has been interrupted
          },
          x: false,
          y: true
        }

        let cancelScroll = this.$scrollTo(this.$el, 1000, options)
      },
      handleScroll() {
        this.getScale()
        if (this.scale > 0.75) {
          window.clearTimeout(isScrolling)
          isScrolling = setTimeout(() => {
            this.goTo()
          }, 100)
        }
      },
      handleResize() {
        this.getOffsetMiddle()
      }
    },
    beforeMount() {
      this.getOffsetMiddle()
      this.getScale()
      window.addEventListener('scroll', this.handleScroll)
      window.addEventListener('resize', this.handleResize)
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.handleScroll)
      window.removeEventListener('resize', this.handleResize)

    }
  }
</script>
