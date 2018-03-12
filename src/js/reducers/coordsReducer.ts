interface locationConfig {
  latitude:number
  longitude:number
}

const coordsReducer = (
  state = {
    coords:{latitude:0, longitude:0},
  },
   action:{type:string, payload:locationConfig}) => {
    
    switch (action.type) {

      case "SET_COORDS":      
      state = {
        coords:{
          latitude:action.payload.latitude,
          longitude:action.payload.longitude
        },
      }      
        break;

    }
        
    return state;

  }

  export default coordsReducer