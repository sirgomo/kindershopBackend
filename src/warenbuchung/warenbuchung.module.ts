import { Module } from '@nestjs/common';
import { WarenbuchungController } from './warenbuchung.controller';
import { WarenbuchungService } from './warenbuchung.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WarenBuchenEnetity } from 'src/entity/warenBuchenEntity';
import { AuthModule } from 'src/auth/auth.module';
import { BuchungArtikelEntity } from 'src/entity/buchungArtikelEntity';
import { Artikel } from 'src/entity/artikelEntity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            WarenBuchenEnetity,
            BuchungArtikelEntity,
            Artikel,
        ]),
        AuthModule,
    ],
    controllers: [WarenbuchungController],
    providers: [WarenbuchungService],
})
export class WarenbuchungModule {}
