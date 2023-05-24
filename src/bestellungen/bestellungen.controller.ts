import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import { BestellungenService } from './bestellungen.service';
import { AuthGuard } from '@nestjs/passport';
import { iKorbItemDTO } from 'src/dto/itemInKorbDTO';

@Controller('bestellungen')
export class BestellungenController {
    constructor(private readonly bestService: BestellungenService) {}

    @Get()
    @UseGuards(AuthGuard('jwt'))
    async getBestellungen(
        @Query('menge') menge: number,
        @Query('sitenr') sitenr: number,
    ) {
        return await this.bestService.getBestellungen(menge, sitenr);
    }

    @Get('email/:email')
    @UseGuards(AuthGuard('jwt'))
    async getBestellungenBeiEmail(@Param('email') email: string) {
        return await this.bestService.getBestelungenBeiEmail(email);
    }

    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    async getBestellungenBeiId(@Param('id') bestellungid: number) {
        return await this.bestService.getBestelungenBeiId(bestellungid);
    }

    @Post()
    async checkBestellung(
        @Body('user') user: any,
        @Body('items') items: iKorbItemDTO[],
    ) {
        return await this.bestService.checkBestellung(user, items);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    async deleteBestellung(@Param('id') bestellungid: number) {
        return await this.bestService.deleteBestellung(bestellungid);
    }
}
