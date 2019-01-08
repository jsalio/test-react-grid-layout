import * as React from "react";
import * as GridLayout from "react-grid-layout";
import {
  bgColor,
  defaultTestGrid,
  IReactGridLayout,
  IState,
  translateToReactGridLayout
} from "src/interfaces/Interface";
import "./LayoutDesign.css";

export default class LayoutDesign extends React.Component<any, IState> {
  /**
   * Default constructor for this component
   */
  constructor(props: any) {
    super(props);
    const grid = defaultTestGrid;
    this.state = {
      isEditableLayout: false,
      layout: grid,
      maxX: 0,
      maxY: 0
    };
  }

  public render() {
    const layout = this.state.layout.map(x =>
      translateToReactGridLayout(x.location)
    );
    return (
      <GridLayout
        layout={layout}
        cols={4}
        className={"layout"}
        rowHeight={10}
        width={1200}
      >
        {layout.map(x => this.generatecontainer(x))}
      </GridLayout>
    );
  }

  private generatecontainer = (layot: IReactGridLayout) => {
    return (
      <div key={layot.i} style={{ backgroundColor: bgColor }}>
        container
      </div>
    );
  };
}
