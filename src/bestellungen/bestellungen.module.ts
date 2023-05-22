import { Module } from '@nestjs/common';
import { BestellungenService } from './bestellungen.service';
import { BestellungenController } from './bestellungen.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BestellungEntity } from 'src/entity/bestellungEntity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [TypeOrmModule.forFeature([BestellungEntity]), AuthModule],
    providers: [BestellungenService],
    controllers: [BestellungenController],
})
export class BestellungenModule {}
