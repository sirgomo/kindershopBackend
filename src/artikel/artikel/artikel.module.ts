import { Module } from '@nestjs/common';
import { ArtikelService } from './artikel.service';
import { ArtikelController } from './artikel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artikel } from 'src/entity/artikelEntity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [TypeOrmModule.forFeature([Artikel]), AuthModule],
    providers: [ArtikelService],
    controllers: [ArtikelController],
})
export class ArtikelModule {}
