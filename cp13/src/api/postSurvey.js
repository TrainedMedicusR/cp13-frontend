import request from '@/utils/request'

export function postResp(surveyID,questionID,contactInfo,content) {
  const myData = JSON.stringify({
    'survey_id': surveyID,
    'question_id': questionID,
    'contact_info': contactInfo,
    'content':content
  });
  return request({
    url: '/api/survey',
    method: 'post',
    data: myData
  })
}
