class HttpError extends Error {                           // We extends some properties from Error class 
  constructor(message,errorCode){
    super(message)
    this.code = errorCode
  }
}
module.exports = HttpError
