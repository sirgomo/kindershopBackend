import { Injectable, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtikelDTO } from 'src/dto/artikelDTO';
import { Artikel } from 'src/entity/artikelEntity';
import { ArtikelCategory } from 'src/entity/artikelKategoryEntity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtikelService {
    constructor(
        @InjectRepository(Artikel)
        private readonly artikelRepository: Repository<Artikel>,
    ) {}

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
    async create(artikel: ArtikelDTO): Promise<Artikel> {
        try {
            const art = await this.artikelRepository.create(artikel);
            console.log(art);
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
            await this.artikelRepository.save(artikel);

            return 1;
        } catch (error) {
            throw new Error(
                `Error while updating article with id ${id}: ${error}`,
            );
        }
    }
    @UseGuards(AuthGuard())
    async delete(id: number): Promise<number> {
        try {
            return (await this.artikelRepository.delete(id)).affected;
        } catch (error) {
            throw new Error(
                `Error while deleting article with id ${id}: ${error.message}`,
            );
        }
    }
}
