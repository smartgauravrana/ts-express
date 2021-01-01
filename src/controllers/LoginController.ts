import { NextFunction, Request, Response } from "express";
import { get, post, use, controller, bodyValidator } from './decorators';

function logger(req: Request, res: Response, next: NextFunction) {
  console.log('Request was made');
  next();
}

function logger2(req: Request, res: Response, next: NextFunction) {
  console.log('2nd Logger Request was made');
  next();
}

@controller('/auth')
class LoginController {
  
  @get('/login')
  @use(logger)
  @use(logger2)
  getLogin(req: Request, res: Response ) {
    res.send(`
    <form method="POST">
      <div>
        <label>Email</label>
        <input name="email" />
      </div>
      <div>
        <label>Password</label>
        <input name="password" type="password" />
      </div>
      <button>Submit</button>
    </form>
  `);
  }

  @post('/login')
  @use(logger2)
  @bodyValidator('email', 'password')
  postLogin(req: Request, res: Response) {
    const {email, password } = req.body;
    if (email && password && email === 'hi@hi.com' && password === 'password') {
      req.session = { loggedIn: true };
      res.redirect('/');
    } else {
      res.send('Invalid email or password');
    }
  }
}