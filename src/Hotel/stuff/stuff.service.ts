import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { StuffDto } from '../dto/stuff.dto'; 
import { Stuff } from 'src/Shared/entities/stuff.entity';

@Injectable()
export class StuffService {
    constructor(
        @InjectRepository(Stuff)
        private stuffRepo: Repository<Stuff>,
    ) {}

    async addStuff(stuffDto: StuffDto): Promise<any> {
        return this.stuffRepo.save(stuffDto);
    }

    async viewStuff() {
        return this.stuffRepo.find();
    }

    async updateStuff(Id: number, Name: string): Promise<string> {
        const updateStuff = await this.stuffRepo.update(Id, { Name });
        if (updateStuff.affected > 0) {
            return "";
        } else {
            return "";
        }
    }

    async deleteStuff(Id: number): Promise<string> {
        const result = await this.stuffRepo.delete(Id);

        if (result.affected > 0) {
            return "";
        } else {
            return "";
        }
    }

}