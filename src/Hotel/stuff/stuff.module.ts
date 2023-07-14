import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StuffController } from '../stuff/stuff.controller';
import { StuffService } from '../stuff/stuff.service';
import { Stuff } from 'src/Shared/entities/stuff.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Stuff])],
    controllers: [StuffController],
    providers: [StuffService],
  })
  export class StuffModule {}