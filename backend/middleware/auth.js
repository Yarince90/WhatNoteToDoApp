const jwt = require('jsonwebtoken');
const HttpError = require('./models/http-errors');

module.exports = (req, res, next) => {
    //Check if user is logged in before saving any notes or to do items to account
    if (req.method === 'OPTIONS') {
        return next();
      }
      try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
          throw new Error('Authentication failed!');
        }
        const decodedToken = jwt.verify(token, 'SuperSecretCode_DO_NOT_SHARE');
        req.userData = { userId: decodedToken.userId };
        next();
      } catch (err) {
        const error = new HttpError('Authentication failed!', 403);
        return next(error);
      }
}

