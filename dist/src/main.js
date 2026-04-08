"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_js_1 = require("./app.module.js");
const response_interceptor_js_1 = require("./common/interceptors/response.interceptor.js");
const http_exception_filter_js_1 = require("./common/filters/http-exception.filter.js");
const LOCAL_DEV_ORIGINS = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://[::1]:3000',
    'http://localhost:3001',
    'http://127.0.0.1:3001',
    'http://[::1]:3001',
];
function resolveCorsOrigin() {
    const raw = process.env.CORS_ORIGINS?.trim();
    if (raw === '*')
        return true;
    if (raw)
        return raw.split(',').map((o) => o.trim()).filter(Boolean);
    if (process.env.NODE_ENV === 'production') {
        return [
            'https://mille-services.com',
            'https://www.mille-services.com',
            ...LOCAL_DEV_ORIGINS,
        ];
    }
    return true;
}
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_js_1.AppModule);
    app.useGlobalFilters(new http_exception_filter_js_1.HttpExceptionFilter());
    app.useGlobalInterceptors(new response_interceptor_js_1.ResponseInterceptor());
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.enableCors({
        origin: resolveCorsOrigin(),
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    });
    await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
//# sourceMappingURL=main.js.map