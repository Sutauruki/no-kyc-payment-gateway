import type { HttpContext } from '@adonisjs/core/http'
import { v4 as uuidv4 } from 'uuid'
import Payment from '#models/payment'

export default class CreatePaymentsController {
  async store({ request, response }: HttpContext) {
    try {
      const data = request.only(['customer_name', 'customer_email', 'amount', 'wallet_address'])

      const payment = await Payment.create({
        uid: uuidv4(),
        amount: data.amount,
        customerName: data.customer_name,
        customerEmail: data.customer_email,
        walletAddress: data.wallet_address,
        polygonAddress: null,
      })

      return response.status(201).json({
        message: 'Payment record created',
        data: payment,
        link: `/payment/pay/${payment.uid}`,
      })
    } catch (error) {
      console.error(error)
      return response.status(500).json({
        message: 'An error occurred while creating the payment record',
      })
    }
  }
}
