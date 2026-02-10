import { Injectable } from '@nestjs/common';
import { SubscriptionsRepository } from './subscriptions.repository';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { SubscriptionRecord } from './dto/subscription-response.dto';

@Injectable()
export class SubscriptionsService {
  constructor(private readonly repository: SubscriptionsRepository) {}

  async getAllSubscriptions(): Promise<SubscriptionRecord[]> {
    const subscriptions = await this.repository.findAll();
    return subscriptions;
  }

  async createSubscription(
    payload: CreateSubscriptionDto,
  ): Promise<SubscriptionRecord> {
    return this.repository.create(payload);
  }
}
