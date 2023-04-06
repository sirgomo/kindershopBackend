import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
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

  @Column({ nullable: true })
  l_nachname: string;

  @Column({ nullable: true })
  l_strasse: string;

  @Column({ nullable: true })
  l_hausnummer: string;

  @Column({ nullable: true })
  l_plz: string;

  @Column({ nullable: true })
  l_stadt: string;
  @Column({ nullable: true })
  role: string;
}
