import request from '@/utils/request'

export function postResp(surveyID,questionID,contactInfo,content,identifier) {
  const myData = JSON.stringify({
    'survey_id': surveyID,
    'question_id': questionID,
    'contact_info': contactInfo,
    'content':content,
    'identifier':identifier
  });
  return request({
    url: '/api/st/survey/',
    method: 'post',
    data: myData
  })
}
