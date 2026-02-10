import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SubscriptionRecord {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty({ format: 'uuid' })
  product_id: string;

  @ApiProperty({ format: 'uuid' })
  customer_id: string;

  @ApiProperty({ example: 1999, description: 'Price in cents' })
  price: number;

  @ApiProperty({ enum: ['active', 'paused', 'cancelled'] })
  status: 'active' | 'paused' | 'cancelled';

  @ApiProperty({ example: '2026-02-10T16:25:00.000Z' })
  created_at: string;

  @ApiProperty({ example: '2026-02-10T16:25:00.000Z' })
  updated_at: string;

  @ApiProperty({ nullable: true, example: null })
  deleted_at: string | null;

  @ApiPropertyOptional({ nullable: true, example: 'user@example.com' })
  customer_email?: string | null;

  @ApiPropertyOptional({ nullable: true, example: 'Pro Plan' })
  product_name?: string | null;
}
