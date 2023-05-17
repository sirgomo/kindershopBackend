import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Res,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/auth/role/role.guard';
import { Artikel } from 'src/entity/artikelEntity';
import { ArtikelService } from './artikel.service';
import { ArtikelDTO } from 'src/dto/artikelDTO';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as sharp from 'sharp';

@Controller('artikel')
export class ArtikelController {
    constructor(private readonly artikelService: ArtikelService) {}

    @Get(':catid/:menge/:search/:sitenr')
    async findAll(
        @Param('catid') catid: number,
        @Param('menge') menge: number,
        @Param('search') search: string,
        @Param('siteNr') sitenr: number,
    ): Promise<Artikel[]> {
        return await this.artikelService.findAll(catid, menge, search, sitenr);
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Artikel> {
        return await this.artikelService.findOne(id);
    }

    @Post()
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    async create(@Body() artikel: ArtikelDTO): Promise<Artikel> {
        return await this.artikelService.create(artikel);
    }

    @Patch(':id')
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    async update(
        @Param('id') id: number,
        @Body() artikel: Artikel,
    ): Promise<number> {
        return await this.artikelService.update(id, artikel);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    async delete(@Param('id') id: number): Promise<number> {
        return await this.artikelService.delete(id);
    }
    @Post('image')
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './bilder',
                filename: (req, file, cb) => {
                    const randomName = Array(32)
                        .fill(null)
                        .map(() => Math.round(Math.random() * 16).toString(16))
                        .join('');
                    cb(null, `${randomName}${extname(file.originalname)}`);
                },
            }),
        }),
    )
    uploadFile(@UploadedFile() file: Express.Multer.File): any {
        sharp(file.path)
            .resize(300, 300)
            .toFile(
                './thumbnail/' + file.path.split('/')[1],
                (err, resizedImage) => {
                    if (err) {
                        console.log(err);
                    }
                    if (resizedImage) {
                        console.log(resizedImage);
                    }
                },
            );
        return {
            path: `${file.path}`,
        };
    }
    @Get('bilder/:fileId')
    async getBild(@Param('fileId') fileId, @Res() res): Promise<any> {
        res.sendFile(fileId, { root: 'bilder' });
    }
    @Get('thumbnail/:fileId')
    async getThumbnail(@Param('fileId') fileId, @Res() res): Promise<any> {
        res.sendFile(fileId, { root: 'thumbnail' });
    }
}
