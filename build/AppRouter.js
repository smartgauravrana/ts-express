"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRouter = void 0;
var express_1 = __importDefault(require("express"));
var AppRouter = /** @class */ (function () {
    function AppRouter() {
    }
    AppRouter.getInstance = function () {
        if (!AppRouter.router) {
            AppRouter.router = express_1.default.Router();
        }
        return AppRouter.router;
    };
    return AppRouter;
}());
exports.AppRouter = AppRouter;
