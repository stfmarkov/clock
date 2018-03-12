interface lapInterface{
    fullTime:string,
    laptime:string
}

export function addLap(lap:lapInterface) {        
    return {
            type:"ADD_LAP",
            payload:lap
    }
}

export function clearLaps() {    
    return {
            type:"CLEAR_LAPS"
    }
}