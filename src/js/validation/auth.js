import express from 'express';
import setup from '../setup/api';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

let router = express.Router();
const secretToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImp0aSI6IjEiLCJuYmYiOjE1MzMwMjE5MzYsImV4cCI6MTUzMzAyNTUzNiwiaWF0IjoxNTMzMDIxOTM2fQ.GTSZ6oSatI6hL0YwJk8Xctg-68rYrix4ZD8R8XPt58Y';

router.post('/login', (request, response) => {
    const {userName, password } = request.body;

    setup.getUser(setup.BASE_URL + setup.getUser + '/' + id)
    .then(user => {
        if (user) {
            const token = jwt.sign({
                id: user.get('id'),
                userName: user.get('userName')
              }, config.jwtSecret);
        res.json({ token });
        }
        else{
            response.status(401).json({ errors: { form: 'Invalid Credentials' } });
        }
    })
})
export default router;
