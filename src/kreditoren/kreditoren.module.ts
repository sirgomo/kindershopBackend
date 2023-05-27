import { Module } from '@nestjs/common';
import { KreditorenController } from './kreditoren.controller';
import { KreditorenService } from './kreditoren.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KreditorenEntity } from 'src/entity/kreditorenEntity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [TypeOrmModule.forFeature([KreditorenEntity]), AuthModule],
    controllers: [KreditorenController],
    providers: [KreditorenService],
})
export class KreditorenModule {}
