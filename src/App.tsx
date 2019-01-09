import * as React from "react";
import "./App.css";
import LayoutDesign from "./components/LayoutDesign/layoutDesign";
import logo from "./logo.svg";

interface IState {
  showGrid: boolean;
  lockDesign:boolean;
}

class App extends React.Component<{}, IState> {
  public state = {
    lockDesign:false,
    showGrid: true,
  };
  public render() {
    // tslint:disable-next-line:no-console
    console.log(this.state)
    const layoutView = this.getLayout()
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <label> Show grid</label>
        <input
          name="x"
          type="checkbox"
          checked={this.state.showGrid}
          onChange={this.showGrid}
        />
        {this.state.showGrid ? layoutView : ""}
      </div>
    );
  }

  private getLayout(){
    return <LayoutDesign isEditableLayout={this.state.lockDesign} />
  }

  private showGrid = () => {
    this.setState({ showGrid: !this.state.showGrid });
  };
}

export default App;
