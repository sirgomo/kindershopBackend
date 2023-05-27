import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { WarenBuchenEnetity } from './warenBuchenEntity';

@Entity('kreditoren')
export class KreditorenEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, nullable: false })
    kreditorennummer: string;

    @Column({ type: 'varchar', nullable: false })
    kreditorenname: string;

    @Column({ type: 'varchar', nullable: false })
    anschrift: string;

    @Column('varchar')
    telefonnummer: string;

    @Column('varchar')
    faxnummer: string;

    @Column('varchar')
    email: string;

    @Column({ type: 'varchar', nullable: false })
    bankname: string;

    @Column({ type: 'varchar', nullable: false })
    iban: string;

    @Column({ type: 'varchar', nullable: false })
    bic: string;

    @Column('varchar')
    zahlungsbedingungen: string;

    @Column()
    steuernummer: string;
    @Column()
    ust_idnr: string;

    @Column('tinytext')
    land: string;

    @OneToMany(
        () => WarenBuchenEnetity,
        (wareneingang) => wareneingang.kreditor,
    )
    wareneingaenge: WarenBuchenEnetity[];
}
