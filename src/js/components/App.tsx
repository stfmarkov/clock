import * as React from "react";
import { BrowserRouter } from "react-router-dom";

import PrimaryLayout from "./PrimaryLayout"

export interface AppProps { compiler: string; framework: string; }

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class App extends React.Component<AppProps, {}> {
    public render() {
        return (
            <div>
              <BrowserRouter>
                <PrimaryLayout/>
              </BrowserRouter>
            </div>    
        )
    }
}