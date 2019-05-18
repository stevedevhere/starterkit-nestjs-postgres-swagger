import { Controller, Delete, FileInterceptor, Get, Inject, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiExcludeEndpoint, ApiImplicitFile, ApiImplicitParam, ApiOperation } from '@nestjs/swagger';
import * as fs from 'fs';
import * as multer from 'multer';
import { FileService } from '../../providers/services/file.service';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads');
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}-${file.originalname.toLowerCase().split(' ').join('-')}`);
  },
});

const storageForSoftware = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'scripts/software');
  },
  filename(req, file, cb) {
    fs.rename('scripts/software/software.csv', 'scripts/software/prev_software.csv', () => { cb(null, 'software.csv'); });
  },
});

@Controller('/file')
export class FileController {
  constructor(@Inject(FileService) private readonly fileService: FileService) { }

  @Post('upload')
  @ApiExcludeEndpoint()
  @ApiOperation({ title: 'Upload file', operationId: 'uploadFile' })
  @UseInterceptors(FileInterceptor('file', { storage }))
  @ApiBearerAuth()
  @ApiImplicitFile({ name: 'file' })
  async uploadFile(@UploadedFile() file): Promise<any> {
    return this.fileService.upload(file);
  }

  @Get(':id')
  @ApiExcludeEndpoint()
  @ApiOperation({ title: '', operationId: 'getFileById' })
  @ApiImplicitParam({ name: 'id' })
  @ApiBearerAuth()
  async getFile(
    @Param('id') id: string,
  ): Promise<any> {
    return this.fileService.getById(id);
  }

  @Delete(':id')
  @ApiExcludeEndpoint()
  @ApiOperation({ title: '', operationId: 'deleteFileById' })
  @ApiImplicitParam({ name: 'id' })
  @ApiBearerAuth()
  async deleteFile(
    @Param('id') id: string,
  ): Promise<void> {
    this.fileService.delete(id);
  }
}
