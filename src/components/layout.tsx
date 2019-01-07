import * as React from "react";
// import * as ResponsiveGridLayout from "react-grid-layout";
import * as GridLayout from "react-grid-layout";
import "./layout.css";
import SampleComponent from "./sample";

interface IState {
  isEditableLayout: boolean;
  layout: IWidget[];
  maxX: number;
  maxY: number;
}

interface IWidget {
  component: any;
  location: IRglLocation;
}

interface IRglLocation {
  id: string;
  location_X: number;
  location_Y: number;
  widget_Width: number;
  widget_Height: number;
  isStatic: boolean;
}

export default class MyFirstGrid extends React.Component<any, IState> {
  private bgColor = "#acb6bf";
  private defaultWidth = 1;
  private defaultHeight = 10;

  constructor(props: any) {
    super(props);
    this.state = {
      isEditableLayout: false,
      layout: [
        {
          component: "",
          location: {
            id: "a",
            location_X: 0,
            location_Y: 0,
            widget_Width: 0,
            // tslint:disable-next-line:object-literal-sort-keys
            widget_Height: 0,
            isStatic: false
          }
        },
        {
          component: "",
          location: {
            id: "b",
            location_X: 0,
            location_Y: 1,
            widget_Width: 0,
            // tslint:disable-next-line:object-literal-sort-keys
            widget_Height: 0,
            isStatic: false
          }
        },
        {
          component: "",
          location: {
            id: "c",
            location_X: 0,
            location_Y: 2,
            widget_Width: 0,
            // tslint:disable-next-line:object-literal-sort-keys
            widget_Height: 0,
            isStatic: false
          }
        }
      ],
      maxX: 0,
      maxY: 0
    };
  }

  public componentWillUnmount() {
    sessionStorage.setItem(
      "DashBoardLayout",
      JSON.stringify(this.state.layout.map(x => x.location))
    );
  }

  public componentDidMount() {
    const storageLayout = sessionStorage.getItem("DashBoardLayout");
    if (storageLayout === null) {
      return;
    }

    const layout: IWidget[] = JSON.parse(storageLayout).map(
      (x: IRglLocation) => {
        return {
          component: this.buildSampleComponent(x.id, x.id),
          location: x
        };
      }
    );

    this.setState({ layout });
  }

  public render() {
    const layout = this.buildLayout();
    // const cssStyleClass = this.state.isEditableLayout ? "layout" : "";
    // tslint:disable-next-line:no-console
    // console.log(cssStyleClass);
    return (
      <div>
        <label> lock grid design</label>
        <input
          type="checkbox"
          checked={this.state.isEditableLayout}
          onChange={this.checkChange}
        />
        <button
          onClick={this.addNewContainer.bind(
            this,
            `${this.state.layout.length + 1}`
          )}
        >
          Add container
        </button>
        <GridLayout
          layout={layout}
          cols={4}
          className={""}
          rowHeight={10}
          width={1200}
          onLayoutChange={this.layoutChange}
        >
          {layout.map(x => {
            return (
              <div key={x.i} style={{ backgroundColor: this.bgColor }}>
                {this.buildSampleComponent(
                  this.state.layout.filter(n => n.location.id === x.i)[0]
                    .location.id,
                  this.state.layout.filter(n => n.location.id === x.i)[0]
                    .location.id
                )}
                <div
                  className="remove-container"
                  style={{
                    display: !this.state.isEditableLayout ? "flex" : "none"
                  }}
                >
                  <button onClick={this.removeContainer.bind(this, x.i)}>
                    x
                  </button>
                  <button onClick={this.lockContainer.bind(this, x.i)}>
                    {x.static ? "Unlock" : "Lock"}
                  </button>
                </div>
              </div>
            );
          })}
        </GridLayout>
        {JSON.stringify(this.state.isEditableLayout)}
      </div>
    );
  }

  private checkChange = () => {
    this.setState({ isEditableLayout: !this.state.isEditableLayout });
  };

  private layoutChange = (e: any) => {
    const currentLocation: Array<{
      i: string;
      x: number;
      y: number;
      w: number;
      h: number;
      static: boolean;
    }> = e;
    const currentLayout = this.state.layout;
    currentLayout.forEach(wLayout => {
      const location = currentLocation.filter(
        x => x.i === wLayout.location.id
      )[0];
      wLayout.location = {
        id: location.i,
        location_X: location.x,
        location_Y: location.y,
        widget_Width: location.w,
        // tslint:disable-next-line:object-literal-sort-keys
        widget_Height: location.h,
        isStatic: !location.static
          ? this.state.isEditableLayout
          : location.static
      };
    });
    const maxX = Math.max(...this.state.layout.map(x => x.location.location_X));
    const maxY = Math.max(...this.state.layout.map(x => x.location.location_Y));

    this.setState({ layout: currentLayout, maxX, maxY });
  };

  private buildLayout = () => {
    return this.state.layout.map(x => {
      return {
        i: x.location.id,
        x: x.location.location_X,
        y: x.location.location_Y,
        // tslint:disable-next-line:object-literal-sort-keys
        w:
          x.location.widget_Width === 0
            ? this.defaultWidth
            : x.location.widget_Width,
        h:
          x.location.widget_Height === 0
            ? this.defaultHeight
            : x.location.widget_Height,
        static: !x.location.isStatic
          ? this.state.isEditableLayout
          : x.location.isStatic
      };
    });
  };

  private buildSampleComponent = (cProp: any, id: any) => {
    return (
      <SampleComponent
        text={cProp}
        id={id}
        key={(
          this.S4() +
          this.S4() +
          "-" +
          this.S4() +
          "-4" +
          this.S4().substr(0, 3) +
          "-" +
          this.S4() +
          "-" +
          this.S4() +
          this.S4() +
          this.S4()
        ).toLowerCase()}
      />
    );
  };

  private addNewContainer = (id: string) => {
    const currentLayout = this.state.layout;
    const newWidget: IWidget = {
      component: this.buildSampleComponent("this a new component", id),
      location: {
        id,
        isStatic: this.state.isEditableLayout,
        location_X: 0,
        // tslint:disable-next-line:radix
        location_Y: this.state.maxY,
        widget_Height: this.defaultHeight,
        widget_Width: this.defaultWidth
      }
    };
    currentLayout.push(newWidget);
    this.setState({ layout: currentLayout });
  };

  private removeContainer = (id: string) => {
    // tslint:disable-next-line:no-console
    console.log(id);
    const currentLayout = this.state.layout.filter(x => x.location.id !== id);
    this.setState({ layout: currentLayout });
  };

  private lockContainer = (id: string) => {
    // tslint:disable:no-console
    console.log(id);
    const t = this.state.layout;
    t.forEach(x => {
      if (x.location.id === id) {
        console.log("here");
        x.location.isStatic = !x.location.isStatic;
      }
    });
    console.log(t);
    this.setState({ layout: t });
  };

  private S4() {
    // tslint:disable-next-line:no-bitwise
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
}
