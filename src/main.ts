import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DataBase } from './database/data';

async function bootstrap() {
    const data = new DataBase();
    data.checkData();
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    app.enableCors({
        origin: 'http://localhost:4200',
        methods: 'GET,PUT,POST,DELETE,UPDATE,PATCH',
    });
    await app.listen(3000);
}
bootstrap();
