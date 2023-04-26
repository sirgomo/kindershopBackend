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
import { CategoryDTO } from 'src/dto/categoryDTO';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAll(): Promise<ArtikelCategory[]> {
    return await this.categoryService.findAll();
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  async create(@Body() category: CategoryDTO): Promise<ArtikelCategory> {
    return await this.categoryService.create(category);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  async update(
    @Param('id') id: number,
    @Body() category: ArtikelCategory,
  ): Promise<number> {
    return await this.categoryService.update(id, category);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  async delete(@Param('id') id: number): Promise<number> {
    return await this.categoryService.delete(id);
  }
}
