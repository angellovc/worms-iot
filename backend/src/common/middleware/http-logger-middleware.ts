import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
    private logger = new Logger(`HTTP`);
    use(request: Request, response: Response, next: NextFunction) {
        const startTime = process.hrtime();
        const { ip, method, originalUrl } = request;
        this.logger.log(`HTTP request ${method} ${originalUrl} ${ip}`,);
        const userAgent = request.get('user-agent') || '';

        response.on('finish', () => {
            const { statusCode } = response;
            const contentLength = response.get('content-length');
            const diff = process.hrtime(startTime);
            const responseTime = diff[0] * 1e3 + diff[1] * 1e-6
            this.logger.log(
                `${method} ${originalUrl} ${statusCode} Response Time: ${responseTime}ms ${contentLength} - ${userAgent} ip: ${ip} bodyRequest: ${JSON.stringify(request.body)}}`,
            );
        });

        next();
    }
}