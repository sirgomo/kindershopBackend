import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';
import { AuthController } from './auth/auth.controller';
import { JwtStrategy } from './auth/auth.jwtAuthGuard';
import { UserEntity } from './entity/userEntity';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { Artikel } from './entity/artikelEntity';
import { ArtikelCategory } from './entity/artikelKategoryEntity';
import { CategoryModule } from './category/category/category.module';
import { ArtikelModule } from './artikel/artikel/artikel.module';
import { BestellungenModule } from './bestellungen/bestellungen.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: '192.168.0.11',
            port: 3306,
            username: 'root',
            password: 'beta1243',
            database: 'kindershop',
            entities: [UserEntity, Artikel, ArtikelCategory],
            synchronize: false,
        }),
        UserModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '1h' },
        }),
        AuthModule,
        CategoryModule,
        ArtikelModule,
        BestellungenModule,
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService],
})
export class AppModule {}
