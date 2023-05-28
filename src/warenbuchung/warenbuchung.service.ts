import {
    HttpException,
    HttpStatus,
    Injectable,
    RouteParamMetadata,
} from '@nestjs/common';
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
    async getBuchung() {
        try {
            return await this.warRepo.find({
                relations: {
                    kreditor: true,
                    artikels: true,
                },
            });
        } catch (err) {
            return err;
        }
    }
    async createBuchung(buchung: EingangBuchungDTO) {
        try {
            const enti: WarenBuchenEnetity = await this.warRepo.create(buchung);
            return await this.warRepo.save(enti).catch((err) => {
                console.log(err);
                return err;
            });
        } catch (err) {
            return err;
        }
    }
    async editBuchung(buchung: EingangBuchungDTO) {
        try {
            const enti: WarenBuchenEnetity = this.warRepo.create(buchung);
            if (enti.gebucht === 2) {
                throw new HttpException(
                    'Buchung gebucht! Man kann nicht ändern!',
                    HttpStatus.BAD_REQUEST,
                );
            } else if (enti.gebucht === 1) {
                const art: Artikel[] = new Array(enti.artikels.length);
                for (let i = 0; i < enti.artikels.length; i++) {
                    const tmp = await this.artikelRepo.findOne({
                        where: { id: enti.artikels[i].artikels_id },
                    });
                    tmp.menge += enti.artikels[i].menge;
                    art[i] = tmp;
                }
                await this.artikelRepo.save(art).then(
                    (data) => {
                        enti.gebucht = 2;
                    },
                    (err) => {
                        console.log(err);
                    },
                );
            }

            return (
                await this.warRepo.update(
                    { buchung_id: buchung.buchung_id },
                    enti,
                )
            ).affected;
        } catch (err) {
            return err;
        }
    }
}
