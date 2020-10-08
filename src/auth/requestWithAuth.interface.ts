import { Request } from 'express';


interface RequestWithAuth extends Request {
  Authentication: string;
}

export default RequestWithAuth;
