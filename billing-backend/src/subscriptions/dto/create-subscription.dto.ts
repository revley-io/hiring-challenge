import { IsEnum, IsNumber, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Constants } from '../../common/database.types';

export class CreateSubscriptionDto {
  @ApiProperty({ format: 'uuid', example: 'b4e3e0c2-9b1f-4dd6-9d73-3e5c9c0f2b4a' })
  @IsUUID()
  product_id: string;

  @ApiProperty({ format: 'uuid', example: '9a1dd9a9-4bb1-4cc5-8f75-8cc3b4c8e4f2' })
  @IsUUID()
  customer_id: string;

  @ApiProperty({ example: 1999, description: 'Price in cents' })
  @IsNumber()
  price: number;

  @ApiProperty({ enum: ['active', 'paused', 'cancelled'], example: 'active' })
  @IsEnum(Constants.public.Enums.subscription_status)
  status: 'active' | 'paused' | 'cancelled';
}
