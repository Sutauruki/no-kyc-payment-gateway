/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const CreatePaymentsController = () => import('#controllers/create_payment_controller')
const PaygateController = () => import('#controllers/paygate_controller')
import router from '@adonisjs/core/services/router'

router.on('/').renderInertia('home')
router
  .group(() => {
    router.post('/create', [CreatePaymentsController, 'store']).as('payment.create')
    router.get('/pay/:uid', [PaygateController, 'showByUid']).as('payment.pay')
    router
      .get('/email-success', async ({ inertia }) => {
        return inertia.render('Success')
      })
      .as('emailSuccess')
    router
      .get('/email-failed', async ({ inertia }) => {
        return inertia.render('Failed')
      })
      .as('emailFailed')
  })
  .prefix('/payment')
  .as('payment')

router.get('/csrf-token', async ({ request, response }) => {
  const token = request.csrfToken
  return response.json({ token })
})
