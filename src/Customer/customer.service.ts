import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private regRepo: Repository<Customer>
  ) {}

  viewProfile(){
    return this.regRepo.find();
  }

  updateProfile(){
    return this.regRepo.find();
  }
}