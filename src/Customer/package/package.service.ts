import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Package, PackageType } from './../../Shared/entities/package.entity';
import { PackageDto } from './dto/package.dto';

@Injectable()
export class PackageService {
    constructor(
        @InjectRepository(Package)
        private PackageRepo: Repository<Package>,
    ) {}

    async insertPackage(PackageDto: PackageDto): Promise<any> {
        return this.PackageRepo.save(PackageDto);
      }

    getPackage(id): any {
        return this.PackageRepo.find({ where: { PackageId: id } });
    }

    deletePackage(id): any {
        return this.PackageRepo.delete(id);
    }

    showAllPackages(): any {
        return this.PackageRepo.find();
    }

    async updatePackage(id: number, Name: string, ValidFrom: Date, ValidTill: Date, PackageType: PackageType, TransportFacility): Promise<string> {
        
      const result = await this.PackageRepo.update(id, { Name, ValidFrom, ValidTill, PackageType, TransportFacility});
    
        if (result.affected > 0) {
          return 'Package updated';
        } else {
          return 'Package not found';
        }
      }
}