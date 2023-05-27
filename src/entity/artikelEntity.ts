import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import { ArtikelCategory } from './artikelKategoryEntity';
import { WarenBuchenEnetity } from './warenBuchenEntity';

@Entity()
export class Artikel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;
    @Column('tinyint')
    mwst: number;

    @Column()
    brand: string;

    @Column()
    model: string;

    @Column()
    sku: string;

    @Column()
    ean: string;

    @Column()
    availability: string;

    @Column()
    weight: number;
    @Column()
    menge: number;

    @Column()
    dimensions: string;

    @Column('text')
    images: string;

    @Column('text')
    relatedProducts: string;

    @Column('text')
    reviews: string;

    @Column('decimal', { precision: 10, scale: 2 })
    rating: number;

    @ManyToMany(() => ArtikelCategory)
    @JoinTable()
    categories: ArtikelCategory[];
}
