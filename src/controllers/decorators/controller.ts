import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';
import { AppRouter } from '../../AppRouter'
import { Methods } from './Methods';
import { MetadataKeys } from './MetadataKeys';

const router = AppRouter.getInstance();

function bodyValidators(keys: string[]) {
  return function(req: Request, res: Response, next: NextFunction) {
    if (!req.body) {
      res.status(422).send('Invalid request');
      return;
    }

    for (let key of keys) {
      if (!req.body[key]) {
        res.status(422).send(`Missing property ${key}`);
        return;
      }
    }
    next();
  }
}

export function controller (pathPrefix: string) {
  return function(target: Function) {
    for(let key in target.prototype) {
      const routeHandler = target.prototype[key];

      const path = Reflect.getMetadata(MetadataKeys.path, target.prototype, key);
      const method: Methods = Reflect.getMetadata(MetadataKeys.method, target.prototype, key);
      
      const middlewares = Reflect.getMetadata(MetadataKeys.middleware, target.prototype, key) || [];

      const requiredBodyProps = Reflect.getMetadata(MetadataKeys.validator, target.prototype, key) || [];

      const validator = bodyValidators(requiredBodyProps);

      if(path){
        router[method](`${pathPrefix}${path}`, ...middlewares, validator, routeHandler);
      }
    }
  }
}