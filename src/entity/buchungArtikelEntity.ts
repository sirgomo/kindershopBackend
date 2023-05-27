import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('buchung_artikel')
export class BuchungArtikelEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ type: 'int', nullable: false })
    artikels_id: number;
    @Column({ type: 'int', nullable: false })
    buchung_id: number;
}
