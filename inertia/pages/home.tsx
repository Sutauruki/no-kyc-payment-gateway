import { Head, useForm } from '@inertiajs/react'
import { Label } from "~/components/ui/label"
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"

export default function Home() {
  const { data, setData, post, processing, errors } = useForm({
    customer_name: '',
    customer_email: '',
    amount: '',
    wallet_address: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    post('payment/create', {
      onSuccess: () => {
        alert('Sent')
        console.log('Successful!')
      },
      onError: (errors) => {
        console.error('Errors:', errors)
        const errorMessage = Object.values(errors).join(', ')
        window.location.href = `/error?message=${encodeURIComponent(errorMessage)}`
      }
    })
  }

  return (
    <>
      <Head title='Home'/>
      <div className='overflow-x-hidden h-screen'>
        <div className='py-28 bg-blue-50 h-screen'>
          <form 
            onSubmit={handleSubmit}
            className='bg-gray-100 space-y-3 w-96 mx-auto my-auto py-5 px-3 rounded overflow-x-hidden shadow'
          >
            <div>
              <Label htmlFor='customer_name'>Customer Name</Label>
              <Input 
                type='text' 
                name='customer_name' 
                id='customer_name' 
                value={data.customer_name}
                onChange={e => setData('customer_name', e.target.value)}
                required 
                className='bg-white shadow'
                disabled={processing}
              />
              {errors.customer_name && (
                <div className="text-red-500 text-sm mt-1">{errors.customer_name}</div>
              )}
            </div>

            <div>
              <Label htmlFor='customer_email'>Customer Email</Label>
              <Input 
                type='email' 
                name='customer_email' 
                id='customer_email' 
                value={data.customer_email}
                onChange={e => setData('customer_email', e.target.value)}
                required 
                className='bg-white shadow'
                disabled={processing}
              />
              {errors.customer_email && (
                <div className="text-red-500 text-sm mt-1">{errors.customer_email}</div>
              )}
            </div>

            <div>
              <Label htmlFor='amount'>Amount</Label>
              <Input 
                type='text' 
                name='amount' 
                id='amount' 
                placeholder='USDC'
                value={data.amount}
                onChange={e => setData('amount', e.target.value)}
                required 
                className='bg-white shadow'
                disabled={processing}
              />
              {errors.amount && (
                <div className="text-red-500 text-sm mt-1">{errors.amount}</div>
              )}
            </div>

            <div>
              <Label htmlFor='wallet_address'>Wallet Address</Label>
              <Input 
                type='text' 
                name='wallet_address' 
                id='wallet_address' 
                value={data.wallet_address}
                onChange={e => setData('wallet_address', e.target.value)}
                required 
                className='bg-white shadow'
                disabled={processing}
              />
              {errors.wallet_address && (
                <div className="text-red-500 text-sm mt-1">{errors.wallet_address}</div>
              )}
            </div>

            <Button 
              variant="outline" 
              type='submit'
              disabled={processing}
            >
              {processing ? 'Sending...' : 'Send'}
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}