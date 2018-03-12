import * as React from "react";
import { Link } from "react-router-dom";

interface componentProps {

}

interface componentState {

}

export default class Menu extends React.Component<componentProps, componentState> {
    public render() {
        return (
            <nav className="nav">
                 <ul className="nav__list container">
                    <li><Link  className="nav__item" to='/'>Clock</Link></li>
                    <li><Link  className="nav__item" to='/stopwatch'>Stopwatch</Link></li>
                    <li><Link  className="nav__item" to='/timer'>Timer</Link></li>
                </ul>
            </nav>    
        )
    }
}