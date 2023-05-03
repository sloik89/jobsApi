const CustomApiError = require("./custom-error");
const { StatusCodes } = require("http-status-codes");
class UnauthenicatedError extends CustomApiError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = UnauthenicatedError;
