<template>
  <div class="line-clamp line-clamp--html" :class="{ ['line-clamp--' + lines]: true }">
    <slot />
  </div>
</template>

<style lang="scss">
%line-clamp-box {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-break: word;
}

.line-clamp {

  @for $i from 1 through 5 {
    &--#{$i} {
      @extend %line-clamp-box;
      -webkit-line-clamp: $i;
    }
  }

}

</style>




<script>
export default {
  props: {
    lines: {
      type: Number,
      default: 2
    }
  },
}
</script>