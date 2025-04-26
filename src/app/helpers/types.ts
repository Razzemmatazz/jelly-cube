export type DesignStyle = "minimal" | "offset" | "symmetrical" | string;

export interface ToroidProps {
  index: number;
  color: string;
  coords: {
    x: number;
    y: number;
    z: number;
  };
  position: [number, number, number];
  rotation: [number, number, number];
  visible: boolean;
}

export type Color = string;

export type Limit = [number, number] | number[];

export type Limits = [Limit, Limit, Limit];
