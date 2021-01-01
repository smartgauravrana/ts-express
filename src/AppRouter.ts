import express from 'express';

export class AppRouter {
   private static router: express.Router;

   static getInstance(): express.Router {
     if(!AppRouter.router){
       AppRouter.router = express.Router();
     }
     return AppRouter.router;
   }

}