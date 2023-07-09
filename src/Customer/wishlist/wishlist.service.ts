import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WishlistDto } from './dto/wishlist.dto';
import { WishList } from 'src/Shared/entities/wishlist.entity';

@Injectable()
export class WishlistService {
    constructor(
        @InjectRepository(WishList)
        private WishListRepo: Repository<WishList>,
    ) {}

    insertWishlist(WishlistDto: WishlistDto){
        return this.WishListRepo.save(WishlistDto);
    }

    getWishlist(id): any {
        return this.WishListRepo.find({ where: { WishListId: id } });
    }

    deleteWishlist(id): any {
        return this.WishListRepo.delete(id);
    }

    showWishlist(): any {
        return this.WishListRepo.find();
    }
}