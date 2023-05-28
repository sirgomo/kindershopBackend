import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common';
import { KreditorenEntity } from 'src/entity/kreditorenEntity';
import { KreditorenService } from './kreditoren.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('kreditoren')
@UseGuards(AuthGuard('jwt'))
export class KreditorenController {
    constructor(private readonly kreditorenService: KreditorenService) {}

    @Get()
    async findAll(): Promise<KreditorenEntity[]> {
        return this.kreditorenService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<KreditorenEntity> {
        return this.kreditorenService.findOne(id);
    }

    @Post()
    async create(
        @Body() kreditoren: KreditorenEntity,
    ): Promise<KreditorenEntity> {
        return this.kreditorenService.create(kreditoren);
    }

    @Patch(':id')
    async update(
        @Param('id') id: number,
        @Body() kreditoren: KreditorenEntity,
    ): Promise<number> {
        return this.kreditorenService.update(id, kreditoren);
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<number> {
        return this.kreditorenService.delete(id);
    }
}
