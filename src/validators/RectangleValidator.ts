import { Point } from '../entities/Point';
import { Rectangle } from '../models/Rectangle';

const RECTANGLE_REGEX = /^(\d+(\.\d+)?\s){7}\d+(\.\d+)?$/;

export class RectangleValidator {
  static isValid(line: string): boolean {
    return RECTANGLE_REGEX.test(line);
  }

  static parse(line: string): Rectangle {
    const nums = line.split(' ').map(Number);
    const points = [
      new Point(nums[0], nums[1]),
      new Point(nums[2], nums[3]),
      new Point(nums[4], nums[5]),
      new Point(nums[6], nums[7]),
    ];
    return new Rectangle('rect-' + Date.now(), points);
  }
}
