import {
    IsNotEmpty,
    IsNumber,
    IsString,
    Length,
    Matches,
} from 'class-validator';

export class KreditorenDto {
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsString()
    @Length(5, 10)
    kreditorennummer: string;

    @IsNotEmpty()
    @IsString()
    @Length(3, 50)
    kreditorenname: string;

    @IsNotEmpty()
    @IsString()
    @Length(5, 50)
    anschrift: string;

    @IsString()
    @Matches(/^\d{10}$/)
    telefonnummer: string;

    @IsString()
    @Matches(/^\d{10}$/)
    faxnummer: string;

    @IsString()
    @Matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    email: string;

    @IsNotEmpty()
    @IsString()
    @Length(3, 50)
    bankname: string;

    @IsNotEmpty()
    @IsString()
    @Length(14, 22)
    iban: string;

    @IsNotEmpty()
    @IsString()
    @Length(4, 11)
    bic: string;

    @IsString()
    zahlungsbedingungen: string;

    @IsString()
    @Length(10, 15)
    steuernummer: string;

    @IsString()
    @Length(10, 15)
    ust_idnr: string;

    @IsString()
    @Length(3, 50)
    land: string;
}
