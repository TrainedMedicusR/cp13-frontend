import request from '@/utils/request'

export function getSurvey(link) {
  return request({
    url: '/api/survey/'+link,
    method: 'get'
  })
}
