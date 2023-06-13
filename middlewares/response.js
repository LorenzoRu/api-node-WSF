function jsonRes(message, data = null, errors = null, status = 200) {
    const response = {
        message: message,
        data: data,
    }
  
    if (errors != null)
        response.errors = errors
   
    this
        .status(status)
        .json(response)
  }
  
  module.exports = { jsonRes }