'use client'

export const DEVICES = {
  ANDROID: 'ANDROID',
  IOS: 'IOS',
  UKNOWN: 'UNKNOWN',
}

export const utilDeviceDetection = () => {
  const userAgent: string = window?.navigator?.userAgent
  const isLine = /\bLine\//i.test(userAgent) || false
  const isMobile = /(iPad|iPhone|Android|Mobile)/i.test(userAgent) || false
  const rules = [
    'WebView',
    '(iPhone|iPod|iPad)(?!.*Safari/)',
    'Android.*(wv|.0.0.0)'
  ]

  const regex = new RegExp(`(${rules.join('|')})`, 'ig')
  const isInApp = Boolean(userAgent.match(regex))

  const device = /android/i.test(userAgent) ? DEVICES.ANDROID : /iPad|iPhone|iPod/.test(userAgent) ? DEVICES.IOS : DEVICES.UKNOWN

  return {
    isMobile,
    isLine,
    isInApp,
    userAgent,
    device,
  }
}
