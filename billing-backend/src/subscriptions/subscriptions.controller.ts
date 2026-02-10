import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { SubscriptionRecord } from './dto/subscription-response.dto';

@ApiTags('subscriptions')
@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Get()
  @ApiOperation({ summary: 'List subscriptions' })
  @ApiOkResponse({ type: SubscriptionRecord, isArray: true })
  async getSubscriptions(): Promise<SubscriptionRecord[]> {
    return this.subscriptionsService.getAllSubscriptions();
  }

  @Post()
  @ApiOperation({ summary: 'Create a subscription' })
  @ApiCreatedResponse({ type: SubscriptionRecord })
  @ApiBadRequestResponse({ description: 'Invalid payload' })
  async createSubscription(
    @Body() payload: CreateSubscriptionDto,
  ): Promise<SubscriptionRecord> {
    return this.subscriptionsService.createSubscription(payload);
  }
}
