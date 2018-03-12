import * as React from "react";

interface componentProps{

}

interface componentState{
    time:string[],
    active:number,
    paused:boolean,
    reset:boolean,
    isOver:boolean
}

export default class Timer extends React.Component<componentProps, componentState> {


    public render() {

        let startBtn;
        let pauseBtn;
        let resetBtn;

        if(!this.state.paused) {
            pauseBtn = <button className="timer__btn timer__btn_pause" onClick={ () => { this.pause() } }>pause</button>; 
            resetBtn = <button className="timer__btn timer__btn_reset" onClick={ () => { this.reset()} }>reset</button>
        }

        if( this.state.isOver ) {
            resetBtn = <button className="timer__btn timer__btn_reset" onClick={ () => { this.reset()} }>reset</button>
        }

        if(this.state.paused && !this.state.isOver) {
            startBtn = <button className="timer__btn timer__btn_start" onClick={ () => { this.start() } }>start</button>;
        }
        
        return (
            <div>
                <div className={"timer card"  + (this.state.isOver ? " timer_over" : "")}>
                    <form className="timer__time">
                        <input 
                            className="timer__input"
                            type="text" 
                            value={this.state.time[2]}  
                            onKeyUp={(e) => this.change(e, 2)} 
                            onFocus={ () => { this.makeActive(2) } }
                            onChange={ () => {} }
                        /> :
                        <input 
                            className="timer__input"
                            type="text" 
                            value={this.state.time[1]} 
                            onKeyUp={(e) => this.change(e, 1)} 
                            onFocus={ () => { this.makeActive(1) } }
                            onChange={ () => {} } 
                        /> :
                        <input 
                            className="timer__input"
                            type="text" 
                            value={this.state.time[0]} 
                            onKeyUp={(e) => this.change(e, 0)} 
                            onFocus={ () => { this.makeActive(0) } }
                            onChange={ () => {} } 
                        />
                    </form>
                </div> 

                <div className="timer__keyboard">
                    <span className="timer__key" onClick={ () => { this.getNum("1") } }>1</span>
                    <span className="timer__key" onClick={ () => { this.getNum("2") } }>2</span>
                    <span className="timer__key" onClick={ () => { this.getNum("3") } }>3</span>
                    <span className="timer__key" onClick={ () => { this.getNum("4") } }>4</span>
                    <span className="timer__key" onClick={ () => { this.getNum("5") } }>5</span>
                    <span className="timer__key" onClick={ () => { this.getNum("6") } }>6</span>
                    <span className="timer__key" onClick={ () => { this.getNum("7") } }>7</span>
                    <span className="timer__key" onClick={ () => { this.getNum("8") } }>8</span>
                    <span className="timer__key" onClick={ () => { this.getNum("9") } }>9</span>
                    <span className="timer__key timer__key_dark" onClick={ () => { this.getNum("Backspace") } }>Clear</span>
                    <span className="timer__key" onClick={ () => { this.getNum("0") } }>0</span>
                    <span className="timer__key timer__key_dark" ></span>
                </div>

                <div className="timer__btns">

                    { startBtn }
                    { pauseBtn }
                    { resetBtn }

                </div>
            </div>
             
        )
    }

    constructor(props: componentProps){
        super(props);

        this.state = {
            paused:true,
            reset:false,
            time:["00", "00", "00"],
            active:0,
            isOver:false,
        }

        this.change = this.change.bind(this);
    }

    change(event:any, input:number) {

        event.persist();
        this.addTime(event.key);

    }

    getNum(num:string):void {

        this.addTime(num);
        
    }

    addTime(num:string) {

        let reg = /^\d+$/;

        if(!reg.test(num) && num !== "Backspace") {
            return;
        }
        

        let time = this.state.time;
        let active = this.state.active
        let fullNum:string;
    
        let old = this.state.time[active]

        if( num == "Backspace") {
            
            fullNum = "00";

        } else if(old == "59") {
                       
            fullNum = "0" + num;

        } else if( parseInt(old + num) > 59 ) { 
        
            fullNum = "59";
            

        } else {
            
            let oldDigits = old.split("");            

            fullNum = old[1] + num;

        }

        time[active] = fullNum;

        this.setState({ time });

    }

    makeActive(num:number) {

        this.setState({active:num});

    }

    start() {        

        if( !this.state.paused || (this.state.time[0] == "00" && this.state.time[1] == "00" && this.state.time[2] == "00") ) {
            return;
        }

        this.setState({ paused:false, reset:false });

        let self = this;
        let time = parseInt(this.state.time[0]) + parseInt(this.state.time[1])*60 + parseInt(this.state.time[2]) * 3600;
        let start = new Date().getTime();

        let interval = window.setInterval(function() { 
            

            if(self.state.paused) {
                clearInterval(interval);
            }

            let current = time - Math.floor( ( new Date().getTime() - start )/1000 );

            if(current == 0) {
                self.setState({isOver:true})                
                self.pause();
            }

            let h:string = Math.floor(current/3600).toString();
            let min:string = Math.floor( (current - 3600*parseInt(h))/60 ).toString();
            let sec:string = Math.floor( current - 3600*parseInt(h) - 60*parseInt(min) ).toString();            

            h = self.format( h.toString() );
            min = self.format( min.toString() );
            sec = self.format( sec.toString() );
                        

            self.setState({time:[sec, min, h]});
            
            if(self.state.reset) {
                self.setState({ time: ["00", "00", "00"]});
            }

        }, 250)
        

        
    }

    pause() {

        this.setState({paused:true})
        
    }

    reset() {

        this.setState({ paused:true, reset:true, isOver:false });

    }

    format(item:string):string {
        if( parseInt(item) < 10) {
            item = "0" + item;
        } 
        return item;
    }

    componentWillReceiveProps() {
        
    }

}