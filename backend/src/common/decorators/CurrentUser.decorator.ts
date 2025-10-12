import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PayloadDTO } from 'src/dto/token-payload-dto/token-payload.dto';
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): PayloadDTO => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;  
  },
);