import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { EingangBuchungDTO } from 'src/dto/eingangBuchungDTO';
import { WarenbuchungService } from './warenbuchung.service';

@Controller('warenbuchung')
@UseGuards(AuthGuard('jwt'))
export class WarenbuchungController {
    constructor(private readonly warenbuchungService: WarenbuchungService) {}

    @Get()
    async getBuchung() {
        return await this.warenbuchungService.getBuchung();
    }

    @Post()
    async createBuchung(@Body() buchung: EingangBuchungDTO) {
        return await this.warenbuchungService.createBuchung(buchung);
    }

    @Patch()
    async editBuchung(@Body() buchung: EingangBuchungDTO) {
        return await this.warenbuchungService.editBuchung(buchung);
    }
}
