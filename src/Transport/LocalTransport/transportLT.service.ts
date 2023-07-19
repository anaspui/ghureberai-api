import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Localtransport } from "src/Shared/entities/localtransport.entity";
import { Repository } from "typeorm";
import { LTDto } from "./transportLT.dto";

@Injectable()
export class TransportLTService {
	constructor(
		@InjectRepository(Localtransport)
		private LTrepo: Repository<Localtransport>,
	) {}

	showdriver(id) {
		return this.LTrepo.find({ where: { LocaltransportID: id } });
	}
	addLocalTransport(LTData: LTDto): object {
		const addLocalTransport = this.LTrepo.create(LTData);
		return this.LTrepo.save(addLocalTransport);
	}
}
