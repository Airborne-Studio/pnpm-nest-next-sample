import {
  Controller,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';

import { ExcelService } from './excel.service';

@ApiTags('Excel')
@Controller('excel')
export class ExcelController {
  constructor(private readonly excelService: ExcelService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload and process Excel file' })
  @ApiConsumes('multipart/form-data')
  async uploadExcelFile(
    @UploadedFile() file: any,
    @Res() res: any
  ): Promise<void> {
    try {
      await this.excelService.processAndSaveUsers(file.buffer); // Pass file buffer to service
      res
        .status(200)
        .json({ message: 'Excel file uploaded and processed successfully' });
    } catch (err) {
      res.status(400).json({ error: err });
    }
  }
}
