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
import { BestellungEntity } from './entity/bestellungEntity';
import { KreditorenModule } from './kreditoren/kreditoren.module';
import { WarenbuchungModule } from './warenbuchung/warenbuchung.module';
import { WarenBuchenEnetity } from './entity/warenBuchenEntity';
import { KreditorenEntity } from './entity/kreditorenEntity';
import { BuchungArtikelEntity } from './entity/buchungArtikelEntity';
import { ConfigModule } from '@nestjs/config';
import { env } from 'environments/environments';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: env.ENV_HOST,
            port: env.ENV_PORT,
            username: env.ENV_USER,
            password: env.ENV_PASS,
            database: env.ENV_DATABASE,
            entities: [
                UserEntity,
                Artikel,
                ArtikelCategory,
                BestellungEntity,
                KreditorenEntity,
                WarenBuchenEnetity,
                BuchungArtikelEntity,
            ],
            synchronize: false,
        }),
        UserModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '1h' },
        }),
        AuthModule,
        CategoryModule,
        ArtikelModule,
        BestellungenModule,
        KreditorenModule,
        WarenbuchungModule,
        ConfigModule.forRoot({
            ignoreEnvFile: true,
            envFilePath: '.environments/environments.env',
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService],
})
export class AppModule {}
