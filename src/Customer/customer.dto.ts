import { IsDate, IsEmail, IsEmpty, IsNumber, IsString } from "class-validator";

export abstract class customerSchema {

  @IsEmpty()
  UserId: number;
  
  @IsEmpty()
  @IsString()
  Username: string;
  
}

export class profileSchema extends customerSchema {

  @IsEmpty()
  @IsString()
  Password: string;
  
  @IsEmpty()
  Role: string;
  
  @IsEmpty()
  @IsString()
  FirstName: string;
  
  @IsEmpty()
  @IsString()
  LastName: string;
  
  @IsEmpty()
  @IsString()
  Gender: string;
  
  @IsEmpty()
  @IsDate()
  Dob: Date;
  
  @IsEmpty()
  @IsEmail()
  Email: string;
  
  @IsEmpty()
  @IsString()
  Phone: string;
  
  @IsEmpty()
  @IsString()
  Address: string;
  
  @IsEmpty()
  @IsString()
  Picture: string;

}

export class wishListSchema extends customerSchema {

  @IsEmpty()
  @IsNumber()
  WishList_ID: number;

}

export class historySchema extends customerSchema {

  @IsEmpty()
  @IsNumber()
  History_ID: number;

}
