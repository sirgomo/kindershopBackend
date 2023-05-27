import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { KreditorenEntity } from './kreditorenEntity';

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
    kreditor: KreditorenEntity;
    @Column({ type: 'text', nullable: false })
    artikels: string;
}
