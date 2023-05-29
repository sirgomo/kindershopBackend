import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EingangBuchungDTO } from 'src/dto/eingangBuchungDTO';
import { Artikel } from 'src/entity/artikelEntity';
import { BuchungArtikelEntity } from 'src/entity/buchungArtikelEntity';
import { WarenBuchenEnetity } from 'src/entity/warenBuchenEntity';
import { Repository } from 'typeorm';

@Injectable()
export class WarenbuchungService {
    constructor(
        @InjectRepository(WarenBuchenEnetity)
        private readonly warRepo: Repository<WarenBuchenEnetity>,
        @InjectRepository(BuchungArtikelEntity)
        private readonly artRepo: Repository<BuchungArtikelEntity>,
        @InjectRepository(Artikel)
        private readonly artikelRepo: Repository<Artikel>,
    ) {}
    /**
     * Gibt alle Warenbuchungen mit Informationen über den Kreditor zurück.
     * @returns Promise, das Array von Warenbuchungen enthält.
     * @throws HttpException mit Statuscode 404, wenn keine Buchungen gefunden wurden.
     */
    async getBuchung() {
        try {
            return await this.warRepo
                .find({
                    relations: {
                        kreditor: true,
                    },
                })
                .catch((err) => {
                    console.log(err);
                    throw new HttpException(
                        'Kein Buchung wurde gefunden...',
                        HttpStatus.NOT_FOUND,
                    );
                });
        } catch (err) {
            return err;
        }
    }
    /**
     * Gibt eine Warenbuchung mit Informationen über den Kreditor und die enthaltenen Artikel zurück.
     * @param id - ID der Warenbuchung.
     * @returns Promise, das die gesuchte Warenbuchung enthält.
     * @throws HttpException mit Statuscode 404, wenn keine Buchung mit der angegebenen ID gefunden wurde.
     */
    async getBuchungById(id: number) {
        try {
            return await this.warRepo
                .findOne({
                    where: { buchung_id: id },
                    relations: {
                        kreditor: true,
                        artikels: true,
                    },
                })
                .catch((err) => {
                    console.log(err);
                    throw new HttpException(
                        'Kein Buchung mit nr ' + id + ' wurde gefunden ',
                        HttpStatus.NOT_FOUND,
                    );
                });
        } catch (err) {
            return err;
        }
    }
    /**
     * Erstellt eine neue Warenbuchung.
     * @param buchung - DTO, das die Informationen für die neue Warenbuchung enthält.
     * @returns Promise, das die erstellte Warenbuchung enthält.
     * @throws HttpException mit Statuscode 502, wenn ein Fehler beim Speichern der Warenbuchung auftrat.
     */
    async createBuchung(buchung: EingangBuchungDTO) {
        try {
            const enti: WarenBuchenEnetity = await this.warRepo.create(buchung);
            return await this.warRepo.save(enti).catch((err) => {
                console.log(err);
                throw new HttpException(
                    'Es ist ein fehler aufgetreten, buchung wurde nicht gespeichert!',
                    HttpStatus.BAD_GATEWAY,
                );
            });
        } catch (err) {
            return err;
        }
    }
    /**
     * Ändert eine bestehende Warenbuchung.
     * @param buchung - DTO, das die neuen Informationen für die Warenbuchung enthält.
     * @returns Promise, das die Anzahl der betroffenen Datensätze enthält.
     * @throws HttpException mit Statuscode 400, wenn die Buchung bereits gebucht wurde oder ein Fehler beim Speichern der Änderungen auftrat.
     */
    async editBuchung(buchung: EingangBuchungDTO) {
        try {
            const backup: Artikel[] = new Array(buchung.artikels.length);
            const enti: WarenBuchenEnetity = this.warRepo.create(buchung);
            const art: Artikel[] = new Array(enti.artikels.length);
            if (enti.gebucht === 2) {
                throw new HttpException(
                    'Buchung gebucht! Es kann nichts geändert werden!',
                    HttpStatus.BAD_REQUEST,
                );
            } else if (enti.gebucht === 1) {
                await this.saveArtikels(enti, backup, art, false);
            }

            return await this.warRepo
                .update({ buchung_id: buchung.buchung_id }, enti)
                .then(
                    (res) => {
                        return res.affected;
                    },
                    (err) => {
                        console.log(err);
                        this.saveArtikels(enti, backup, art, true);
                        throw new HttpException(
                            'Es ein fehler aufgetreten, die anderungen wurden nicht gespeichert',
                            HttpStatus.BAD_REQUEST,
                        );
                    },
                );
        } catch (err) {
            return err;
        }
    }
    /**
     * Speichert die Änderungen an den Artikeln einer Warenbuchung.
     * @param enti - Die Warenbuchung, deren Artikel geändert werden sollen.
     * @param backup - Array, das die Ausgangsmenge der Artikel enthält.
     * @param art - Array, das die neuen Mengen der Artikel enthält.
     * @param rollback - Flag, das angibt, ob ein Rollback der Änderungen erfolgen soll.
     */
    private async saveArtikels(
        enti: WarenBuchenEnetity,
        backup: Artikel[],
        art: Artikel[],
        rollback: boolean,
    ) {
        for (let i = 0; i < enti.artikels.length; i++) {
            const tmp = await this.artikelRepo.findOne({
                where: { id: enti.artikels[i].artikels_id },
            });
            if (!rollback) {
                backup[i] = tmp;
                tmp.menge += enti.artikels[i].menge;
                art[i] = tmp;
            } else {
                tmp.menge = backup[i].menge;
                art[i] = tmp;
            }
        }
        await this.artikelRepo.save(art).then(
            () => {
                if (!rollback) {
                    enti.gebucht = 2;
                }
            },
            (err) => {
                console.log(err);
            },
        );
    }
}
