import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BestellungEntity } from 'src/entity/bestellungEntity';
import { Repository } from 'typeorm';

@Injectable()
export class BestellungenService {
    constructor(
        @InjectRepository(BestellungEntity)
        private repo: Repository<BestellungEntity>,
    ) {}

    async getBestellungen(menge: number, sitenr: number) {
        if (sitenr < 1) sitenr = 1;

        const skip = menge * sitenr - menge;
        try {
            return await this.repo
                .find({
                    select: {
                        id: true,
                        email: true,
                        bestellung_status: true,
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
                .findOne({ where: { email: email } })
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
}
