import { IsEmail, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UserDTO {
    @IsOptional()
    readonly id?: number = 0;
    @IsEmail()
    @IsNotEmpty({ message: 'Email kann nicht leer sein' })
    readonly email: string;
    @IsNotEmpty({ message: 'Password kann nicht leer sein' })
    readonly password: string;
    @IsNotEmpty({ message: 'Vorname kann nicht leer sein' })
    readonly vorname: string;
    @IsNotEmpty({ message: 'Nachname kann nicht leer sein' })
    readonly nachname: string;
    @IsNotEmpty({ message: 'Straße kann nicht leer sein' })
    readonly strasse: string;
    @IsNotEmpty({ message: 'Housenr. kann nicht leer sein' })
    readonly hausnummer: string;
    @IsNotEmpty({ message: 'Postleitzahl kann nicht leer sein' })
    @IsNumber()
    readonly plz: string;
    @IsNotEmpty({ message: 'Stadt kann nicht leer sein' })
    readonly stadt: string;
    readonly l_nachname?: string;
    readonly l_strasse?: string;
    readonly l_hausnummer?: string;
    readonly l_plz?: string;
    readonly l_stadt?: string;
    @IsOptional()
    role?: string;
}
