import * as React from "react";

import { connect } from "react-redux";

import { setLocation } from "../actions/locationActions";
import { setCoords } from "../actions/coordsActions";


const geocoding:any = require('reverse-geocoding');


interface componentProps {
    coords:locationConfig,
    location:string,
    setCoords:any,
    setLocation:any,
}

interface componentsState {
    now:today,
}

interface locationConfig {
    latitude:number
    longitude:number
}

interface today {
    day:string,
    ofWeek:string,
    year:string, 
    month:string, 
    h:string, 
    m:string, 
    s:string,
}


class Local extends React.Component<componentProps, componentsState> {



    public render() {

        let userLoacation;

        if(this.props.location) {
            userLoacation = this.props.location
        } else {
            userLoacation = "Looking for your location"
        }
        

        return (
            <div className="watch card">
                <p className="watch__time"> {this.state.now.h} : {this.state.now.m} : {this.state.now.s}</p>
                <div className="watch__card">
                    <p className="watch__location" >{userLoacation}</p>
                    <p className="watch__day"> {this.state.now.ofWeek}, {this.state.now.day} {this.state.now.month} </p>
                </div>
            </div>
        )
    }

    constructor(props: any){
        super(props);

        this.state = {
            now:{
                day:"",
                ofWeek:"",
                year:"", 
                month:"", 
                h:"", 
                m:"", 
                s:""
            },
        }

        this.findCoords = this.findCoords.bind(this)
    }

    // Components status
    _isMounted:boolean;

    findCoords():void{

        let self = this;

        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
          };
          
          function success(pos:any) {
            var crd = pos.coords;
            
            let coords:locationConfig = {
                latitude:0,
                longitude:0
            };

            coords.latitude = pos.coords.latitude;
            coords.longitude = pos.coords.longitude;  
            
            self.props.setCoords(coords);
            self.findLocation(coords)
            
          };
          
          function error(err:any) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
          };

        navigator.geolocation.getCurrentPosition(success, error, options);

    }

    findLocation(config:locationConfig):void {   

        geocoding.location(config, (err:any, data:any) => {
 
            if(err){
                console.log(err);                
                this.findCoords();
            }else{
                this.props.setLocation(data.results[2].formatted_address);                
            }

        });

    }

    checkClock(_isMounted:boolean) {        

        if(!_isMounted) {
            return
        }

        let now = new Date();
        let day = now.getDate().toString();
        let ofWeek = now.toString().split(" ")[0];
        let year = now.getFullYear().toString();
        let month = now.toString().split(" ")[1];

        let h = format( now.getHours().toString() );
        let m = format( now.getMinutes().toString() );
        let s = format( now.getSeconds().toString() );


        function format(item:string):string {
            if( parseInt(item) < 10) {
                item = "0" + item;
            } 
            return item;
        }

        this.setState({ now:{
            day, ofWeek, year, month, h, m, s
        } });

        let interval = setTimeout(() => { 
            this.checkClock(this._isMounted);
        }, 500);

    }

    componentWillMount() {   

        this._isMounted = true;
        this.checkClock(this._isMounted);
        this.findCoords();
        
    }

    componentWillUnmount () {        
        this._isMounted = false;
    }

}

const mapStateToProps = (state:any) => {  

    return {
        coords: state.coords.coords,
        location: state.location.location,
    }

  }
  
  const mapDispatchToProps = (dispatch:any) => {
    return {

        setCoords: (coords:locationConfig) => {                                    
            dispatch(setCoords(coords))
        },

        setLocation: (location:string) => {                        
            dispatch(setLocation(location))
        }

    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(Local);

