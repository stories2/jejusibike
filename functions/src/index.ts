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
