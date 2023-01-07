import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import getSession from './getSession';

@Injectable()
export class MidechileGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const { authorization } = context.switchToHttp().getRequest().headers
    console.log(authorization)
    if (!authorization) {
      return false;
    }

    const token = authorization.split(" ")[1];

    return getSession(token)
      .then(data => {
        context.switchToHttp().getRequest().user = data;
        console.log(data)
        return true
      })
      .catch((e) => {
        return false;
      });

    
  }
}
