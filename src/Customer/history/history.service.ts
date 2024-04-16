import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { HistoryDto } from "../../Customer/history/dto/history.dto";
import { History } from "../../Shared/entities/history.entity";
import { Repository } from "typeorm";

@Injectable()
export class HistoryService {
	constructor(
		@InjectRepository(History)
		private HistoryRepo: Repository<History>,
	) {}

	async insertHistory(Histrorydto: HistoryDto): Promise<any> {
		return this.HistoryRepo.save(Histrorydto);
	}

	getHistory(id): any {
		return this.HistoryRepo.find({ where: { UserId: id } });
	}
}
