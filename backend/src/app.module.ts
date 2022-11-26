import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MetricsModule } from './metrics/metrics.module';
import { DatabaseModule } from './database/database.module';
import { AgentModule } from './agents/agent.module';
import { EventsModule } from './events/events.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { LimitModule } from './limits/limit.module';
import { IncidentModule } from './incidents/incident.module';
import { MailModule } from './mail/mail.module';
import ConfigModule from './config/config.module';
import { HttpLoggerMiddleware } from './common/middleware/http-logger-middleware';

@Module({
  imports: [MetricsModule, DatabaseModule, ConfigModule, AgentModule, EventsModule, AuthModule, UserModule, LimitModule, IncidentModule, MailModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(HttpLoggerMiddleware).forRoutes('*');
      }
}
