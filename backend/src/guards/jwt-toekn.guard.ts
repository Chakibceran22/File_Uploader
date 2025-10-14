import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PayloadDTO } from 'src/dto/token-payload-dto/token-payload.dto';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    
    // Get token from header
    const token = this.extractTokenFromHeader(request);
    
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      // Verify YOUR JWT with YOUR secret
      const payload: PayloadDTO = this.jwtService.verify(token);
      
      // Attach user to request so you can use it in your endpoint
      request.user = payload;
      
      return true; // Allow request to proceed
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const authHeader = request.headers.authorization;
    if (!authHeader) return undefined;
    
    // Expects: "Bearer <token>"
    const [type, token] = authHeader.split(' ');
    return type === 'Bearer' ? token : undefined;
  }
}