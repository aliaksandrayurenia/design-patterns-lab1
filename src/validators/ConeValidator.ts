
import { Point } from '../entities/Point';
import { Cone } from '../models/Cone';
export class ConeValidator {
    static isValid(line: string): boolean {
      const regex = /^\d+(\.\d+)? \d+(\.\d+)? \d+(\.\d+)?$/;
      return regex.test(line);
    }
  
    static parse(line: string): Cone {
      const nums = line.split(' ').map(Number);
      return new Cone('cone-' + Date.now(), new Point(nums[0], nums[1]), nums[2], nums[3]);
    }
  }
  