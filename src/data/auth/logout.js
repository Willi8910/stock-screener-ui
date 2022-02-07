import axios from "axios";
const baseURL = "https://stock-screener-api.herokuapp.com";

export default async function(payload) {
  return (
    axios.delete(baseURL + "/logout", {
      headers: {
        Authorization: payload.token
      }
    })
    .then((response) => {
      if(response.status === 200){
        return {success: true}
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
