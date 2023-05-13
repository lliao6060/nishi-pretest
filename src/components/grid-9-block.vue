<script setup>
const props = defineProps({
  animationType: {
    type: Number,
    default: 1
  },
})
</script>

<template>
  <div class="grid-9-block">
    <div class="box-wrapper wrapper-1 animation-1">
      <div
        v-for="boxItem in 9"
        class="box"
      ></div>
    </div>

    <div
      class="box-wrapper wrapper-2"
      :class="`animation-${animationType}`"
    >
      <div
        v-for="boxItem in 9"
        class="box-with-ball"
      >
        <div class="ball">ooo</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

* {
  box-sizing: border-box;
}



@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.align-center {
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(-50%, -50%);
}

@keyframes shine {
  50% {
    opacity: 60%;
  }
}

@keyframes ballGroupMove {
  50% {
    transform: translateX(500px);
  }
}


@keyframes ballGroupCorner {
  50% {
    max-width: 0px;
    max-height: 0;
  }
}

@keyframes ballBoxCorner {
  50% {
    max-height: 0;
  }
}


.grid-9-block {
  position: relative;
  max-width: 600px;
  .box-wrapper {
    max-width: 100%;
    position: relative;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    .box,
    .box-with-ball {
      width: 33.333334%;
      max-width: 200px;
      height: 100px;
    }

    .box {
      width: 100%;
      border: black solid 2px;
      background: radial-gradient(circle, rgba(113,81,95,1) 81%, rgba(0,0,0,1) 100%);
      &:nth-child(3),
      &:nth-child(5),
      &:nth-child(9) {
        animation: shine 3s infinite;
      }
    }

    &.wrapper-2 {
      width: 100%;
      height: 100%;
      position: absolute;
      bottom: 0;
      right: 0;
      z-index: 0;
      .box-with-ball {
        width: 100%;
        position: relative;
        .ball {
          display: none;
        }
        &:nth-child(3),
        &:nth-child(5),
        &:nth-child(9) {
          background: transparent;
        }

        &:nth-child(1),
        &:nth-child(3),
        &:nth-child(7),
        &:nth-child(9) {
          @include flex-center;
          .ball {
            display: block;
            width: 30px;
            height: 30px;
            background-color: #A5F12B;
            border-radius: 100%;
            font-size: 0.6rem;
            z-index: 999;
            @include flex-center;
          }
        }
      }

      &.animation-1 {
        .box-with-ball {
          .ball {
            animation: ballGroupMove 8s infinite;
          }
        }
      }

      &.animation-2 {
        max-height: 320px;
        animation: ballGroupCorner 8s infinite;
        .box-with-ball {
          width: 100%;
          height: 100%;
          .ball {
            position: absolute;
            gap: 0;
          }
        }
      }
    }
    &.wrapper-1 {
      gap: 10px;
    }
  }
}
</style>