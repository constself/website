import http from '../request'

export function fetchWebsiteList(data: any) {
  return http.post('/information/list', data)
}

export function fetchWebsiteDetail(data: { id: number }) {
  return http.post('/information/detail', data)
}
