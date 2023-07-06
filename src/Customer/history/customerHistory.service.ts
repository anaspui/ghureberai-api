import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerHistoryDto } from 'src/Customer/history/dto/customerHistory.dto';
import { CustomerHistory } from 'src/Shared/entities/customerHistory.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerHistoryService {
    constructor(
        @InjectRepository(CustomerHistory)
        private customerHistoryRepo: Repository<CustomerHistory>,
    ) {}

    async insertCustomerHistory(customerhistrorydto: CustomerHistoryDto): Promise<any> {
        return this.customerHistoryRepo.save(customerhistrorydto);
      }

    getCustomerHistory(id): any {
        return this.customerHistoryRepo.find({ where: { UserId: id } });
    }
}