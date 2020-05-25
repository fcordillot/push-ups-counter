<template >
  <video class="puc-video-loop" playsinline autoplay loop muted preload="auto">
    <source v-if=" 'webm' in video.src " :src="video.src.webm" type="video/webm; codecs=vp9,vorbis">

    <source v-if=" 'mp4' in video.src " :src="video.src.mp4" type="video/mp4">
  </video>
</template>

<script>
  export default {
    name: 'PUCVideoLoop',

    props: {
      video: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .puc-video-loop {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);

    width: 100%;
    height: auto;
    // force rendering for edge / ie11
    min-width: 1px;
    min-height: 1px;
  }
</style>
