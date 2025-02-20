import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { subscribeToEvent } from '../functions/subscribe-to-event'

export const subscribeToEventRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/subscriptions',
    {
      schema: {
        summary: 'Subscribe to event',
        tags: ['subscriptions'],
        body: z.object({
          name: z.string(),
          email: z.string().email(),
        }),
        response: {
          201: z.object({
            subscriptionId: z.string(),
          }),
        },
      },
    },
    async (request, replay) => {
      const { name, email } = request.body

      const { subscriptionId } = await subscribeToEvent({ name, email })

      return replay.status(201).send({
        subscriptionId,
      })
    }
  )
}
