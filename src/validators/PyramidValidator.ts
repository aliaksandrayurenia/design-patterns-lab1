import { Point } from '../entities/Point';
import { Pyramid } from '../models/pyramid'

export class PyramidValidator {
  static isValid(line: string): boolean {
    const regex = /^(\d+(\.\d+)?\s){14}\d+(\.\d+)?$/; 
    return regex.test(line);
  }

  static parse(line: string): Pyramid {
    const nums = line.split(' ').map(Number);
    const base = [
      new Point(nums[0], nums[1], nums[2]),
      new Point(nums[3], nums[4], nums[5]),
      new Point(nums[6], nums[7], nums[8]),
      new Point(nums[9], nums[10], nums[11])
    ];
    const apex = new Point(nums[12], nums[13], nums[14]);
    return new Pyramid('pyr-' + Date.now(), base, apex);
  }
}
