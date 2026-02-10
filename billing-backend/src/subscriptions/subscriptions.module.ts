import { Module } from '@nestjs/common';
import { SubscriptionsController } from './subscriptions.controller';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionsRepository } from './subscriptions.repository';
import { SupabaseService } from '../common/supabase.service';

@Module({
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService, SubscriptionsRepository, SupabaseService],
})
export class SubscriptionsModule {}
