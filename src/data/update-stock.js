import axios from "axios";
const baseURL = "https://stock-screener-api.herokuapp.com";

export default async function(payload) {
  return (
    axios.put(baseURL + "/stocks/"+payload.id, {value: payload.value}, {
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
