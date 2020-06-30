const { getMessage } = require('./messages')

const getValidatorError = (error, messagePath) => {
    if (!error) return null

    const errorMessages = {}
    error.details.map((detail) => {
        const message = error.details[0].message;
        const type = error.detail.type;
        const key = error.details[0].context.key;
        const path = `${messagePath}.${key}.${type}`;

        const customMessage = getMessage(path)
        if (!customMessage) {
            console.log('customMessage not found for path:', path)
        }
        errorMessages[key] = getMessage(path) || message
    })

    return errorMessages
}

module.exports = { getValidatorError, getMessage }