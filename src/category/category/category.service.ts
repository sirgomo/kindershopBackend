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

    /**
     * Creates a new article category in the database.
     * @param category The category data to be created.
     * @returns The created category.
     */
    async create(category: CategoryDTO): Promise<ArtikelCategory> {
        try {
            await this.catRepo.create(category);
            return await this.catRepo.save(category);
        } catch (error) {
            throw new Error(`Error creating category: ${error.message}`);
        }
    }

    /**
     * Updates an existing article category in the database.
     * @param id The id of the category to be updated.
     * @param category The updated category data.
     * @returns The number of affected rows in the database.
     */
    async update(id: number, category: ArtikelCategory): Promise<number> {
        try {
            return await (
                await this.catRepo.update(id, category)
            ).affected;
        } catch (error) {
            throw new Error(`Error updating category: ${error.message}`);
        }
    }

    /**
     * Deletes an article category from the database.
     * @param id The id of the category to be deleted.
     * @returns The number of affected rows in the database.
     */
    async delete(id: number): Promise<number> {
        try {
            return await (
                await this.catRepo.delete(id)
            ).affected;
        } catch (error) {
            throw new Error(`Error deleting category: ${error.message}`);
        }
    }

    /**
     * Finds all article categories in the database.
     * @returns An array of all article categories.
     */
    async findAll(): Promise<ArtikelCategory[]> {
        try {
            return await this.catRepo.find();
        } catch (error) {
            throw new Error(`Error finding categories: ${error.message}`);
        }
    }
}
