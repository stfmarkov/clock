import * as React from "react";
import { Route } from "react-router-dom";

import Menu from "./Menu"
import Local from "./Local"
import Stopwatch from "./Stopwatch"
import Timer from "./Timer"

export default class PrimaryLayout extends React.Component {
    public render() {  
      return (
        <div className="primary-layout">
          <header>
            
            <Menu></Menu>
  
          </header>
          <div>
            <Route exact path="/" render={(props) => ( <Local/> )} />
            <Route path="/stopwatch" component={Stopwatch} />
            <Route path="/timer" component={Timer} />
          </div>
        </div>
      )
    }
  }