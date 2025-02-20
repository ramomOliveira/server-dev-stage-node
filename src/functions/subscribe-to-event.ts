import { db } from '../drizzle/client'
import { subscriptions } from '../drizzle/schema/subscriptions'

interface SubscribeToEventProps {
  name: string
  email: string
}

export async function subscribeToEvent({ name, email }: SubscribeToEventProps) {
  const result = await db
    .insert(subscriptions)
    .values({
      name,
      email,
    })
    .returning()

  const subscription = result[0]

  return {
    subscriptionId: subscription.id,
  }
}
