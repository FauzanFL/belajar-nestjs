import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor (private jwtService: JwtService){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request: Request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request)
        if (!token) {
            throw new UnauthorizedException('Invalid token');
        }
        
        try {
            this.jwtService.verify(token)
        } catch(e) {
            Logger.error(e.message)
            throw new UnauthorizedException('Invalid token');
        }

        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        return request.headers.authorization?.split(' ')[1];
    }
}