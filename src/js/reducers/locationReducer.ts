const locationReducer = (
  state = {
    location:"",
  },
   action:{type:string, payload:any}) => {    
  
    switch (action.type) {
      case "SET_LOCATION":
      state = {
        location:action.payload,
      }
        break;

    }
    
    return state;
  }

  export default locationReducer