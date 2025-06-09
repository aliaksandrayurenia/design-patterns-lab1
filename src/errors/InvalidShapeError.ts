export class InvalidShapeError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'InvalidShapeError';
    }
  }
  