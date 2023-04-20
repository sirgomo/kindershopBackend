import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/auth/role/role.guard';
import { Artikel } from 'src/entity/artikelEntity';
import { ArtikelService } from './artikel.service';

@Controller('artikel')
export class ArtikelController {
  constructor(private readonly artikelService: ArtikelService) {}

  @Get()
  async findAll(): Promise<Artikel[]> {
    return await this.artikelService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Artikel> {
    return await this.artikelService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  async create(@Body() artikel: Artikel): Promise<Artikel> {
    return await this.artikelService.create(artikel);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  async update(
    @Param('id') id: number,
    @Body() artikel: Artikel,
  ): Promise<Artikel> {
    return await this.artikelService.update(id, artikel);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  async delete(@Param('id') id: number): Promise<void> {
    return await this.artikelService.delete(id);
  }
}
