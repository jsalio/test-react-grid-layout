import * as React from "react";
import ComponentA from "src/components/SampleComponentA/ComponentA";
import ComponentB from "src/components/SampleComponentB/CompoenentB";

export interface IState {
  isEditableLayout: boolean;
  layout: IWidget[];
  maxX: number;
  maxY: number;
}

export interface IWidget {
  componentToUse: RegisterComponent;
  location: IRglLocation;
  isStatic: boolean;
}

export interface IRglLocation {
  id: string;
  location_X: number;
  location_Y: number;
  widget_Width: number;
  widget_Height: number;
  isStatic: boolean;
}

export interface IReactGridLayout {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  isStatic: boolean;
}

export enum RegisterComponent {
  ComponentA = "ComponentA",
  ComponentB = "ComponentB"
}

export const bgColor = "#acb6bf";
export const defaultWidth = 1;
export const defaultHeight = 10;

export const GetRegisterComponent = () => {
  return {
    [RegisterComponent.ComponentA]: <ComponentA />,
    [RegisterComponent.ComponentB]: <ComponentB />
  };
};

export const translateToReactGridLayout = (
  widgetLocation: IRglLocation
): IReactGridLayout => {
  return {
    h: widgetLocation.widget_Height,
    i: widgetLocation.id,
    isStatic: widgetLocation.isStatic,
    w: widgetLocation.widget_Width,
    x: widgetLocation.location_X,
    y: widgetLocation.location_Y
  };
};

export const GenerateGUID = () => {
  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-4" +
    S4().substr(0, 3) +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  ).toLowerCase();
};

const S4 = () => {
  // tslint:disable-next-line:no-bitwise
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
};

export const defaultTestGrid: IWidget[] = [
  {
    componentToUse: RegisterComponent.ComponentA,
    isStatic: false,
    location: {
      id: RegisterComponent.ComponentA.toString() + GenerateGUID(),
      isStatic: false,
      location_X: 0,
      location_Y: 0,
      widget_Height: 0,
      widget_Width: 0
    }
  }
];
