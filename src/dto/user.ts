import { IsEmail, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class IUserDTO {
  @IsOptional()
  id?: number = 0;
  @IsEmail()
  @IsNotEmpty({ message: 'Email kann nicht leer sein' })
  email: string;
  @IsNotEmpty({ message: 'Password kann nicht leer sein' })
  password: string;
  @IsNotEmpty({ message: 'Vorname kann nicht leer sein' })
  vorname: string;
  @IsNotEmpty({ message: 'Nachname kann nicht leer sein' })
  nachname: string;
  @IsNotEmpty({ message: 'Straße kann nicht leer sein' })
  strasse: string;
  @IsNotEmpty({ message: 'Housenr. kann nicht leer sein' })
  hausnummer: string;
  @IsNotEmpty({ message: 'Postleitzahl kann nicht leer sein' })
  @IsNumber()
  plz: string;
  @IsNotEmpty({ message: 'Stadt kann nicht leer sein' })
  stadt: string;
  l_nachname?: string;
  l_strasse?: string;
  l_hausnummer?: string;
  l_plz?: string;
  l_stadt?: string;
  @IsOptional()
  role?: string;
}
