/* istanbul ignore file */

type Payload = {
  [key: string]: string;
};

export class ValidationError extends Error {
  constructor(public payload: Payload) {
    super();
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}
