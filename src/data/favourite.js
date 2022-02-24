import axios from "axios";
const baseURL = "https://stock-screener-api.herokuapp.com";

const saveFavourite = function(payload) {
  console.log(payload)
  return (
    axios.post(baseURL + "/stocks/save_favourite/" + payload.id, {}, {
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

const deleteFavourite = function(payload) {
  return (
    axios.delete(baseURL + "/stocks/delete_favourite/" + payload.id, {
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

export {saveFavourite, deleteFavourite}
