interface locationConfig {
    latitude:number
    longitude:number
}

export function setLocation(location:string) {    
    return {
            type:"SET_LOCATION",
            payload:location
    }
}