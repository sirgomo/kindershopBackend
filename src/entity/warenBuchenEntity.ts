import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { KreditorenEntity } from './kreditorenEntity';
import { BuchungArtikelEntity } from './buchungArtikelEntity';

@Entity('waren_buchung')
export class WarenBuchenEnetity {
    @PrimaryGeneratedColumn()
    buchung_id: number;
    @Column('tinytext', { nullable: false })
    lieferschein_id: string;
    @Column('date', { nullable: false })
    liefer_date: Date;
    @Column('date', { nullable: false })
    buchung_date: Date;

    @Column({ type: 'tinyint', nullable: false, default: 0 })
    gebucht: number;

    @Column('int')
    korrigiertes_nr: number;
    @Column('text')
    korrigiertes_grund: string;

    @ManyToOne(() => KreditorenEntity, (kreditor) => kreditor.wareneingaenge)
    @JoinColumn({ name: 'kreditor_id' })
    kreditor: KreditorenEntity;
    @OneToMany(() => BuchungArtikelEntity, (artikel) => artikel.buchung)
    artikels: BuchungArtikelEntity[];
}
