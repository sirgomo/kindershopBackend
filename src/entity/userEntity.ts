import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn({ type: 'uniqueidentifier' })
  email: string;
  @Column()
  password: string;
  @Column()
  vorname: string;

  @Column()
  nachname: string;

  @Column()
  strasse: string;

  @Column()
  hausnummer: string;

  @Column()
  plz: string;

  @Column()
  stadt: string;

  @Column()
  l_nachname: string;

  @Column()
  l_strasse: string;

  @Column()
  l_hausnummer: string;

  @Column()
  l_plz: string;

  @Column()
  l_stadt: string;
}
