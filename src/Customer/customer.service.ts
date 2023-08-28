import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MailerService } from "@nestjs-modules/mailer/dist";
import { User } from 'src/Shared/entities/user.entity';

@Injectable()
export class CustomerService {
    constructor(
      @InjectRepository(User)
      private UserRepo: Repository<User>,
      public mailerService: MailerService,
    ) {}

    // Get Filtered Package
    getUser(id): any {
      return this.UserRepo.find({ where: { UserId: id } });
    }

    getUserData(username): any {
      return this.UserRepo.find({ where: { Username: username } });
    }
  
    // Delete Package
    async deleteUser(id: any) {
        const User:User[] = await this.UserRepo.find({ where: { UserId: id } });
        await this.mailerService.sendMail({
            to: User[0].Email,
            subject: "Account Deletion Notification",
            text: `Dear ${User[0].Username},
        
      We're sorry to notify you that your account has been deleted from our website.
        
      We hope you enjoyed your time with us and we would love to see you again.
        
      Best regards,
      The Ghureberai Team`,
          });
      return this.UserRepo.delete(id);
    }
}