export class Point {
    constructor(public x: number, public y: number, public z: number = 0) {}
  
    public distanceTo(p: Point): number {
      return Math.sqrt((this.x - p.x) ** 2 + (this.y - p.y) ** 2 + (this.z - p.z) ** 2);
    }
  
    public static angleBetween(a: Point, b: Point, c: Point): number {
      const ab = [a.x - b.x, a.y - b.y];
      const cb = [c.x - b.x, c.y - b.y];
      const dot = ab[0] * cb[0] + ab[1] * cb[1];
      const magAB = Math.sqrt(ab[0] ** 2 + ab[1] ** 2);
      const magCB = Math.sqrt(cb[0] ** 2 + cb[1] ** 2);
      const cosTheta = dot / (magAB * magCB);
      return (Math.acos(cosTheta) * 180) / Math.PI;
    }
  
    public static crossProductSign(a: Point, b: Point, c: Point): number {
      const abx = b.x - a.x;
      const aby = b.y - a.y;
      const bcx = c.x - b.x;
      const bcy = c.y - b.y;
      const cross = abx * bcy - aby * bcx;
      return Math.sign(cross);
    }
  
    public static areParallel(p1: Point, p2: Point, p3: Point, p4: Point): boolean {
      const dx1 = p2.x - p1.x;
      const dy1 = p2.y - p1.y;
      const dx2 = p4.x - p3.x;
      const dy2 = p4.y - p3.y;
      return dx1 * dy2 === dx2 * dy1;
    }
  }
  