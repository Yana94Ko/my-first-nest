import { Injectable } from '@nestjs/common';

@Injectable()
export class BlaBlaService {
  getHello(): string {
    return 'BlaBlaService';
  }
}
