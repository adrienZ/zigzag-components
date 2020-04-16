export function isUrl(query) {
  const regex = new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi);
  const match = query.match(regex)

  return !!match
}

export function getQueryStringParams(query) {
  return query
    ? (/^[?#]/.test(query) ? query.slice(1) : query)
      .split('&')
      .reduce((params, param) => {
        let [key, value] = param.split('=');
        params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
        return params;
      }, {})
    : {}
}

export function parseUrl(query) {
  const match = query.match(/^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/);
  return match && {
    href: query,
    protocol: match[1],
    host: match[2],
    hostname: match[3],
    port: match[4],
    pathname: match[5],
    search: match[6],
    hash: match[7]
  }
}

export function objectToQueryParams (obj = {}) {
  return '?' + Object.keys(obj).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`).join('&');
}

export class YoutubeHelper {
  constructor(urlParams) {
    const { pathname, href } = urlParams
    this.url = href

    // handle youtube page url
    if (pathname === '/watch') {
      this.url = this.convertPageLinkToEmbed(urlParams)
    }
  }

  convertPageLinkToEmbed(urlParams) {
    const { host, protocol, search } = urlParams

    const videoId = getQueryStringParams(search).v
    return protocol + '//' + host + '/embed/' + videoId + search
  }

  addApiQueryParams(urlParams) {
    const queryParams = getQueryStringParams(urlParams.search)
    // remove youtube video id
    delete queryParams.v
    queryParams['enablejsapi'] = 1

    if (urlParams.search) {
      this.url = this.url.replace(urlParams.search, objectToQueryParams(queryParams))
    } else {
      this.url += objectToQueryParams(queryParams)
    }
  }
}

export class VimeoHelper {
  constructor(urlParams) {
    const { host, href } = urlParams
    this.url = href

    // handle youtube page url
    if (host === 'vimeo.com') {
      this.url = this.convertPageLinkToEmbed(urlParams)
    }
  }

  convertPageLinkToEmbed(urlParams) {
    const { host, protocol, search, pathname } = urlParams

    const videoId = pathname.substring(1)
    return protocol + '//' + 'player.' + host + '/video/' + videoId + search
  }

  addApiQueryParams(urlParams) {}
}

export class DailymotionHelper {
  constructor(urlParams) {
    const { pathname, href } = urlParams
    this.url = href

    console.log(urlParams);

    // handle youtube page url
    if (!pathname.includes('/embed')) {
      this.url = this.convertPageLinkToEmbed(urlParams)
    }
  }

  convertPageLinkToEmbed(urlParams) {
    const { href, pathname } = urlParams
    return href.replace(pathname, '/embed' + pathname)
  }

  addApiQueryParams(urlParams) {
    const queryParams = getQueryStringParams(urlParams.search)
    queryParams['api'] = 'postMessage';

    if (urlParams.search) {
      this.url = this.url.replace(urlParams.search, objectToQueryParams(queryParams))
    } else {
      this.url += objectToQueryParams(queryParams)
    }
  }
}