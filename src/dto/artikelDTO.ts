import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { CategoryDTO } from './categoryDTO';
import { ArtikelCategory } from 'src/entity/artikelKategoryEntity';

export class ArtikelDTO {
    @IsOptional()
    id: number;
    @IsNotEmpty({ message: 'Darf nicht leer sein' })
    name: string;
    @IsNotEmpty({ message: 'Darf nicht leer sein' })
    description: string;
    @IsNotEmpty({ message: 'Darf nicht leer sein' })
    @IsNumber()
    price: number;
    @IsNumber()
    mwst: number;
    @IsNotEmpty({ message: 'Darf nicht leer sein' })
    brand: string;
    @IsNotEmpty({ message: 'Darf nicht leer sein' })
    model: string;
    @IsNotEmpty({ message: 'Darf nicht leer sein' })
    sku: string;
    @IsNotEmpty({ message: 'Darf nicht leer sein' })
    ean: string;
    @IsNotEmpty({ message: 'Darf nicht leer sein' })
    availability: string;
    @IsNotEmpty({ message: 'Darf nicht leer sein' })
    @IsNumber()
    weight: number;
    @IsOptional()
    menge: number;
    @IsNotEmpty({ message: 'Darf nicht leer sein' })
    dimensions: string;
    @IsNotEmpty({ message: 'Darf nicht leer sein' })
    images: string;
    @IsNotEmpty({ message: 'Darf nicht leer sein' })
    relatedProducts: string;
    @IsNotEmpty({ message: 'Darf nicht leer sein' })
    reviews: string;
    @IsNotEmpty({ message: 'Darf nicht leer sein' })
    @IsNumber()
    rating: number;
    @IsNotEmpty({ message: 'Darf nicht leer sein' })
    categories: ArtikelCategory[];
}
