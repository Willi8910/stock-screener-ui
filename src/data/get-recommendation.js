import axios from "axios";
// const baseURL = "https://stock-screener-api.herokuapp.com";
const baseURL = "http://localhost:3002";

export default async function(payload) {
  return (
    axios.get(baseURL + "/stocks/recommendation", {
      headers: {
        Authorization: payload.token
      }
    })
    .then((response) => {
      if(response.status === 200){
        return {success: true, ...response}
      }
      else{
        const message = "Something wrong happen"
        return{message: message, success: false}
      }
    }) 
    .catch((error) => {
        return{message: error.response? error.response.data : null, success: false}
    })
  )
}
