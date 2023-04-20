import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ArtikelCategory } from 'src/entity/artikelKategoryEntity';
import { CategoryService } from './category.service';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/auth/role/role.guard';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAll(): Promise<ArtikelCategory[]> {
    return await this.categoryService.findAll();
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  async create(@Body() category: ArtikelCategory): Promise<ArtikelCategory> {
    return await this.categoryService.create(category);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  async update(
    @Param('id') id: number,
    @Body() category: ArtikelCategory,
  ): Promise<ArtikelCategory> {
    return await this.categoryService.update(id, category);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  async delete(@Param('id') id: number): Promise<void> {
    return await this.categoryService.delete(id);
  }
}
