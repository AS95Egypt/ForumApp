class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.success = !`${statusCode}`.startsWith(4);
    this.isOperational = true;
  }
}

module.exports = ApiError;
