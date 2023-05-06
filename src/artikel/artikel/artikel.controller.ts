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

@Controller('artikel')
export class ArtikelController {
    constructor(private readonly artikelService: ArtikelService) {}

    @Get()
    async findAll(): Promise<Artikel[]> {
        return await this.artikelService.findAll();
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
        return {
            path: `${file.path}`,
        };
    }
    @Get('bilder/:fileId')
    async serveAvatar(@Param('fileId') fileId, @Res() res): Promise<any> {
        res.sendFile(fileId, { root: 'bilder' });
    }
}
