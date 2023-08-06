import jwt from 'jsonwebtoken';

const secret = 'tempSecret';
const expiration = 30;

const authMiddleware = ({ req }) => {
    let authToken = req.body.token || req.query.token || req.headers.authorization;

    // console.log(authToken)

    if (req.headers.authorization) {
        authToken = authToken.split(' ').pop().trim();
    };

    if (!authToken) {
        return req;
    };

    try {
        const { data } = jwt.verify(authToken, secret, { maxAge: expiration });
        req.user = data;
    } catch (error) {
        console.log('Auth Token Error ' + error);
    };

    return req;
};

const signAuthToken = ({ username, _id }) => {
    const payload = { username, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};

export {
    authMiddleware,
    signAuthToken
};