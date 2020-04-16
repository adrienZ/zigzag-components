<template>
  <div class="player">
    <iframe ref="$player" :data-src="src"></iframe>
    <div class="player-controls">
      <button @click="play">Play</button>
      <button @click="pause">Pause</button>
      <button @click="stop">Stop</button>
    </div>
  </div>
</template>


<script>

import { isUrl, parseUrl, YoutubeHelper, VimeoHelper, DailymotionHelper } from './utils.js'

export default {
  props: ['src'],
  created() {
    this.services = {
      YOUTUBE: 'www.youtube.com',
      VIMEO: 'player.vimeo.com',
      VIMEO_PAGE: 'vimeo.com',
      DAILYMOTION: 'www.dailymotion.com',
    }
  },
  data() {
    return {
      iframeUrl: '',
      urlParams: {}
    }
  },
  updated() {
    this.update()
  },
  mounted() {
    this.update()
  },
  methods: {
    update() {
      this.iframeUrl = this.src

      const validity = isUrl(this.iframeUrl)
      if (!validity) {
        return this.setIframeSrc(this.iframeUrl)
      }

      this.urlParams = parseUrl(this.iframeUrl)
      const { urlParams } = this
      const { host, pathname } = urlParams

      let helper
      switch (host) {
        case this.services.YOUTUBE:
          helper = new YoutubeHelper(urlParams)
          break;
        case this.services.VIMEO:
        case this.services.VIMEO_PAGE:
          helper = new VimeoHelper(urlParams)
          break;
        case this.services.DAILYMOTION:
          helper = new DailymotionHelper(urlParams)
          break;
        default:
          this.setIframeSrc(this.iframeUrl)
      }

      if (helper) {
        helper.addApiQueryParams(urlParams)
        this.iframeUrl = helper.url
        this.setIframeSrc(this.iframeUrl)
      }
    },
    play() {
      const { $player } = this.$refs

      $player.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'playVideo' }), 'https://www.youtube.com')
      $player.contentWindow.postMessage({ method: 'play' }, 'https://player.vimeo.com');
      $player.contentWindow.postMessage('play', 'https://www.dailymotion.com');
    },
    pause() {
      const { $player } = this.$refs

      $player.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'pauseVideo' }), 'https://www.youtube.com')
      $player.contentWindow.postMessage({ method: 'pause' }, 'https://player.vimeo.com');
      $player.contentWindow.postMessage('pause', 'https://www.dailymotion.com');
    },
    stop() {
      const { $player } = this.$refs

      $player.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'stopVideo' }), 'https://www.youtube.com')
      $player.contentWindow.postMessage({ method: 'unload' }, 'https://player.vimeo.com');
      $player.contentWindow.postMessage('pause', 'https://www.dailymotion.com');
      $player.contentWindow.postMessage(JSON.stringify({ command : 'seek', parameters:[0] }), 'https://www.dailymotion.com');
    },
    setIframeSrc(str) {
      this.$refs.$player.src = str
    },
  }
}

</script>
