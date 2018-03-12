import * as React from "react";
import { connect } from "react-redux";

import Lap from "./Lap"

interface componentProps{
    laps:lapInterface[]
}

interface componentState{
    
}

interface lapInterface{
    fullTime:string,
    laptime:string
}

class Laps extends React.Component<componentProps, componentState> {
    public render() {

        let laps:lapInterface[] = this.props.laps;

        let lapComponents = laps.map( (lap, index) => {
            return <Lap lap={lap} key={index} index={index + 1}></Lap> 
        })


        return (
            <ul className="stopwatch__laps">{lapComponents}</ul>
        )
    }

    constructor(props: componentProps){
        super(props);

        this.remove = this.remove.bind(this);
    }

    remove(): void {

    }

    componentDidMount() {
        
    }
}

const mapStateToProps = (state:any) => {  

    return {
        laps:state.laps.laps
    }

  }

const mapDispatchToProps = (dispatch:any) => {
    return {

    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(Laps);