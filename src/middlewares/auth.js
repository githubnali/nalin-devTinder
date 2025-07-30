const adminAuth = (req, resp, next) => {
    console.log("Admin Auth Checking");
    const token = 'nali';

    const isAdminAuth = token === 'nali';
    if(!isAdminAuth) {
        resp.status(401).send('Unauthorized User');
    }  else {
        next();
    }
}

const userAuth = (req, resp, next) => {
    console.log("User Auth Checking");
    const token = 'nali';

    const isAdminAuth = token === 'nali';
    if(!isAdminAuth) {
        resp.status(401).send('Unauthorized User');
    }  else {
        next();
    }
}

module.exports = {adminAuth, userAuth}