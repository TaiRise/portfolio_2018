<template>
  <article class="projet__item" :class="{active : active}" :key="title">
    <div class="projet__wrapper"
         :style="styleWrapper">
      <div class="projet__text--up" :style="styleTextUp">
        <h2 class="projet__title projet__text projet__text--left" :inner-html.prop="title | splitSpan"></h2>
      </div>
      <div class="projet__text--down" :style="styleTextDown">
        <p class="projet__meta">
          <span class="projet__meta--date projet__text projet__text--right" :inner-html.prop="date | splitSpan"></span>
          <span class="projet__meta--type projet__text projet__text--right" :inner-html.prop="type | splitSpan"></span>
        </p>
      </div>
      <div class="projet__wrapper--overflow">
        <img class="projet__image"
             src="~/assets/test.jpg"
             :alt="title"
              :style="styleImg">
      </div>
    </div>
  </article>
</template>

<script>
  export default {
    name: 'Projet',
    props: {
      title: {
        type: String,
        required: true
      },
      date: {
        type: Number,
        required: true
      },
      index: {
        type: Number,
        required: true
      },
      type: {
        type: String,
        required: true
      },
      offset: {
        type: [Number, Boolean],
        required: true
      },
      windowHeight: {
        type: [Number, Boolean],
        required: true
      },
    },
    data() {
      return {
        active: false,
        offsetTop: false,
        autoScroll: true
      }
    },
    computed: {
      styleWrapper() {
        return {
          transform: `scale(${this.scale})`
        }
      },
      styleImg() {
        let scale = 2 - this.scale
        return {
          transform: `scale(${scale})`,
          opacity: this.opacity
        }
      },
      styleTextUp() {
        return {
          transform: `translate3d(0,-${this.translate}%,0)`
        }
      },
      styleTextDown() {
        return {
          transform: `translate3d(0,${this.translate}%,0)`
        }
      },
      coeff() {
        let coeff = ((this.windowHeight - Math.abs(this.offset - this.offsetTop)) / this.windowHeight).toFixed(10)
        return Number(coeff)
      },
      scale() {
        return (this.coeff > .5) ? this.coeff : .5
      },
      opacity() {
        let opacity = this.coeff * 1.25
        return (opacity > 1) ? 1 : opacity
      },
      translate() {
        let translate = this.coeff * 200 - 100
        return translate
      }
    },
    watch: {
      scale(val) {
        this.active = (val > 0.75) ? true : false
      },
      active(val) {
        if (val) this.$emit('id', this.index)
      }
    },
    filters: {
      splitSpan(value) {
        let res = ''
        value = value.toString()
        for (let i of value) res += i === ' ' ? i : `<span>${i}</span>`

        return res
      }
    },
    methods: {
      getOffset() {
        this.offsetTop = this.$el.offsetTop
      },
      handleScroll() {
        let doc = document.documentElement,
          pageOffsetTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0),
          pageOffsetMiddle = pageOffsetTop + (this.offset / 4)

        this.active = false
        this.getStyle(pageOffsetMiddle)
        if (this.scale > 0.75 && pageOffsetTop > (this.offset / 4)) {
          window.clearTimeout(isScrolling)
          isScrolling = setTimeout(() => {
            if (this.autoScroll) this.goTo()
          }, 100)
        }
      },
      handleResize() {
        this.getOffset()
      }
    },
    beforeMount() {
      window.addEventListener('resize', this.handleResize)
    },
    mounted() {
      this.getOffset()
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.handleResize)

    }
  }
</script>
