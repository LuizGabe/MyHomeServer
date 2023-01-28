const red = '\x1b[31m'
const green = '\x1b[32m'
const yellow = '\x1b[33m'

const reset = '\x1b[0m'

class Logger {

  logError(error, file) {
    console.log(red, `[ERROR] in ${file}: ${error}`, reset)
  }

  logWarning(warning, file) {
    console.warn(yellow, `[WARNING] in ${file}: ${warning}`, reset)
  }

  logInfo(info, file) {
    console.info(` [INFO] in ${file}: ${info}`)
  }

  logSuccess(success, file) {
    console.log(green, `[SUCCESS] in ${file}: ${success}`, reset)
  
  }
}




export default Logger
