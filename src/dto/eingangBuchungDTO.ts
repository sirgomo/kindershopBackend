import { IsOptional, IsNumber, IsNotEmpty, IsString } from 'class-validator';
import { BuchungArtikelDTO } from './buchungArtikelDTO';
import { KreditorenDto } from './kreditorenDTO';

export class EingangBuchungDTO {
    @IsOptional()
    @IsNumber()
    buchung_id: number;

    @IsNotEmpty()
    @IsString()
    lieferschein_id: string;

    @IsNotEmpty()
    liefer_date: Date;

    @IsNotEmpty()
    buchung_date: Date;

    @IsOptional()
    @IsNumber()
    gebucht: number;

    @IsOptional()
    @IsNumber()
    korrigiertes_nr: number;

    @IsOptional()
    @IsString()
    korrigiertes_grund: string;

    @IsNotEmpty()
    kreditor: KreditorenDto;

    @IsNotEmpty()
    artikels: BuchungArtikelDTO[];
}
