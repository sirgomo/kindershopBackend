import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { WarenBuchenEnetity } from './warenBuchenEntity';

@Entity('buchung_artikel')
export class BuchungArtikelEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ type: 'int', nullable: false })
    artikels_id: number;
    @Column({ type: 'int', nullable: false })
    buchung_id: number;
    @Column({ type: 'int', nullable: false })
    liferantid: number;
    @Column('decimal', { precision: 10, scale: 2 })
    price: number;
    @Column('decimal', { precision: 10, scale: 2 })
    mwst: number;
    @Column({ type: 'int', nullable: false })
    menge: number;

    @ManyToOne(() => WarenBuchenEnetity, (buchung) => buchung.artikels)
    buchung: WarenBuchenEnetity;
}
