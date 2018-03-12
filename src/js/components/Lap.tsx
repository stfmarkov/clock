import * as React from "react";

interface componentProps{
    lap:lapInterface,
    key:number,
    index:number
}

interface lapInterface{
    fullTime:string,
    laptime:string
}

interface componentState{}

export default class TestItem extends React.Component<componentProps, componentState> {
    public render() {
        return (
            <li className="stopwatch__lap">
                <span className="stopwatch__lap-num">{this.props.index}</span> <span className="stopwatch__lap-current">{this.props.lap.fullTime}</span> <span>{ this.props.lap.laptime }</span>
            </li>  
        )
    }

    constructor(props: componentProps){
        super(props);
    }

    componentWillReceiveProps() {
        
    }

}