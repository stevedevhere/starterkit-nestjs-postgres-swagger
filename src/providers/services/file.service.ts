import { Injectable } from '@nestjs/common';

@Injectable()
export class FileService {
  async upload(file: any) {
    // ...
  }

  async getById(id: string): Promise<void> {
    // ...
  }

  async delete(id: string): Promise<void> {
    // ...
  }

}
