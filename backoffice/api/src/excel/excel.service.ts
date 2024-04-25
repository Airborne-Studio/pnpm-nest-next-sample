import { Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import { Readable } from 'stream';

import { UserService } from '../user/user.service';

@Injectable()
export class ExcelService {
  constructor(private readonly userService: UserService) {}

  async processAndSaveUsers(fileBuffer: Buffer) {
    const userData: any = [];

    try {
      const workbook = new ExcelJS.Workbook();

      // Create a readable stream from the buffer
      const bufferStream = new Readable();
      bufferStream.push(fileBuffer);
      bufferStream.push(null);

      await workbook.csv.read(bufferStream);
      const worksheet = workbook.getWorksheet(1);
      if (!worksheet) {
        throw new Error('Worksheet not found in Excel file');
      }

      // column mapping
      const columnMapping: Record<string, string> = {
        Name: 'name',
        'First Name': 'firstName',
        'Last Name': 'lastName',
        Age: 'age',
      };

      worksheet.eachRow((row, rowIndex) => {
        if (rowIndex !== 1) {
          const user: Record<string, any> = {};

          Object.keys(columnMapping).forEach((columnName, index) => {
            const columnValue = row.getCell(index + 1).value;
            const mappedColumnName = columnMapping[columnName];
            if (mappedColumnName) {
              user[mappedColumnName] = columnValue;
            }
          });

          // Parse age as integer
          user['age'] = parseInt(user['age'], 10);

          userData.push(user);
        }
      });
      await this.userService.createBulk(userData);
    } catch (error) {
      console.error('Error reading Excel file:', error);
    }
  }
}
