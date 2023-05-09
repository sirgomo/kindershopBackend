import { Injectable, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtikelDTO } from 'src/dto/artikelDTO';
import { Artikel } from 'src/entity/artikelEntity';
import { ArtikelCategory } from 'src/entity/artikelKategoryEntity';
import { Repository } from 'typeorm';
import * as fs from 'fs';

@Injectable()
export class ArtikelService {
    constructor(
        @InjectRepository(Artikel)
        private readonly artikelRepository: Repository<Artikel>,
    ) {}

    /**
     * Fetches all articles from the database with their related categories.
     * @returns {Promise<Artikel[]>} - Array of Artikel objects with related categories.
     * @throws {Error} - If there is an error while fetching the articles.
     */
    async findAll(): Promise<Artikel[]> {
        try {
            return await this.artikelRepository.find({
                relations: {
                    categories: true,
                },
            });
        } catch (error) {
            throw new Error(
                `Error while fetching all articles: ${error.message}`,
            );
        }
    }

    /**
     * Fetches an article from the database with its id.
     * @param {number} id - The id of the article to fetch.
     * @returns {Promise<Artikel>} - The Artikel object with the given id.
     * @throws {Error} - If there is an error while fetching the article.
     */
    async findOne(id: number): Promise<Artikel> {
        try {
            return await this.artikelRepository.findOneOrFail({
                where: { id: id },
            });
        } catch (error) {
            throw new Error(
                `Error while fetching article with id ${id}: ${error.message}`,
            );
        }
    }

    /**
     * Creates a new article in the database.
     * @param {ArtikelDTO} artikel - The ArtikelDTO object representing the new article.
     * @returns {Promise<Artikel>} - The newly created Artikel object.
     * @throws {Error} - If there is an error while creating the article.
     */
    @UseGuards(AuthGuard())
    async create(artikel: ArtikelDTO): Promise<Artikel> {
        try {
            const art = await this.artikelRepository.create(artikel);
            return await this.artikelRepository.save(art).then(
                (res) => {
                    return res;
                },
                (err) => {
                    console.log(err);
                    return err;
                },
            );
        } catch (error) {
            throw new Error(`Error while creating article: ${error}`);
        }
    }

    /**
     * Updates an article in the database with the given id and fields.
     * @param {number} id - The id of the article to update.
     * @param {Artikel} artikel - The Artikel object with the updated fields.
     * @returns {Promise<number>} - 1 if the update was successful.
     * @throws {Error} - If there is an error while updating the article.
     */
    @UseGuards(AuthGuard())
    async update(id: number, artikel: Artikel): Promise<number> {
        try {
            const cat: ArtikelCategory[] = await this.artikelRepository
                .query(
                    `SELECT * from artikel_category where id=` +
                        artikel.categories[0].id,
                )
                .catch((err) => {
                    console.log(err);
                });

            artikel.categories = cat;
            console.log(artikel);
            await this.artikelRepository.save(artikel);

            return 1;
        } catch (error) {
            throw new Error(
                `Error while updating article with id ${id}: ${error}`,
            );
        }
    }

    /**
     * Deletes an article from the database with the given id.
     * @param {number} id - The id of the article to delete.
     * @returns {Promise<number>} - The number of affected rows (should be 1 if successful).
     * @throws {Error} - If there is an error while deleting the article.
     */
    @UseGuards(AuthGuard())
    async delete(id: number): Promise<number> {
        try {
            const art = await this.artikelRepository.findOne({
                where: { id: id },
            });
            this.deleteImage(art.images);
            return (await this.artikelRepository.delete(id)).affected;
        } catch (error) {
            throw new Error(
                `Error while deleting article with id ${id}: ${error.message}`,
            );
        }
    }

    /**
     * Deletes the image file associated with an article.
     * @param {string} imageId - The id of the image file to delete.
     * @returns {Promise<void>}
     */
    private async deleteImage(imageId: string): Promise<void> {
        try {
            await fs.unlink('./bilder/' + imageId, (err) => {
                console.log(err);
            });
            await fs.unlink('./thumbnail/' + imageId, (err) => {
                console.log(err);
            });
        } catch (err) {
            console.log(err);
        }
    }
}
