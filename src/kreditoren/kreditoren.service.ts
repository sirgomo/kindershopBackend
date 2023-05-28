import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { KreditorenEntity } from 'src/entity/kreditorenEntity';
import { Repository } from 'typeorm';

@Injectable()
export class KreditorenService {
    constructor(
        @InjectRepository(KreditorenEntity)
        private readonly kreditorenRepository: Repository<KreditorenEntity>,
    ) {}

    async findAll(): Promise<KreditorenEntity[]> {
        try {
            return this.kreditorenRepository.find();
        } catch (err) {
            return err;
        }
    }

    async findOne(id: number): Promise<KreditorenEntity> {
        try {
            return this.kreditorenRepository.findOne({ where: { id: id } });
        } catch (err) {
            return err;
        }
    }

    async create(kreditoren: KreditorenEntity): Promise<KreditorenEntity> {
        try {
            return this.kreditorenRepository.save(kreditoren);
        } catch (err) {
            return err;
        }
    }

    async update(id: number, kreditoren: KreditorenEntity): Promise<number> {
        try {
            return (await this.kreditorenRepository.update(id, kreditoren))
                .affected;
        } catch (err) {
            return err;
        }
    }

    async delete(id: number): Promise<number> {
        try {
            return (await this.kreditorenRepository.delete(id)).affected;
        } catch (err) {
            return err;
        }
    }
}
