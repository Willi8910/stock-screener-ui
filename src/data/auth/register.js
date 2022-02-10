import axios from "axios";
const baseURL = "https://stock-screener-api.herokuapp.com";

export default async function(payload) {
  return (
    axios.post(baseURL + "/signup", payload)
    .then((response) => {
      if(response.status === 200){
        return {success: true, token: response.headers.authorization}
      }
      else{
        const message = "Something wrong happen"
        return{message: response.status.message, success: false}
      }
    }) 
    .catch((error) => {
        return{message: error.response? error.response.data.status.message : "Something wrong happen", success: false}
    })
  )
}
