import Payment from '#models/payment'
import type { HttpContext } from '@adonisjs/core/http'

export default class PaygateController {
  async showByUid({ params, response }: HttpContext) {
    const uid = params.uid

    const payment = await Payment.query().where('uid', uid).first()

    if (!payment) {
      return response.notFound({ message: 'Payment not found' })
    }

    const wallet = payment.walletAddress
    console.log(`waalet: ${wallet}`)
    const callback = `` // Add a proper callback URL if needed
    const url = `https://api.paygate.to/control/wallet.php?address=${wallet}&callback=${encodeURIComponent(callback)}`

    type PaygateWalletResponse = {
      address_in?: string
      polygon_address_in?: string
      ipn_token?: string
    }

    try {
      const predata = await fetch(url)

      const contentType = predata.headers.get('content-type')
      if (!contentType?.includes('application/json')) {
        const text = await predata.text()
        console.error('Unexpected response:', text)
        return response
          .status(500)
          .json({ success: false, error: 'Invalid response from Paygate API' })
      }

      const data = (await predata.json()) as PaygateWalletResponse

      const redirectUrl =
        `https://checkout.paygate.to/pay.php?` +
        `address=${data.address_in}` +
        `&amount=${payment.amount}` +
        `&email=${encodeURIComponent(payment.customerEmail)}` +
        `&currency=USD`

      if (data.address_in) {
        payment.polygonAddress = data.polygon_address_in || null
        await payment.save()
        console.log(payment.polygonAddress)
        return response.status(302).redirect(redirectUrl)
      } else {
        return response
          .status(500)
          .json({ success: false, error: 'address_in not found in response' })
      }
    } catch (error) {
      console.error('Fetch error:', error)
      return response
        .status(500)
        .json({ success: false, error: 'Something went wrong while contacting Paygate' })
    }
  }
}
