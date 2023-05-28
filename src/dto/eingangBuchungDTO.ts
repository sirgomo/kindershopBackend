import {
    IsOptional,
    IsNumber,
    IsNotEmpty,
    IsString,
    IsDate,
} from 'class-validator';
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
    @IsDate()
    liefer_date: Date;

    @IsNotEmpty()
    @IsDate()
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
    @IsNumber()
    kreditor: KreditorenDto;

    @IsNotEmpty()
    artikels: BuchungArtikelDTO[];
}
