import {
  getQueryStringParams,
  objectToQueryParams
} from '../utils.js'

export default class YoutubeHelper {
  // https://developers.google.com/youtube/iframe_api_reference
  constructor(urlParams) {
    const {
      pathname,
      href,
      search,
    } = urlParams

    this.url = href
    this.urlParams = urlParams
    this.queryParams = getQueryStringParams(search)
    this.id = this.url

    // handle youtube page url
    if (pathname === '/watch') {
      this.url = this.convertPageLinkToEmbed()
    }
  }

  convertPageLinkToEmbed() {
    const {
      host,
      protocol,
      search
    } = this.urlParams

    const videoId = getQueryStringParams(search).v
    return protocol + '//' + host + '/embed/' + videoId + search
  }

  addApiQueryParams() {
    const {
      urlParams,
      queryParams
    } = this

    // remove youtube video id
    delete queryParams.v
    queryParams['enablejsapi'] = 1

    if (urlParams.search) {
      this.url = this.url.replace(urlParams.search, objectToQueryParams(queryParams))
    } else {
      this.url += objectToQueryParams(queryParams)
    }
  }


  bindEvents($player) {
    const events = ['onReady', 'onStateChange']

    $player.contentWindow.postMessage(JSON.stringify({
      event: 'listening',
      id: this.id,
      channel: 'widget'
    }), 'https://www.youtube.com')


    events.forEach( eventName => {
      $player.contentWindow.postMessage(JSON.stringify({
        event: "command",
        func: "addEventListener",
        args: [eventName],
        id: this.id,
        channel: "widget"
      }), 'https://www.youtube.com')
    })



  }

  onMessage(e) {
    let response = false

    if (e.origin === 'https://www.youtube.com') {
      const data = JSON.parse(e.data)
      const {
        event,
        id
      } = data



      if (data && event === 'onReady' && id === this.id) {
        response = {
          func: 'onReady',
          data
        }
      }

      if (data && event === 'onStateChange' && id === this.id) {
        switch (data.info) {
          case 0:
          case 5:
            response = {
              func: 'onStop',
              data
            }
            break;
          case 1:
            response = {
              func: 'onPlay',
              data
            }
            break;
          case 2:
            response = {
              func: 'onPause',
              data
            }
            break;
        }
      }
    }

    return response
  }
}