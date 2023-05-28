import { IsInt, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class BuchungArtikelDTO {
    @IsInt()
    id: number;

    @IsInt()
    @IsNotEmpty()
    artikels_id: number;

    @IsInt()
    @IsNotEmpty()
    buchung_id: number;

    @IsInt()
    @IsNotEmpty()
    liferantid: number;

    @IsNumber()
    @IsPositive()
    price: number;

    @IsNumber()
    @IsPositive()
    mwst: number;

    @IsInt()
    @IsPositive()
    menge: number;
}
