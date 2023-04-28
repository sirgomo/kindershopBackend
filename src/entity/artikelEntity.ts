import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import { ArtikelCategory } from './artikelKategoryEntity';

@Entity()
export class Artikel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    price: number;

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
    dimensions: string;

    @Column('text')
    images: string;

    @Column('text')
    relatedProducts: string;

    @Column('text')
    reviews: string;

    @Column()
    rating: number;

    @ManyToMany(() => ArtikelCategory)
    @JoinTable()
    categories: ArtikelCategory[];
}
