interface lapInterface{
  fullTime:string,
  laptime:string
}

const lapReducer = (
  state : {laps:lapInterface[]} = {
    laps:[]
  },
   action:{type:string, payload:any}) => {        
    switch (action.type) {
      case "ADD_LAP":
        state = {
          laps:[ ...state.laps, action.payload]
        }
      break;

      case "CLEAR_LAPS": {
        state = {
          laps:[]
        }
      }

    }
    
    return state;
  }

  export default lapReducer