import linkifyIt from 'linkify-it'
import tlds from 'tlds'

const linkify = linkifyIt()
linkify.tlds(tlds)

export const extractHostname = (url) => {
  let hostname
  // find & remove protocol (http, ftp, etc.) and get hostname

  if (url.indexOf('://') > -1) {
    hostname = url.split('/')[2]
  } else {
    hostname = url.split('/')[0]
  }

  // find & remove port number
  hostname = hostname.split(':')[0]
  // find & remove '?'
  hostname = hostname.split('?')[0]

  return hostname
}

export const extractRootDomain = (url) => {
  let domain = extractHostname(url)
  const splitArr = domain.split('.')
  const arrLen = splitArr.length

  // extracting the root domain here
  // if there is a subdomain
  if (arrLen > 2) {
    domain = splitArr[arrLen - 2] + '.' + splitArr[arrLen - 1]
    // check to see if it's using a Country Code Top Level Domain (ccTLD) (i.e. '.me.uk')
    if (splitArr[arrLen - 1].length === 2 && splitArr[arrLen - 1].length === 2) {
      // this is using a ccTLD
      domain = splitArr[arrLen - 3] + '.' + domain
    }
  }
  return domain
}

export const getQueryParam = (searchStr, param) => {
  const match = RegExp('[?&]' + param + '=([^&]*)').exec(searchStr)
  if (match) {
    const uri = match[1].replace(/\+/g, ' ')
    if (uri) {
      let url = ''
      try {
        url = decodeURIComponent(uri)
      } catch (err) {
        console.log(err)
      }
      return url
    }
  }
  return ''
}

export const stripAndFormat = (str, isFromBlog) => {
  let resStr = str.replace(/^(<br\s*\/?>)*|(<br\s*\/?>)*$/i, '')
    .replace(/&nbsp;/gi, '')
    // remove dates
    .replace(/(0?[1-9]|[12][0-9]|3[01])[\/\-\.](0?[1-9]|1[012])[\/\-\.]\d{4}/g, '')
    // remove empty tags
    .replace(/<(\w+)\b(?:\s+[\w\-.:]+(?:\s*=\s*(?:"[^"]*"|"[^"]*"|[\w\-.:]+))?)*\s*\/?>\s*<\/\1\s*>/g, '')
    // 1. compress all non-newline whitespaces to single space
    .replace(/ +/g, ' ')
    // 2. remove spaces from begining or end of lines
    .replace(/^ +/gm, '')
    // 3. compress multiple newlines to single newlines (or two)
    .replace(/(\n\s*?\n)\s*\n/g, '$1')
    // 4. remove newlines from begining or end of string
    .replace(/^\s+|\s+$/g, '')
    // 5. remove hashtags from string
    .replace(/#([^\\s]*)/g, '')
    // 6. remove username from string
    .replace(/@([^\\s]*)/g, '')
    .replace('©', '')
    .replace(/Copyright[:]?/gi, '')
    .replace(/Свидетельство о публикации\s?№[\d]*/gi, '')
    .trim()
  if (isFromBlog) {
    return resStr
  } else {
    return resStr
      // Remove links
      .replace(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi, '')
  }
}

export const stripAndFormatMsg = (str) => {
  return str.replace(/^(<br\s*\/?>)*|(<br\s*\/?>)*$/i, '')
    .replace(/&nbsp/gi, '')
    // remove empty tags
    .replace(/<(\w+)\b(?:\s+[\w\-.:]+(?:\s*=\s*(?:"[^"]*"|"[^"]*"|[\w\-.:]+))?)*\s*\/?>\s*<\/\1\s*>/g, '')
    // 1. compress all non-newline whitespaces to single space
    .replace(/ +/g, ' ')
    // 2. remove spaces from begining or end of lines
    .replace(/^ +/gm, '')
    // 3. compress multiple newlines to single newlines (or two)
    .replace(/\n\s*\n\s*\n/g, '\n\n')
    // 4. remove newlines from begining or end of string
    .replace(/^\s+|\s+$/g, '')
    .trim()
}

export const linkifyText = (text) => {
  let result = text
  const links = linkify.match(text)
  if (links) {
    links.map(href => {
      if (href.url.includes('ryfma.com')) {
        result = result.replace(href.url, `<a href='${href.url}' class='away-link'>${href.url}</a>`)
      } else {
        result = result.replace(href.url, `<a href='${href.url}' class='away-link' rel='nofollow noopener' target='_blank'>${href.url}</a>`)
      }
    })
  }
  return result
}

export const parseText = (text) => {
  let commText = text
  // strip html link
  const linkRegEx = /<a\b[^>]*>(.*?)<\/a>/gi
  const hrefLinks = commText.match(linkRegEx)
  if (hrefLinks) {
    hrefLinks.map(href => {
      const linkText = href.match(/<a [^>]+>([^<]+)<\/a>/i)
      if (linkText) {
        commText = commText.replace(href, linkText[1])
      }
    })
  }

  // linkify
  commText = linkifyText(commText)

  // parse mentions
  const mentionRegEx = /\B[@＠][a-z0-9_-]+/gi
  const mentions = commText.match(mentionRegEx)
  if (mentions) {
    commText = mentions.map(mention => commText.replace(mention, `<a href='/u/${mention.replace('@', '').replace('＠', '')}' class='mention-link' target='_blank'>${mention}</a>`))
  }

  return commText
}

export const formatDate = (date) => {
  let month = date.getMonth() + 1
  month = month < 10 ? 0 + month.toString() : month
  let day = date.getDate()
  day = day < 10 ? 0 + day.toString() : day
  let hours = date.getHours()
  hours = hours < 10 ? 0 + hours.toString() : hours
  let minutes = date.getMinutes()
  minutes = minutes < 10 ? 0 + minutes.toString() : minutes
  let strTime = hours + ':' + minutes
  return `${date.getFullYear()}-${month}-${day}T${strTime}+00:00`
}

export const youtubeParser = (url) => {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/
  const match = url.match(regExp)
  return (match && match[7].length === 11) ? match[7] : false
}

export const commentSlugify = (content) => {
  const ranges = [
    '\ud83c[\udf00-\udfff]', // U+1F300 to U+1F3FF
    '\ud83d[\udc00-\ude4f]', // U+1F400 to U+1F64F
    '\ud83d[\ude80-\udeff]'  // U+1F680 to U+1F6FF
  ]
  let slug = content
    .replace(/<p>/gi, '')
    .replace(/<\/p>/gi, '')
    .replace(/\B[@＠][a-z0-9_-]+/gi, '')
    .replace(/[&\/\\#,+()$~%.'":*!?<>{}]/gi, '')
    .replace(new RegExp(ranges.join('|'), 'g'), '')
    .replace(/\uD83C\uDFF4(?:\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74)\uDB40\uDC7F|\u200D\u2620\uFE0F)|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC68(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3])|(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3]))|\uD83D\uDC69\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3])|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\uD83D\uDC68(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|(?:(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)\uFE0F|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDD6-\uDDDD])(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\u200D[\u2640\u2642])|\uD83D\uDC69\u200D[\u2695\u2696\u2708])\uFE0F|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D\uDC68(?:\u200D(?:(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D[\uDC66\uDC67])|\uD83C[\uDFFB-\uDFFF])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3])|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF4\uD83C\uDDF2|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDB5\uDDB6\uDDD1-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC69\uDC6E\uDC70-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD26\uDD30-\uDD39\uDD3D\uDD3E\uDDB5\uDDB6\uDDB8\uDDB9\uDDD1-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])?|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDEEB\uDEEC\uDEF4-\uDEF9]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD70\uDD73-\uDD76\uDD7A\uDD7C-\uDDA2\uDDB0-\uDDB9\uDDC0-\uDDC2\uDDD0-\uDDFF])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEF9]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD70\uDD73-\uDD76\uDD7A\uDD7C-\uDDA2\uDDB0-\uDDB9\uDDC0-\uDDC2\uDDD0-\uDDFF])\uFE0F/g, '')
    .replace(/[\ud83d[\ude00-\ude4f]/gi, '')
    .trim()

  if (slug.length > 100) {
    slug = slug.substring(0, 100)
  } else if (slug.length < 5) {
    slug = '-'
  }
  slug = slug
    .replace(/\s/gi, '-')
    .replace(/\-+/gi, '-')
    .toLowerCase()

  return slug
}

export const stringifyObject = (obj) => {
  Object.keys(obj).forEach(key => obj[key] === undefined && delete obj[key])
  if (obj) {
    return JSON.stringify(obj).replace(/[{}"]/g, '').replace(/[:,]/g, '_')
  }
  return ''
}

export const getRandomFlatColor = (h) => {
  const result = {}
  const PHI = 0.618033988749895
  let s
  let v
  let hue
  if (h === undefined) {
    hue = (Math.floor(Math.random() * (360 - 0 + 1) + 0)) / 360
    h = (hue + (hue / PHI)) % 360
  } else {
    h /= 360
  }
  v = Math.floor(Math.random() * (100 - 20 + 1) + 20)
  s = (v - 10) / 100
  v = v / 100

  let r
  let g
  let b
  let i
  let f
  let p
  let q
  let t
  i = Math.floor(h * 6)
  f = h * 6 - i
  p = v * (1 - s)
  q = v * (1 - f * s)
  t = v * (1 - (1 - f) * s)
  switch (i % 6) {
    case 0:
      r = v
      g = t
      b = p
      break
    case 1:
      r = q
      g = v
      b = p
      break
    case 2:
      r = p
      g = v
      b = t
      break
    case 3:
      r = p
      g = q
      b = v
      break
    case 4:
      r = t
      g = p
      b = v
      break
    case 5:
      r = v
      g = p
      b = q
      break
  }
  r = Math.round(r * 255)
  g = Math.round(g * 255)
  b = Math.round(b * 255)

  const finalColor = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)

  result.h = h
  result.s = s
  result.v = v
  result.r = r
  result.g = g
  result.b = b
  result.hex = finalColor
  return result
}

export const getAverageColor = (canvas, imgSrc) => {
  const img = new Image()
  img.src = imgSrc
  const ctx = canvas.getContext('2d')
  const width = canvas.width = img.naturalWidth
  const height = canvas.height = img.naturalHeight

  ctx.drawImage(img, 0, 0)

  const imageData = ctx.getImageData(0, 0, width, height)
  const data = imageData.data
  let r = 0
  let g = 0
  let b = 0

  for (let i = 0, l = data.length; i < l; i += 4) {
    r += data[i]
    g += data[i + 1]
    b += data[i + 2]
  }

  r = Math.floor(r / (data.length / 4))
  g = Math.floor(g / (data.length / 4))
  b = Math.floor(b / (data.length / 4))

  const finalColor = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
  return finalColor
}

export const rgbToHsl = (rSrc, gSrc, bSrc) => {
  const r = rSrc / 255
  const g = gSrc / 255
  const b = bSrc / 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h
  let s
  let l = (max + min) / 2

  if (max == min) {
    h = s = 0 // achromatic
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }

  return { h: h, s: s, l: l }
}

export const getCardType = (number) => {
  // visa
  let re = new RegExp('^4')
  if (number.match(re) !== null) {
    return 'Visa'
  }

  // Mastercard
  // Updated for Mastercard 2017 BINs expansion
  if (/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(number)) {
    return 'Mastercard'
  }

  // AMEX
  re = new RegExp('^3[47]')
  if (number.match(re) != null) {
    return 'AMEX'
  }

  // Discover
  re = new RegExp('^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)')
  if (number.match(re) != null) {
    return 'Discover'
  }

  // Diners
  re = new RegExp('^36')
  if (number.match(re) != null) {
    return 'Diners'
  }

  // Diners - Carte Blanche
  re = new RegExp('^30[0-5]')
  if (number.match(re) != null) {
    return 'Diners - Carte Blanche'
  }

  // JCB
  re = new RegExp('^35(2[89]|[3-8][0-9])')
  if (number.match(re) != null) {
    return 'JCB'
  }

  // Visa Electron
  re = new RegExp('^(4026|417500|4508|4844|491(3|7))')
  if (number.match(re) != null) {
    return 'Visa Electron'
  }

  return ''
}
