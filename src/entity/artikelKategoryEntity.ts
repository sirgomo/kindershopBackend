import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import { Artikel } from './artikelEntity';

@Entity()
export class ArtikelCategory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => Artikel)
    @JoinTable()
    articles: Artikel[];
}
