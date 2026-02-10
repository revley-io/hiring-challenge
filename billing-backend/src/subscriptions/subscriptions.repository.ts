import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../common/supabase.service';
import type { CreateSubscriptionDto } from './dto/create-subscription.dto';
import type { SubscriptionRecord } from './dto/subscription-response.dto';

@Injectable()
export class SubscriptionsRepository {
  constructor(private readonly supabaseService: SupabaseService) {}

  async findAll(): Promise<SubscriptionRecord[]> {
    const client = this.supabaseService.getClient();

    const { data: subscriptions, error: subscriptionsError } = await client 
      .from('subscriptions')
      .select('*');

    if (subscriptionsError) {
      throw new Error(subscriptionsError.message);
    }

    const results: SubscriptionRecord[] = [];

    for (const sub of subscriptions ?? []) {
      const { data: customer, error: customerError } = await client
        .from('customers')
        .select('email')
        .eq('id', sub.customer_id)
        .maybeSingle();

      if (customerError) {
        throw new Error(customerError.message);
      }

      const { data: product, error: productError } = await client
        .from('products')
        .select('name')
        .eq('id', sub.product_id)
        .maybeSingle();

      if (productError) {
        throw new Error(productError.message);
      }

      results.push({
        id: sub.id,
        product_id: sub.product_id,
        customer_id: sub.customer_id,
        price: sub.price,
        status: sub.status,
        created_at: sub.created_at,
        updated_at: sub.updated_at,
        deleted_at: sub.deleted_at,
        customer_email: customer?.email ?? null,
        product_name: product?.name ?? null,
      });
    }

    return results;
  }

  async create(payload: CreateSubscriptionDto): Promise<SubscriptionRecord> {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('subscriptions')
      .insert({
        product_id: payload.product_id,
        customer_id: payload.customer_id,
        price: payload.price,
        status: payload.status,
      })
      .select('*')
      .single();

    if (error || !data) {
      throw new Error(error?.message ?? 'Failed to create subscription');
    }

    return data;
  }
}
