import * as React from "react";
import { MouseEvent } from "react";

interface componentProps{
    onAdd:Function
}

interface componentState{}

export class AddTest extends React.Component<componentProps, componentState> {

    private newTest:HTMLInputElement;

    public render() {
        return (
            <form className="add-test">
                <input type="text" className="add-test__input" ref={(input) => { this.newTest = input; }}/>
                <button className="add-test__button" onClick={this.add}>Add</button>
            </form>
        )
    }

    constructor(props: componentProps){
        super(props);

        this.add = this.add.bind(this)
    }

    add(event: MouseEvent<HTMLButtonElement>): void {
        event.preventDefault()
        this.props.onAdd(this.newTest.value);
    }


}