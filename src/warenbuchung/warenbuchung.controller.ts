import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { EingangBuchungDTO } from 'src/dto/eingangBuchungDTO';
import { WarenbuchungService } from './warenbuchung.service';
import { BuchungArtikelDTO } from 'src/dto/buchungArtikelDTO';

@Controller('warenbuchung')
@UseGuards(AuthGuard('jwt'))
export class WarenbuchungController {
    constructor(private readonly warenbuchungService: WarenbuchungService) {}

    @Get()
    async getBuchung() {
        return await this.warenbuchungService.getBuchung();
    }
    @Get(':id')
    async getBuchungBeiId(@Param('id') id: number) {
        return await this.warenbuchungService.getBuchungById(id);
    }
    @Post()
    async createBuchung(@Body() buchung: EingangBuchungDTO) {
        return await this.warenbuchungService.createBuchung(buchung);
    }

    @Patch()
    async editBuchung(@Body() buchung: EingangBuchungDTO) {
        return await this.warenbuchungService.editBuchung(buchung);
    }
    @Post('art')
    async addArtikelToBuchung(@Body() artikel: BuchungArtikelDTO) {
        return await this.warenbuchungService.addArtikelToBuchung(artikel);
    }
}
