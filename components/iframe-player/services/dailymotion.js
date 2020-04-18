import {
  getQueryStringParams,
  objectToQueryParams
} from '../utils.js'

export default class DailymotionHelper {
  constructor(urlParams) {
    const {
      pathname,
      href
    } = urlParams
    this.url = href
    this.urlParams = urlParams
    this.queryParams = getQueryStringParams(urlParams.search)

    this.id = this.url

    // handle youtube page url
    if (!pathname.includes('/embed')) {
      this.url = this.convertPageLinkToEmbed(urlParams)
    }
  }

  convertPageLinkToEmbed() {
    const {
      href,
      pathname
    } = this.urlParams
    return href.replace(pathname, '/embed' + pathname)
  }

  addApiQueryParams() {
    const {
      urlParams,
      queryParams
    } = this

    this.id = urlParams.pathname.split('/').pop();

    queryParams['api'] = 'postMessage';
    queryParams['id'] = this.id

    if (urlParams.search) {
      this.url = this.url.replace(urlParams.search, objectToQueryParams(queryParams))
    } else {
      this.url += objectToQueryParams(queryParams)
    }
  }

  bindEvents($player) {}

  onMessage(e) {
    const data = getQueryStringParams(e.data)
    let response = false

    if (data.id === this.id) {
      switch (data.event) {
        case 'playback_ready':
          response = {
            func: 'onReady',
            data
          }
          break;
        case 'playing':
          response = {
            func: 'onPlay',
            data
          }
          break;
        case 'pause':
          response = {
            func: 'onPause',
            data
          }
          break;
        case 'end':
          response = {
            func: 'onStop',
            data
          }
          break;
      }
    }

    return response
  }
}