import axios from "axios";
const baseURL = "https://stock-screener-api.herokuapp.com";

export default function(payload) {
  return (
    axios.delete(baseURL + "/stocks/" + payload.id, {
      headers: {
        Authorization: payload.token
      }
    })
    .then((response) => {
      if(response.status === 200){
        return Promise.resolve({success: true, ...response})
      }
      else{
        const message = "Something wrong happen"
        return Promise.reject({message: message, success: false})
      }
    }) 
    .catch((error) => {
      console.log(error)
        return Promise.reject({message: error.response? error.response.data : null, success: false})
    })
  )
}
