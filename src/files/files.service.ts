import { Injectable } from '@nestjs/common';
import { UpdateFileDto } from './dto/update-file.dto';
import { Request } from 'express';
import { PDFDocument } from 'pdf-lib';
import * as fs from 'fs';

@Injectable()
export class FilesService {
  async createPdf(file) {
    try {
      const pdfDoc = await PDFDocument.load(file.buffer);
      console.log(pdfDoc);

      // Modify doc, fill out the form...
      const fieldNames = pdfDoc
        .getForm()
        .getFields()
        .map((f) => f.getName());
      console.log({ fieldNames });

      const form = pdfDoc.getForm();

      form.getTextField('firstName').setText('John');
      form.getTextField('lastName').setText('Smith');
      form.getTextField('email').setText('email@example.com');
      form.getTextField('phoneNumber').setText('+375290000101');
      form.getTextField('date').setText('05/08/2023');

      form
        .getTextField('description')
        .setText('fill out test form fields using pdf-lib');

      form.getCheckBox('CheckBoxM').check();
      const pdfBytes = await pdfDoc.save();

      await fs.writeFile('pdfForm.pdf', pdfBytes, (err) => {
        if (!err) console.log('Data written');
      });
      console.log('PDF created!');
    } catch (err) {
      console.log(err);
    }
  }

  //createPdf('medical-claim-form_unlocked.pdf', 'output.pdf');

  // create(createFileDto: CreateFileDto) {
  //   return 'This action adds a new file';
  // }

  findAll() {
    return `This action returns all files`;
  }

  findOne(id: number) {
    return `This action returns a #${id} file`;
  }

  update(id: number, updateFileDto: UpdateFileDto) {
    return `This action updates a #${id} file`;
  }

  remove(id: number) {
    return `This action removes a #${id} file`;
  }
}
