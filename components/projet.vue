<template>
  <article class="projet__item" :class="{ active: active }" :key="title">
    <div class="projet__wrapper" :style="{height: height + 'px'}" ref="wrapper">
      <div class="projet__text--up" ref="txtUp">
        <h2 class="projet__title projet__text projet__text--left" :inner-html.prop="title | splitSpan"></h2>
      </div>
      <div class="projet__text--down" ref="txtDown">
        <p class="projet__meta">
          <span class="projet__meta--date projet__text projet__text--right" :inner-html.prop="date | splitSpan"></span>
          <span class="projet__meta--type projet__text projet__text--right" :inner-html.prop="type | splitSpan"></span>
        </p>
      </div>
      <div class="projet__wrapper--overflow">
        <img class="projet__image"
             src="~/assets/test.jpg"
             :alt="title"
              ref="image">
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
        height: false,
        autoScroll: true,
        wrapper: false,
        image: false,
        txtUp: false,
        txtDown: false
      }
    },
    watch: {
      active(val) {
        if (val) this.$emit('id', this.index)
      },
      offset(val) {
        window.requestAnimationFrame(() => {
          this.animation()
        })
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
      init() {
        this.offsetTop = this.$el.offsetTop
        this.height = this.$el.offsetWidth * 9/16
      },
      handleResize() {
        this.init()
        this.animation()
      },
      animation() {
        let coeff = ((this.windowHeight - Math.abs(this.offset - this.offsetTop)) / this.windowHeight).toFixed(10),
        scaleWrapper = (coeff > .5) ? coeff : .5,
        scaleImg = 3 - scaleWrapper*2,
        opacity = ((coeff * 1.25) > 1) ? 1 : (coeff * 1.25),
        translate = coeff * 200 - 100

        this.wrapper.style.transform = `translate3d(-50%,-50%,0) scale(${scaleWrapper})`   
        this.image.style.transform = `scale(${scaleImg})`
        this.image.style.opacity = opacity
        this.txtUp.style.transform = `translate3d(0,-${translate}%,0)`
        this.txtDown.style.transform = `translate3d(0,${translate}%,0)`

        this.active = (scaleWrapper > 0.75) ? true : false
      }
    },
    beforeMount() {
      window.addEventListener('resize', this.handleResize)
    },
    mounted() {
      this.init()
      window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame
      this.wrapper = this.$refs.wrapper
      this.image = this.$refs.image
      this.txtUp = this.$refs.txtUp
      this.txtDown = this.$refs.txtDown
      this.animation()
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.handleResize)

    }
  }
</script>
