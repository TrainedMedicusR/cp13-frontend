import request from '@/utils/request'

export function getSurvey(link) {
  return request({
    url: '/api/st/survey/'+link,
    method: 'get'
  })
}
