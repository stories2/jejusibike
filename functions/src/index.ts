import * as functions from 'firebase-functions';
import axios from 'axios';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const bike = functions.region('asia-northeast1').https.onRequest((request, response) => {
  response.set('Access-Control-Allow-Origin', '*');
  axios.get('http://bike.jejusi.go.kr/map/MapData.json',
  )
  .then(function (res) {
    response.send({
      success: true,
      data: res.data
    });
  })
  .catch(function (error) {
    functions.logger.info(`Failed to get bike data: ${error.message}`, {structuredData: true});
    response.send({
      success: false,
      message: error.message
    });
  })
});

export const test = functions.region('asia-northeast1').https.onRequest((req, res) => {
  console.log('[test]', JSON.stringify(req.body));
  res.send('ok')
})

export const kakaoWork = functions.region('asia-northeast1').https.onRequest((request, response) => {
  response.set('Access-Control-Allow-Origin', '*');
  axios.post('https://api.kakaowork.com/v1/messages.send', request.body, {
    headers: {
      // Overwrite Axios's automatically set Content-Type
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 33265810.93837dc823e2497d9ebb6cdb04669d8a'
    }
  })
      .then(function (res) {
        response.send({
          success: true,
          data: res.data
        });
      })
      .catch(function (error) {
        functions.logger.info(`Failed to send notify: ${error.message}`, {structuredData: true});
        response.send({
          success: false,
          message: error.message
        });
      })
});
