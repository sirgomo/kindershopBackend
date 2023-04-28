import { Injectable, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Artikel } from 'src/entity/artikelEntity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtikelService {
    constructor(
        @InjectRepository(Artikel)
        private readonly artikelRepository: Repository<Artikel>,
    ) {}

    async findAll(): Promise<Artikel[]> {
        try {
            return await this.artikelRepository.find();
        } catch (error) {
            throw new Error(
                `Error while fetching all articles: ${error.message}`,
            );
        }
    }

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
    @UseGuards(AuthGuard())
    async create(artikel: Artikel): Promise<Artikel> {
        try {
            return await this.artikelRepository.save(artikel);
        } catch (error) {
            throw new Error(`Error while creating article: ${error.message}`);
        }
    }
    @UseGuards(AuthGuard())
    async update(id: number, artikel: Artikel): Promise<Artikel> {
        try {
            await this.artikelRepository.update(id, artikel);
            return await this.artikelRepository.findOneOrFail({
                where: { id: id },
            });
        } catch (error) {
            throw new Error(
                `Error while updating article with id ${id}: ${error.message}`,
            );
        }
    }
    @UseGuards(AuthGuard())
    async delete(id: number): Promise<void> {
        try {
            await this.artikelRepository.delete(id);
        } catch (error) {
            throw new Error(
                `Error while deleting article with id ${id}: ${error.message}`,
            );
        }
    }
}
