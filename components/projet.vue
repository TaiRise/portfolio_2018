<template>
  <article class="projet__item" :class="{active : active}" :key="title">
    <h2 class="projet__title projet__text"
        :inner-html.prop="title | splitSpan"></h2>
    <p class="projet__meta">
      <span class="projet__meta--date projet__text"
            :inner-html.prop="date | splitSpan">
      </span>
      &nbsp;
      <span class="projet__meta--type projet__text"
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
      style() {
        return {
          transform: `translate3d(-50%,-50%,0) scale(${this.scale})`
        }
      },
      scale() {
        let coeff = ((this.windowHeight - Math.abs(this.offset - this.offsetTop)) / this.windowHeight).toFixed(5)
        return (coeff > .5) ? coeff : .5
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
