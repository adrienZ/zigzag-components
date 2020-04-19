import {
  getQueryStringParams,
  objectToQueryParams
} from '../utils.js'

export default class VimeoHelper {
  // https://developer.vimeo.com/player/sdk/reference
  constructor(urlParams) {
    const {
      host,
      href
    } = urlParams
    this.url = href
    this.originalUrl = href
    this.urlParams = urlParams
    this.queryParams = getQueryStringParams(urlParams.search)

    this.id = urlParams.pathname.split('/').pop()
    this.cacheId = undefined

    // handle youtube page url
    if (host === 'vimeo.com') {
      this.url = this.convertPageLinkToEmbed(urlParams)
    }
  }

  convertPageLinkToEmbed() {
    const {
      host,
      protocol,
      search,
    } = this.urlParams

    return protocol + '//' + 'player.' + host + '/video/' + this.id + search
  }

  addApiQueryParams() {
    const {
      urlParams,
      queryParams
    } = this

    queryParams['api'] = 1
    queryParams['id'] = this.id

    if (urlParams.search) {
      this.url = this.url.replace(urlParams.search, objectToQueryParams(queryParams))
    } else {
      this.url += objectToQueryParams(queryParams)
    }
  }

  bindEvents($player) {
    const events = ['pause', 'play', 'loaded', 'ended', 'volumechange']

    events.forEach( eventName => {
      $player.contentWindow.postMessage({
        method: 'addEventListener',
        value: eventName
      }, 'https://player.vimeo.com');
    })
  }

  onMessage(e) {
    let response = false
    if (e.origin === 'https://player.vimeo.com') {
      let {
        data
      } = e

      // weird flex but ok
      if (!this.cacheId && data.event === "loaded") {
        this.cacheId = data.data.id.toString()
        response = {
          func: 'onReady',
          data,
        }
      }


      if (this.cacheId === this.id) {
        let func

        switch (data.event) {
          case 'play':
            func = 'onPlay'
            break;
          case 'pause':
            func = 'onPause'
            break;
          case 'ended':
            func = 'onStop'
            break;
          case 'volumechange':
            if (data.data.volume === 0) {
              func = 'onMute'
            } else {
              func = 'onUnmute'
            }
            break;
        }

        if (func) {
          response = {
            func,
            data
          }
        }
      }
    }



    return response
  }

}