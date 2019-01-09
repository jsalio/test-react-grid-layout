import * as React from "react";
import * as GridLayout from "react-grid-layout";
import {
  bgColor,
  defaultTestGrid,
  GetRegisterComponent,
  IReactGridLayout,
  IRglLocation,
  IState,
  translateToIRglLocation,
  translateToReactGridLayout
} from "src/interfaces/Interface";
import "./layoutDesign.css";

export default class LayoutDesign extends React.Component<any, IState> {
  /**
   * Default constructor for this component
   */
  constructor(props: any) {
    super(props);
    const grid = defaultTestGrid;
    this.state = {
      layout: grid,
      lockDesign: false,
      maxX: 0,
      maxY: 0
    };
  }


  public render() {
    let layout = this.state.layout.map(x =>
      translateToReactGridLayout(x.location)
    );
    layout = this.validateLockDesignState(layout)

    return (
      <div>
        <label>{this.state.lockDesign ? 'Lock desing' : 'Unlock design'}</label>
        <input
          name="x"
          type="checkbox"
          checked={this.state.lockDesign}
          onChange={this.lockDesignMode}
        />
        <GridLayout
          layout={layout}
          cols={4}
          className='layout'
          rowHeight={10}
          width={1200}
          onLayoutChange={this.saveLayoutChanges}
        >
          {layout.map(x => this.generatecontainer(x))}
        </GridLayout>
        {JSON.stringify(this.state)}
        <p />
        {JSON.stringify(layout)}
      </div>
    );
  }

  private generatecontainer = (layout: IReactGridLayout) => {
    const currentWidget = this.state.layout.filter(x => x.location.id === layout.i)[0]

    const component = GetRegisterComponent()[currentWidget.componentToUse]
    return (
      <div key={layout.i} style={{ backgroundColor: bgColor }}>
        <div>
          <button onClick={this.removeContainer.bind(this, layout.i)}>
            x
                  </button>
          <button onClick={this.lockContainer.bind(this, layout.i)}>
            {currentWidget.isStatic ? "Unlock" : "Lock"}
          </button>
        </div>
        container
        <div>
          {component}
        </div>
      </div>
    );
  }

  private saveLayoutChanges = (e: any) => {
    const currentGridLayout: IReactGridLayout[] = e
    const currentLocation: IRglLocation[] = currentGridLayout.map(layout => translateToIRglLocation(layout))
    const currentLayout = this.state.layout;

    currentLayout.forEach(widget => {
      const locationLayout = currentLocation.find(x => x.id === widget.location.id)
      if (locationLayout !== undefined) {
        widget.location = locationLayout
      }
    })
    this.setState({ layout: currentLayout })
  }

  private validateLockDesignState = (layoutLocation: IReactGridLayout[]): IReactGridLayout[] => {
    layoutLocation.forEach(location => {
      const widgetLocation = this.state.layout.find(x => x.location.id === location.i)
      if (this.state.lockDesign) {
        location.static = true
      } else {
        location.static = widgetLocation === undefined ? false :
          widgetLocation.isStatic
      }

    });
    return layoutLocation;
  }

  private lockDesignMode = () => {
    this.setState({ lockDesign: !this.state.lockDesign });
  }

  private removeContainer(id: string) {
    // tslint:disable:no-console
    console.log(`click on remove ${id}`)
  }

  private lockContainer(id: string) {
    const currentLayout = this.state.layout;
    currentLayout.forEach(x => {
      if (x.location.id === id) {
        console.log(`click on lock ${id}`)
        x.location.isStatic = !x.location.isStatic
        x.isStatic = !x.isStatic
      }
    })
    this.setState({ layout: currentLayout })
  }

}
