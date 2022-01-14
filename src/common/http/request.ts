const request = require("request");

export class HttpService {
  
  /**
  * Make http call
  *  @param data request details
  *  {
  *     method: "GET"/"POST"//"PUT"
  *     url: "https://....",
  *     headers: {
  *        key: value,
  *        key: value
  *      },
  *  }
  *
  * */
  makeCall(data){
    return new Promise((resolve, reject) => {
      request(data, (error, response) => {
          if (error) {
            reject();
          }
          else if(response.statusCode != 200){
            reject();
          }
          else {
            resolve(response.body);
          }
          
      });
  });
  }
}
