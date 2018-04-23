<template>
  <article class="projet__item" :class="{active : active}" :key="title">
    <h2 class="projet__title"
        :inner-html.prop="title | splitSpan"></h2>
    <p class="projet__meta">
      <span class="projet__meta--date"
            :inner-html.prop="date | splitSpan">
      </span>
      &nbsp;
      <span class="projet__meta--type"
            :inner-html.prop="type | splitSpan">
      </span>
    </p>
    <img class="projet__image"
         src="~/assets/test.jpg"
         :alt="title"
         :style="style">
  </article>
</template>

<script>
  let isScrolling, cancelScroll

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
        active: false,
        offset: false,
        scale: false,
        autoScroll: true
      }
    },
    computed: {
      style() {
        return {
          transform: `translate3d(-50%,-50%,0) scale(${this.scale})`
        }
      }
    },
    filters: {
      splitSpan(value){
        let res = ''
        value = value.toString()
        for (let i of value){
          res += `<span>${i}</span>`
        }

        return res
      }
    },
    methods: {
      getOffsetMiddle() {
        this.offset = this.$el.offsetTop
      },
      getStyle(pageOffsetMiddle) {
        let coeff = ((this.middle - Math.abs(this.offset - pageOffsetMiddle)) / this.middle).toFixed(2)
        this.scale = (coeff > .5) ? coeff : .5
      },
      goTo() {
        console.log('End ' + this.offset)
        let vm = this,
          options = {
            container: 'body',
            easing: [0.45, 0.05, 0.55, 0.95],
            offset: -parseInt(this.middle / 4),
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
      handleScroll() {
        let doc = document.documentElement,
          pageOffsetTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0),
          pageOffsetMiddle = pageOffsetTop + (this.middle / 4)

        this.active = false
        this.getStyle(pageOffsetMiddle)
        if (this.scale > 0.75 && pageOffsetTop > (this.middle / 4)) {
          window.clearTimeout(isScrolling)
          isScrolling = setTimeout(() => {
            if (this.autoScroll) this.goTo()
          }, 100)
        }
      },
      handleResize() {
        this.getOffsetMiddle()
      }
    },
    beforeMount() {
      this.getOffsetMiddle()
      this.getStyle()
      window.addEventListener('scroll', this.handleScroll)
      window.addEventListener('resize', this.handleResize)
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.handleScroll)
      window.removeEventListener('resize', this.handleResize)

    }
  }
</script>
