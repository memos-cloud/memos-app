import { MiddlewareConsumer, NestModule } from '@nestjs/common';
export declare class MiddlewareModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void;
}
