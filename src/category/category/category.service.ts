import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryDTO } from 'src/dto/categoryDTO';
import { ArtikelCategory } from 'src/entity/artikelKategoryEntity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(ArtikelCategory)
    private catRepo: Repository<ArtikelCategory>,
  ) {}

  async create(category: CategoryDTO): Promise<ArtikelCategory> {
    try {
      await this.catRepo.create(category);
      return await this.catRepo.save(category);
    } catch (error) {
      throw new Error(`Error creating category: ${error.message}`);
    }
  }

  async update(
    id: number,
    category: ArtikelCategory,
  ): Promise<ArtikelCategory> {
    try {
      await this.catRepo.update(id, category);
      return await this.catRepo.findOne({ where: { id: id } });
    } catch (error) {
      throw new Error(`Error updating category: ${error.message}`);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.catRepo.delete(id);
    } catch (error) {
      throw new Error(`Error deleting category: ${error.message}`);
    }
  }

  async findAll(): Promise<ArtikelCategory[]> {
    try {
      return await this.catRepo.find();
    } catch (error) {
      throw new Error(`Error finding categories: ${error.message}`);
    }
  }
}
