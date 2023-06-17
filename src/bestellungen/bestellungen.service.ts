import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { iKorbItemDTO } from 'src/dto/itemInKorbDTO';
import { UserDTO } from 'src/dto/userDTO';
import { Artikel } from 'src/entity/artikelEntity';
import {
    BESTELLUNGSTATUS,
    BestellungEntity,
} from 'src/entity/bestellungEntity';
import { Repository } from 'typeorm';

@Injectable()
export class BestellungenService {
    constructor(
        @InjectRepository(BestellungEntity)
        private repo: Repository<BestellungEntity>,
    ) {}

    async getBestellungen(menge: number, sitenr: number) {
        if (sitenr < 1) sitenr = 1;
        if (menge < 1) menge = 20;

        const skip = menge * sitenr - menge;
        try {
            return await this.repo
                .find({
                    select: {
                        id: true,
                        email: true,
                        bestellung_status: true,
                        total_price: true,
                        steuer: true,
                        einkaufs_datum: true,
                        versand_datum: true,
                        bazahlt_am: true,
                    },
                    take: menge,
                    skip: skip,
                })
                .catch((err) => {
                    console.log(err);
                    throw new HttpException(
                        err.message,
                        HttpStatus.BAD_REQUEST,
                    );
                });
        } catch (err) {
            return err;
        }
    }
    async getBestelungenBeiEmail(email: string) {
        try {
            return await this.repo
                .find({
                    where: { email: email },
                    select: {
                        id: true,
                        email: true,
                        bestellung_status: true,
                        total_price: true,
                        steuer: true,
                        einkaufs_datum: true,
                        versand_datum: true,
                        bazahlt_am: true,
                    },
                })
                .catch((err) => {
                    throw new HttpException(
                        err.message,
                        HttpStatus.BAD_REQUEST,
                    );
                });
        } catch (err) {
            return err;
        }
    }
    async getBestelungenBeiId(bestellungid: number) {
        try {
            return await this.repo
                .findOne({ where: { id: bestellungid } })
                .catch((err) => {
                    throw new HttpException(
                        err.message,
                        HttpStatus.BAD_REQUEST,
                    );
                });
        } catch (err) {
            return err;
        }
    }
    async checkBestellung(user: UserDTO, items: iKorbItemDTO[]) {
        try {
            const artikels: Artikel[] = new Array(items.length);
            for (let i = 0; i < items.length; i++) {
                artikels[i] = (await this.repo.query(
                    `SELECT id, price, menge from artikel where id=${items[i].id}`,
                )) as Artikel;
                if (i === items.length - 1) {
                    this.checkPriseMenge(items, artikels);
                    return this.getPreisBrutto(items);
                }
            }
        } catch (err) {
            return err;
        }
    }
    private getPreisBrutto(items: iKorbItemDTO[]) {
        let preis = 0;
        for (let i = 0; i < items.length; i++) {
            preis +=
                (Number(items[i].preis) +
                    (Number(items[i].preis) * items[i].mwst) / 100) *
                items[i].menge;
            console.log(preis);
        }
        return { preis: preis.toFixed(2), item: items };
    }
    private checkPriseMenge(items: iKorbItemDTO[], artikels: Artikel[]) {
        for (let i = 0; i < items.length; i++) {
            if (items[i].preis !== artikels[i][0].price)
                throw new HttpException(
                    'Die prise wurden manipuliert! ... exit',
                    HttpStatus.CONFLICT,
                );
            if (items[i].menge > artikels[i][0].menge)
                throw new HttpException(
                    `Die maximale verfügbare Menge für ${items[i].name} beträgt ${artikels[i][0].menge}.`,
                    HttpStatus.FORBIDDEN,
                );
        }
    }

    async deleteBestellung(bestellungid: number) {
        try {
            const item = await this.repo.findOne({
                where: { id: bestellungid },
            });
            if (
                item.bestellung_status === BESTELLUNGSTATUS.STORNIERT ||
                item.bestellung_status === BESTELLUNGSTATUS.ZUGESTELLT
            ) {
                return (await this.repo.delete({ id: bestellungid })).affected;
            }
            throw new HttpException(
                'Besttellung wurde nicht Storniert od Zugestellt',
                HttpStatus.BAD_REQUEST,
            );
        } catch (err) {
            return err;
        }
    }
    async createBestellung(besttelung: BestellungEntity) {
        try {
            const tmpBes = await this.repo.create(besttelung);
            const items: iKorbItemDTO[] = JSON.parse(tmpBes.artikels_list);
            console.log(items);
            for (let i = 0; i < items.length; i++) {
                await this.repo
                    .query(
                        `UPDATE artikel set menge = menge - ${items[i].menge}
                where id=${items[i].id}`,
                    )
                    .catch((err) => {
                        console.log(err);
                    });
            }
            return await this.repo.save(tmpBes);
        } catch (err) {
            return err;
        }
    }
    async changeBestellungStatus(item: {
        id: number;
        status: BESTELLUNGSTATUS;
    }) {
        try {
            const tmp = await this.repo.findOne({ where: { id: item.id } });
            if (tmp === null) {
                throw new HttpException(
                    'Bestellung wurde nicht gefunden ',
                    HttpStatus.NOT_FOUND,
                );
            }

            tmp.bestellung_status = item.status;
            return this.repo.save(tmp);
        } catch (err) {
            return err;
        }
    }
}
