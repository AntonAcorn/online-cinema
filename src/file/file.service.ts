import { Injectable } from '@nestjs/common';
import { FileResponseDto } from './dto/file.dto';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';

@Injectable()
export class FileService {
  async saveFile(
    files: Express.Multer.File[],
    folder: string = 'default'
  ): Promise<FileResponseDto[]> {
    const uploadFolder = `${path}/uploads/${folder}`;
    await ensureDir(uploadFolder);
    const res: FileResponseDto[] = await Promise.all(
      files.map(async (file) => {
        await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer);
        return {
          url: `/uploads/${folder}/${file.originalname}`,
          name: file.originalname,
        };
      })
    );

    return res;
  }
}
