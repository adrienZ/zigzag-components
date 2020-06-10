<template>
  <div class="c-popup" :data-id="id" :id="'c-popup-' + id">

    <!-- SCROLLABLE VIEWPORT -->
    <div class="c-popup__viewport u-transition u-overflow-auto" tabindex="-1" style="transition: 0.2s">

      <!-- CONTAINER -->
      <div class="c-popup__container container-fluid u-full-height u-relative">

        <!-- DECORATIVE OVERLAY -->
        <div class="c-popup__overlay js-overlay js-popup-close u-wrapper-panel"></div>

        <!-- MAIN -->
        <div class="c-popup__box u-wrapper-panel">
          <div class="c-popup__inner u-full-width u-transition" style="transition: 0.5s 0.1s">
            <!-- CHILDREN COMPONENT -->
            <slot />
            <!-- END CHILDREN COMPONENT -->
          </div>
        </div>
        <!-- END MAIN -->

      </div>
      <!-- END OF CONTAINER -->

    </div>
    <!-- END SCROLLABLE VIEWPORT -->

  </div>
</template>


<script>
export default {
  created() {
    // bind events because we dont use Vue for them
    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
    this.stay = this.stay.bind(this)
  },
  props: {
    // the id will be useful to bind open trigger
    id: {
      type: String,
    }
  },
  data() {
    return {
      isOpen: false,
    }
  },
  mounted() {
    // custom events bidings
    this.bindEvents()
  },
  methods: {
    bindEvents() {
      // allow events and prevent close on events zone
      this.$eventsZone = this.$el.querySelector('.js-popup-events')

      if (this.$eventsZone) {
        this.$eventsZone.addEventListener('click', this.stay)
      } else {
        console.warn(
          'the following popup',
          this.$el,
          'have no interactive children.\nAdd the class: ".js-popup-events"');
      }


      // handle external open trigger
      const $trigger = document.querySelector('.js-popup-opener[data-popup="'+ this.id + '"]');
      $trigger && $trigger.addEventListener('click', this.open),

      // close trigger and default self close
      this.$el.addEventListener('click', this.close)
      this.$close = document.querySelectorAll('.js-popup-close')
      this.$close.forEach( el => {
        el.addEventListener('click', this.close)
      })
    },
    open(e) {
      e.preventDefault()
      this.$el.classList.add('c-popup--open')
      this.isOpen = true

      /*
       * enable focus,
       * tab index + visibility: visible,
       * focus, and reset tabindex to default
       */
      this.$eventsZone.tabIndex = "-1";
      this.$eventsZone.focus();
      this.$eventsZone.tabIndex = "0";

    },
    close(e) {
      e.preventDefault()
      this.$el.classList.remove('c-popup--open')
      this.isOpen = false
    },
    stay(e) {
      e.stopPropagation()
    }
  }
}
</script>


<style lang="scss" scoped>

.c-popup {
  position: relative;

  .js-popup-events {
    // accesibility: visibility to enable :focus
    visibility: visible;
  }
}

.c-popup__viewport {
  // represent viewport scroll area
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;

  // make it scrollable
  overflow: auto;


  // initial state
  opacity: 0;
  pointer-events: none;
  visibility: hidden;


  .c-popup--open & {
    opacity: 1;
    pointer-events: auto;
    visibility: visible;
  }
}

.c-popup__container {
  // width container
  height: 100%;
  position: relative;
  width: 80%;
  margin: auto;
}

.c-popup__overlay {
  position: fixed;

  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  z-index: 1;

  // allow scroll
  pointer-events: none;

  background-color: rgba(black, 0.5);
}

.c-popup__box {
  // content on top of the overlay
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
}

.c-popup__inner {
  // vertical center of the actual content
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  transform: translate3d(-50%, -50%, 0);

  // allow margin top of children
  // despite the transform

  max-height: 100%;
  // initial state
  opacity: 0;

  .c-popup--open & {
    opacity: 1;
  }
}
</style>