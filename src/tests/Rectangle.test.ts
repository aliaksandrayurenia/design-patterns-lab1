import { Rectangle } from "../entities/Rectangle";
import { Point } from '../entities/Point';

describe('Rectangle', () => {
  it('calculates area correctly', () => {
    // given
    const rect = new Rectangle('r1', [
      new Point(0, 0),
      new Point(0, 2),
      new Point(3, 2),
      new Point(3, 0)
    ]);

    // when
    const area = rect.getArea();

    // then
    expect(area).toBe(6);
  });

  it('calculates perimeter correctly', () => {
    // given
    const rect = new Rectangle('r1', [
      new Point(0, 0),
      new Point(0, 2),
      new Point(3, 2),
      new Point(3, 0)
    ]);

    // when
    const perimeter = rect.getPerimeter();

    // then
    expect(perimeter).toBe(10);
  });
});
