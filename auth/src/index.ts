import express from 'express';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
const app = express();

app.use(express.json());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.use(errorHandler);

app.listen(3000, () => {
    console.log('Listening on port 3000!!!!!');
});
/*

if (err instanceof RequestValidationError) {
    const formattedErrors = err.errors.map((error) => {
        if (error.type === 'field') {
            return { message: error.msg, field: error.path };
        }
    });
    return res.status(400).send({ errors: formattedErrors });
}

*/
