export abstract class Shape {
    constructor(public id: string) {}
  
    abstract getArea(): number;
    abstract getPerimeter(): number;
  }
  