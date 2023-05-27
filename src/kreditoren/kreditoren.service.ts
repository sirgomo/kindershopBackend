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
        return this.kreditorenRepository.find();
    }

    async findOne(id: number): Promise<KreditorenEntity> {
        return this.kreditorenRepository.findOne({ where: { id: id } });
    }

    async create(kreditoren: KreditorenEntity): Promise<KreditorenEntity> {
        return this.kreditorenRepository.save(kreditoren);
    }

    async update(id: number, kreditoren: KreditorenEntity): Promise<number> {
        return (await this.kreditorenRepository.update(id, kreditoren))
            .affected;
    }

    async delete(id: number): Promise<number> {
        return (await this.kreditorenRepository.delete(id)).affected;
    }
}
