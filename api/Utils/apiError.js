class apiError extends Error {

   constructor(statusCode, message = "something went wrong", error = [], stack = "") {

      super(message)
      this.statusCode = statusCode
      this.message = message
      this.error = error
      this.success = false;
      // this.error = error
      // this.stack=stack

      if (stack) {
         this.stack = stack
      } else {
         Error.captureStackTrace(this, this.constructor)
      }

   }

}

export { apiError }
