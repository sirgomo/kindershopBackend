import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('bestellung')
export class BestellungEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
    email: string;
    @Column({ type: 'varchar', length: 255, nullable: false })
    vorname: string;
    @Column({ type: 'varchar', length: 255, nullable: false })
    nachname: string;
    @Column({ type: 'varchar', length: 255, nullable: false })
    strasse: string;
    @Column({ type: 'varchar', length: 255, nullable: false })
    hausnummer: string;
    @Column({ type: 'mediumint', length: 255, nullable: false })
    plz: string;
    @Column({ type: 'varchar', length: 255, nullable: false })
    stadt: string;
    @Column({ type: 'varchar', length: 255 })
    l_nachname: string;
    @Column({ type: 'varchar', length: 255 })
    l_strasse: string;
    @Column({ type: 'varchar', length: 255 })
    l_hausnummer: string;
    @Column({ type: 'mediumint', length: 255 })
    l_plz: string;
    @Column({ type: 'varchar', length: 255 })
    l_stadt: string;
    @Column({ type: 'tinytext', nullable: false })
    bestellung_status: BESTELLUNGSTATUS;
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    total_price: number;
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    steuer: number;
    @Column({ type: 'varchar', length: 10000, nullable: false })
    artikels_list: string;
    @Column('datetime')
    einkaufs_datum: Date;
    @Column('datetime')
    versand_datum: Date;
    @Column('datetime')
    bazahlt_am: Date;
    @Column({ type: 'tinytext', nullable: false })
    payart: PAYART;
}

export enum BESTELLUNGSTATUS {
    INBEARBEITUNG = 'INBEARBEITUNG',
    VERSCHICKT = 'VERSCHICKT',
    ZUGESTELLT = 'ZUGESTELLT',
    STORNIERT = 'STORNIERT',
}
export enum PAYART {
    PAYPAL = 'PAYPAL',
    PERNACHNAHME = 'PERNACHNAHME',
}
