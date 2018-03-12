interface locationConfig {
    latitude:number
    longitude:number
}

export function setCoords(coords:locationConfig) {  
    
    return {
            type:"SET_COORDS",
            payload:coords
    }
}
