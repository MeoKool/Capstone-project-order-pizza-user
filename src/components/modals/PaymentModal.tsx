'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CashIcon from '../Icons/CashIcon'
import CreditCard from '../Icons/CreditCard'
import toast from 'react-hot-toast'
import { Button } from '../ui/button'
import { X } from 'lucide-react'
import type { JSX } from 'react'

interface PaymentOption {
  id: string
  name: string
  icon: JSX.Element
}

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (paymentOptionName: string) => void
}

export default function PaymentModal({ isOpen, onClose, onSubmit }: PaymentModalProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const paymentOptions: PaymentOption[] = [
    {
      id: 'cash',
      name: 'Tiền mặt',
      icon: <CashIcon />
    },

    {
      id: 'banking',
      name: 'Thanh toán chuyển khoản',
      icon: <CreditCard />
    }
  ]

  const handleSubmit = () => {
    if (selectedOption) {
      // Find the selected option to get its name
      const selected = paymentOptions.find((option) => option.name === selectedOption)
      if (selected) {
        onSubmit(selected.name)
        toast.success('Đã gửi yêu cầu thanh toán thành công!', {
          duration: 2000,
          position: 'top-center',
          style: {
            background: '#11aa77',
            color: '#fff',
            borderRadius: '10px'
          }
        })
        onClose()
      }
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className='fixed inset-0 bg-black bg-opacity-55 flex items-end justify-center  z-50'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className='bg-white rounded-t-lg bottom-0 w-full overflow-hidden'
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 500 }}
          >
            {/* Header */}
            <div className='px-6 py-4 border-b flex items-center justify-between'>
              <div className='w-[20px]'></div>
              <div className=' flex justify-center items-center '>
                <h2 className='text-lg text-right font-semibold '>Gọi thanh toán</h2>
              </div>

              <Button variant='ghost' size='icon' onClick={onClose}>
                <X className='h-5 w-5' />
                <span className='sr-only'>Close</span>
              </Button>
            </div>

            {/* Content */}
            <div className='p-6'>
              <p className='text-base text-gray-700 mb-4'>Chọn phương thức thanh toán</p>

              {/* Payment Options */}
              <div className='space-y-3'>
                {paymentOptions.map((option) => (
                  <label
                    key={option.id}
                    className={`flex items-center justify-between space-x-3 rounded-lg border p-4 cursor-pointer transition-colors
                      ${selectedOption === option.name ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'}`}
                  >
                    <div className='flex items-center gap-3'>
                      <div
                        className={` rounded-lg ${
                          option.id === 'cash'
                            ? 'bg-blue-100 text-blue-600'
                            : option.id === 'payoo'
                              ? 'bg-red-100 text-red-600'
                              : ''
                        }`}
                      >
                        {option.icon}
                      </div>
                      <span className='text-gray-900'>{option.name}</span>
                    </div>
                    <div className='relative'>
                      <input
                        type='radio'
                        name='payment'
                        value={option.name}
                        id={option.id}
                        checked={selectedOption === option.name}
                        onChange={(e) => setSelectedOption(e.target.value)}
                        className='sr-only'
                      />
                      <div
                        className={`w-5 h-5 border-2 rounded-full ${
                          selectedOption === option.name ? 'border-blue-500' : 'border-gray-300'
                        }`}
                      >
                        {selectedOption === option.name && (
                          <div className='absolute inset-0 flex items-center justify-center'>
                            <div className='w-3 h-3 bg-blue-500 rounded-full'></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </label>
                ))}
              </div>

              {/* Submit Button */}
              <button
                className='w-full mt-6 bg-blue-600 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed'
                onClick={handleSubmit}
                disabled={!selectedOption}
              >
                Gửi yêu cầu
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
