import { TJwtPayload } from './common';

declare global {
  namespace Express {
    interface Request {
      user?: TJwtPayload;
    }
  }
}
