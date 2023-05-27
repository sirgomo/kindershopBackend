import { Module } from '@nestjs/common';
import { WarenbuchungController } from './warenbuchung.controller';
import { WarenbuchungService } from './warenbuchung.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WarenBuchenEnetity } from 'src/entity/warenBuchenEntity';
import { AuthModule } from 'src/auth/auth.module';
import { BuchungArtikelEntity } from 'src/entity/buchungArtikelEntity';

@Module({
    imports: [
        TypeOrmModule.forFeature([WarenBuchenEnetity, BuchungArtikelEntity]),
        AuthModule,
    ],
    controllers: [WarenbuchungController],
    providers: [WarenbuchungService],
})
export class WarenbuchungModule {}
