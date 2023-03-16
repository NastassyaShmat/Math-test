import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/users/entities/user.entity';

import { AuthService } from '../auth.service';

@Injectable()
export class TokenInterceptor implements NestInterceptor {
  constructor(private readonly authService: AuthService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<User>,
  ): Observable<any> {
    return next.handle().pipe(
      map((user) => {
        const reply = context.switchToHttp().getResponse();
        const token = this.authService.signToken(user);

        console.log(context.switchToHttp().getResponse());
        reply.header('Authorization', `Bearer ${token}`);
        reply.setCookie('token', token, {
          httpOnly: true,
          signed: true,
          sameSite: 'strict',
          secure: true,
        });

        return { ...user, token };
      }),
    );
  }
}
