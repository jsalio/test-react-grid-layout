import * as React from "react";

export interface ISampleProps {
  text: string;
  id: string;
}

export interface ISampleState {
  text: string;
}

export default class SampleComponent extends React.Component<
  ISampleProps,
  ISampleState
> {
  /**
   *
   */
  constructor(props: ISampleProps) {
    super(props);
    this.state = {
      text: this.props.text
    };
  }
  public render() {
    return (
      <div
        style={{
          backgroundColor: "gray",
          color: "blue"
        }}
      >
        <div>{this.state.text}</div>
        <div style={{ clear: "both" }} />
      </div>
    );
  }
}
