import * as React from "react";

import { connect } from "react-redux";

import { addLap, clearLaps } from "../actions/lapActions";

import Laps from "./Laps";

interface componentProps {
    addLap:any,
    clearLaps:any,
    laps:lapInterface[]
}

interface componentsState {

    time:string,
    paused:boolean,
    reseted:boolean
    
}

interface lapInterface{
    fullTime:string,
    laptime:string
}

class Stopwatch extends React.Component<componentProps, componentsState> {
    public render() {
        let startBtn;
        let pauseBtn;
        let resetBtn;
        let lapBtn;

        if( this.state.time == "00:00:00" || this.state.paused ) {
            startBtn = <button className="stopwatch__btn stopwatch__btn_start" onClick={ () => { this.isNow( "start" )  } }> Start </button>;
        }

        if(this.state.time !== "00:00:00" && !this.state.paused) {
            pauseBtn = <button className="stopwatch__btn stopwatch__btn_pause" onClick={ () => { this.isNow( "pause" )  } }> Pause </button>
        }

        if(this.state.time !== "00:00:00" && this.state.paused) {
            resetBtn = <button className="stopwatch__btn stopwatch__btn_reset" onClick={ () => { this.isNow( "reset" )  } }> Reset </button>
        }

        if(this.state.time !== "00:00:00" && !this.state.paused) {
            lapBtn = <button className="stopwatch__btn stopwatch__btn_lap" onClick={ () => { this.lap( this.state.time )  } }> Lap </button>
        }

        return (
            <div className="stopwatch card">

                <p className="stopwatch__time"> {this.state.time} </p>


                <div className="stopwatch__btns">

                    {startBtn}
                    {pauseBtn}
                    {resetBtn}
                    {lapBtn}

                </div>

                <Laps></Laps>
            </div>   
        )
    }

    constructor(props: any){
        super(props);

        this.state = {
            time:"00:00:00",
            paused:false,
            reseted:false
        }
    }

    isNow( status:string ) {
        
        switch (status) {

            case "start":
                this.setState( { paused:false }, () => {
                    this.startTimer( this.state.time );
                } );
            break;

            case "pause":
                this.setState( { paused:true} );
            break;

            case "reset":
                if(this.state.paused) {
                    this.setState({time:"00:00:00", reseted:false});
                    this.props.clearLaps();                    
                } else {
                    this.setState( { reseted:true } );
                }
            break;

        }

    }

    lap( time:string ) {

        if(this.state.paused) {
            return
        }

        let previous:string; 
        let lapTimeString:string;

        let currentFull:number = this.getFullTime(time);

        if( this.props.laps[this.props.laps.length - 1] ) {

            let previous = this.props.laps[this.props.laps.length - 1].fullTime;

            let previousFull:number = this.getFullTime(previous);

            let lapTime = currentFull - previousFull;  

            lapTimeString = this.timeToString(lapTime);            
        }


        let lapData = {
            fullTime:time,
            laptime:lapTimeString
        }

        this.props.addLap(lapData);
    }

    startTimer( current:string ) {        

        let self = this;

        let currentFull:number = this.getFullTime(current) + 1;

        var start = new Date().getTime();

        let timer = window.setInterval(function() {
            
            if(self.state.paused) {
                clearInterval(timer);
                return;
            }

            if(self.state.reseted) {
                self.setState( {reseted:false, time:"00:00:00"} );
                clearInterval(timer);
                self.props.clearLaps();                    
                return;
            }

            var full:number = (new Date().getTime() - start)/10 + currentFull;
            
            let fullString = self.timeToString(full);

            self.setState( {time:fullString} )
            
        }, 10);

        return;       
    }

    getFullTime(time:string):number {

        let m = parseInt( time.split(":")[0] );
        let s = parseInt( time.split(":")[1] );
        let cs = parseInt( time.split(":")[2] );

        return ( cs + 100*s + 6000*m );

    }

    timeToString(time:number):string {

        let m:number =  ( Math.floor( time/6000 ) );
        let s:number = ( Math.floor( (time - m*6000)/100 ) );
        let cs:number = Math.floor(time - m*6000 - s*100);
        
        return this.format( m.toString() ) + ":" + this.format( s.toString() ) + ":" + this.format( cs.toString() );

    }

    format(item:string):string {
        if( parseInt(item) < 10) {
            item = "0" + item;
        } 
        return item;
    }

}

const mapStateToProps = (state:any) => {  

    return {
        laps:state.laps.laps
    }

  }
  
  const mapDispatchToProps = (dispatch:any) => {
    return {

        addLap: (lap:lapInterface) => {                                                
            dispatch(addLap(lap))
        },

        clearLaps: () => {                        
            dispatch(clearLaps())
        }

    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(Stopwatch);