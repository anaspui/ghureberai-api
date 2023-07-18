import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Package, PackageType } from './../../Shared/entities/package.entity';
import { PackageDto } from './dto/package.dto';
import { Role, User } from '../entities/user.entity';
import { MailerService } from "@nestjs-modules/mailer/dist";

@Injectable()
export class PackageService {
    constructor(
      @InjectRepository(Package)
      private PackageRepo: Repository<Package>,
      @InjectRepository(User)
      private userRepo: Repository<User>,
      public mailerService: MailerService,
    ) {}

    // Insert Package
    async insertPackage(PackageDto: PackageDto) {
      const user: { Email: any; Username: any }[] = await this.userRepo.findBy({ Role: Role.CUSTOMER });
      this.PackageRepo.save(PackageDto);
    
      user.forEach(async (userItem) => { // Use an arrow function here
        await this.mailerService.sendMail({
          to: userItem.Email,
          subject: "New Package Arrivals",
          text: `Dear ${userItem.Username},
      
    Thank you for being connected with Ghureberai! We're excited to notify you there are new package ${PackageDto.Name} available on our website now.
      
    Hurry up and start exploring our packages and experience the beauty of nature.
      
    If you have any questions or need assistance, feel free to reach out to our support team.
      
    Best regards,
    The Ghureberai Team`,
        });
      });
    
      return "Package added successfully";
    }

	// Get Filtered Package
	getPackage(id): any {
		return this.PackageRepo.find({ where: { PackageId: id } });
	}

	// Delete Package
	deletePackage(id): any {
		return this.PackageRepo.delete(id);
	}

	// Get All Packages
	showAllPackages(): any {
		return this.PackageRepo.find();
	}
	// Update Package
	async updatePackage(
		id: number,
		Name: string,
		ValidFrom: Date,
		ValidTill: Date,
		PackageType: PackageType,
		TransportFacility,
	): Promise<string> {
		const result = await this.PackageRepo.update(id, {
			Name,
			ValidFrom,
			ValidTill,
			PackageType,
			TransportFacility,
		});

		if (result.affected > 0) {
			return "Package updated";
		} else {
			return "Package not found";
		}
	}
}
