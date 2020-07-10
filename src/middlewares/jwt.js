const { verifyJwt } = require('../helpers/jwt')

const checkJwt = (req, res, next) => {

    const { url: path } = req

    const exclusedPaths = ['/auth/sign-in', '/auth/sign-up']
    const isExclused = !!exclusedPaths.find((p) => p.startsWith(path))
    if (isExclused) return next()


    let token = req.headers['authorization']
    token = token ? token.slice(7, token.length) : null
    if (!token) {
        return res.jsonUnauthorized(null, 'Invalid token')
    }

    try {
        const decoded = verifyJwt(token)
        req.accountId = decoded.id
        next()
    } catch (error) {
        return res.jsonUnauthorized(null, 'Invalid token')
    }
}

module.exports = checkJwt