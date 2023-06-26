import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomerService {
  getHello(): string {
    return 'Hello World!';

  }
  getHell(): string {
    return 'Hello!';
    
  }
}