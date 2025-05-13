export class CustomError extends Error {
  code: string;
  details: any;

  constructor(message: string, code: string, details: any = null) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.details = details;
    this.stack = new Error().stack;
  }
}
