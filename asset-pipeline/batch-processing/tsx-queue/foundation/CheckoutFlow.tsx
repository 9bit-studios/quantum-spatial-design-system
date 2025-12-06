'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container, Grid, Flex, Card } from './GridSystem';
import { DisplayText, Headline, BodyText, Price, Badge } from './Typography';
import { AnimatedButton } from './PerformanceComponents';
import { useResponsiveGrid } from './ResponsiveHooks';

// Checkout Flow Component - Complete purchase process

export interface CheckoutFlowProps {
  cartItems: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onOrderComplete?: (order: Order) => void;
}

export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  variant?: string;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  province: string;
  country: string;
  zip: string;
  phone?: string;
}

export interface PaymentInfo {
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  nameOnCard: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  orderNumber: string;
}

const SHIPPING_OPTIONS = [
  { id: 'standard', name: 'Standard Shipping', price: 9.99, duration: '5-7 business days' },
  { id: 'expedited', name: 'Expedited Shipping', price: 19.99, duration: '2-3 business days' },
  { id: 'overnight', name: 'Overnight Shipping', price: 39.99, duration: '1 business day' }
];

export const CheckoutFlow: React.FC<CheckoutFlowProps> = ({
  cartItems,
  isOpen,
  onClose,
  onOrderComplete
}) => {
  const [currentStep, setCurrentStep] = useState<'shipping' | 'payment' | 'review' | 'confirmation'>('shipping');
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    firstName: '',
    lastName: '',
    company: '',
    address1: '',
    address2: '',
    city: '',
    province: '',
    country: 'US',
    zip: '',
    phone: ''
  });
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    nameOnCard: ''
  });
  const [selectedShipping, setSelectedShipping] = useState(SHIPPING_OPTIONS[0]);
  const [orderNumber, setOrderNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { isMobile } = useResponsiveGrid();

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = selectedShipping.price;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  const steps = [
    { id: 'shipping', title: 'Shipping', icon: '🚚' },
    { id: 'payment', title: 'Payment', icon: '💳' },
    { id: 'review', title: 'Review', icon: '👁️' },
    { id: 'confirmation', title: 'Complete', icon: '✅' }
  ];

  const handleNextStep = () => {
    const stepOrder = ['shipping', 'payment', 'review', 'confirmation'];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1] as any);
    }
  };

  const handlePreviousStep = () => {
    const stepOrder = ['shipping', 'payment', 'review', 'confirmation'];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1] as any);
    }
  };

  const handleSubmitOrder = async () => {
    setIsProcessing(true);
    
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newOrderNumber = `PG${Date.now().toString().slice(-6)}`;
    setOrderNumber(newOrderNumber);
    
    const order: Order = {
      id: `order_${Date.now()}`,
      items: cartItems,
      shippingAddress,
      subtotal,
      shipping,
      tax,
      total,
      orderNumber: newOrderNumber
    };

    setIsProcessing(false);
    setCurrentStep('confirmation');
    
    if (onOrderComplete) {
      onOrderComplete(order);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 'shipping':
        return shippingAddress.firstName && shippingAddress.lastName && 
               shippingAddress.address1 && shippingAddress.city && 
               shippingAddress.province && shippingAddress.zip;
      case 'payment':
        return paymentInfo.cardNumber && paymentInfo.expiryMonth && 
               paymentInfo.expiryYear && paymentInfo.cvv && paymentInfo.nameOnCard;
      case 'review':
        return true;
      default:
        return false;
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        onClick={currentStep !== 'confirmation' ? onClose : undefined}
      />

      {/* Content */}
      <Container className="relative min-h-screen py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <Card variant="elevated" className="overflow-hidden max-w-4xl mx-auto">
            {/* Header */}
            <div className="p-6 border-b border-white/10">
              <Flex direction="row" justify="between" align="center">
                <div>
                  <DisplayText size="lg">Checkout</DisplayText>
                  <BodyText color="secondary" className="mt-1">
                    Complete your order
                  </BodyText>
                </div>
                
                {currentStep !== 'confirmation' && (
                  <button
                    onClick={onClose}
                    className="nav-action"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                  </button>
                )}
              </Flex>

              {/* Progress Steps */}
              <div className="mt-6">
                <Flex direction="row" justify="between" className="relative">
                  {/* Progress Line */}
                  <div className="absolute top-6 left-0 right-0 h-0.5 bg-white/20" />
                  <motion.div
                    className="absolute top-6 left-0 h-0.5 bg-accent"
                    initial={{ width: '0%' }}
                    animate={{ 
                      width: `${((steps.findIndex(s => s.id === currentStep) + 1) / steps.length) * 100}%` 
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  {steps.map((step, index) => {
                    const isActive = step.id === currentStep;
                    const isCompleted = steps.findIndex(s => s.id === currentStep) > index;
                    
                    return (
                      <div key={step.id} className="relative flex flex-col items-center">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className={`w-12 h-12 rounded-full flex items-center justify-center text-lg relative z-10 ${
                            isCompleted
                              ? 'bg-accent text-white'
                              : isActive
                              ? 'bg-accent text-white'
                              : 'bg-white/10 text-white/60'
                          }`}
                        >
                          {isCompleted ? '✓' : step.icon}
                        </motion.div>
                        <BodyText 
                          size="sm" 
                          weight={isActive ? "semibold" : "normal"}
                          color={isActive || isCompleted ? "primary" : "secondary"}
                          className="mt-2"
                        >
                          {step.title}
                        </BodyText>
                      </div>
                    );
                  })}
                </Flex>
              </div>
            </div>

            {/* Step Content */}
            <div className="p-6">
              <Grid columns={isMobile ? "1" : "3"} gap="xl">
                {/* Main Content */}
                <div className={isMobile ? "order-2" : "col-span-2"}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {currentStep === 'shipping' && (
                        <ShippingForm
                          shippingAddress={shippingAddress}
                          onAddressChange={setShippingAddress}
                          shippingOptions={SHIPPING_OPTIONS}
                          selectedShipping={selectedShipping}
                          onShippingChange={setSelectedShipping}
                        />
                      )}

                      {currentStep === 'payment' && (
                        <PaymentForm
                          paymentInfo={paymentInfo}
                          onPaymentChange={setPaymentInfo}
                        />
                      )}

                      {currentStep === 'review' && (
                        <ReviewOrder
                          cartItems={cartItems}
                          shippingAddress={shippingAddress}
                          selectedShipping={selectedShipping}
                          subtotal={subtotal}
                          shipping={shipping}
                          tax={tax}
                          total={total}
                        />
                      )}

                      {currentStep === 'confirmation' && (
                        <OrderConfirmation
                          orderNumber={orderNumber}
                          total={total}
                          onClose={onClose}
                        />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Order Summary */}
                {currentStep !== 'confirmation' && (
                  <div className={isMobile ? "order-1" : ""}>
                    <OrderSummary
                      cartItems={cartItems}
                      subtotal={subtotal}
                      shipping={shipping}
                      tax={tax}
                      total={total}
                    />
                  </div>
                )}
              </Grid>
            </div>

            {/* Footer Actions */}
            {currentStep !== 'confirmation' && (
              <div className="p-6 border-t border-white/10">
                <Flex direction="row" justify="between" align="center">
                  <div>
                    {currentStep !== 'shipping' && (
                      <AnimatedButton
                        variant="secondary"
                        onClick={handlePreviousStep}
                      >
                        Back
                      </AnimatedButton>
                    )}
                  </div>

                  <div>
                    {currentStep === 'review' ? (
                      <AnimatedButton
                        onClick={handleSubmitOrder}
                        disabled={isProcessing}
                        className="btn-accent-gradient"
                        size="lg"
                      >
                        {isProcessing ? 'Processing...' : `Complete Order - $${total.toFixed(2)}`}
                      </AnimatedButton>
                    ) : (
                      <AnimatedButton
                        onClick={handleNextStep}
                        disabled={!isStepValid()}
                        className="btn-accent-gradient"
                        size="lg"
                      >
                        Continue
                      </AnimatedButton>
                    )}
                  </div>
                </Flex>
              </div>
            )}
          </Card>
        </motion.div>
      </Container>
    </motion.div>
  );
};

// Shipping Form Component
interface ShippingFormProps {
  shippingAddress: ShippingAddress;
  onAddressChange: (address: ShippingAddress) => void;
  shippingOptions: typeof SHIPPING_OPTIONS;
  selectedShipping: typeof SHIPPING_OPTIONS[0];
  onShippingChange: (option: typeof SHIPPING_OPTIONS[0]) => void;
}

const ShippingForm: React.FC<ShippingFormProps> = ({
  shippingAddress,
  onAddressChange,
  shippingOptions,
  selectedShipping,
  onShippingChange
}) => (
  <div className="space-y-8">
    <div>
      <Headline className="mb-6">Shipping Address</Headline>
      
      <div className="space-y-4">
        <Grid columns="2" gap="md">
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              First Name *
            </label>
            <input
              type="text"
              value={shippingAddress.firstName}
              onChange={(e) => onAddressChange({...shippingAddress, firstName: e.target.value})}
              className="input-enhanced"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Last Name *
            </label>
            <input
              type="text"
              value={shippingAddress.lastName}
              onChange={(e) => onAddressChange({...shippingAddress, lastName: e.target.value})}
              className="input-enhanced"
              required
            />
          </div>
        </Grid>

        <div>
          <label className="block text-sm font-medium text-white mb-1">
            Company (Optional)
          </label>
          <input
            type="text"
            value={shippingAddress.company}
            onChange={(e) => onAddressChange({...shippingAddress, company: e.target.value})}
            className="input-enhanced"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-1">
            Address *
          </label>
          <input
            type="text"
            value={shippingAddress.address1}
            onChange={(e) => onAddressChange({...shippingAddress, address1: e.target.value})}
            className="input-enhanced"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-1">
            Apartment, suite, etc. (Optional)
          </label>
          <input
            type="text"
            value={shippingAddress.address2}
            onChange={(e) => onAddressChange({...shippingAddress, address2: e.target.value})}
            className="input-enhanced"
          />
        </div>

        <Grid columns="3" gap="md">
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              City *
            </label>
            <input
              type="text"
              value={shippingAddress.city}
              onChange={(e) => onAddressChange({...shippingAddress, city: e.target.value})}
              className="input-enhanced"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              State *
            </label>
            <input
              type="text"
              value={shippingAddress.province}
              onChange={(e) => onAddressChange({...shippingAddress, province: e.target.value})}
              className="input-enhanced"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              ZIP Code *
            </label>
            <input
              type="text"
              value={shippingAddress.zip}
              onChange={(e) => onAddressChange({...shippingAddress, zip: e.target.value})}
              className="input-enhanced"
              required
            />
          </div>
        </Grid>

        <div>
          <label className="block text-sm font-medium text-white mb-1">
            Phone (Optional)
          </label>
          <input
            type="tel"
            value={shippingAddress.phone}
            onChange={(e) => onAddressChange({...shippingAddress, phone: e.target.value})}
            className="input-enhanced"
          />
        </div>
      </div>
    </div>

    {/* Shipping Options */}
    <div>
      <Headline className="mb-6">Shipping Method</Headline>
      <div className="space-y-3">
        {shippingOptions.map((option) => (
          <motion.div
            key={option.id}
            whileHover={{ scale: 1.01 }}
            onClick={() => onShippingChange(option)}
            className={`p-4 rounded-lg border cursor-pointer transition-all ${
              selectedShipping.id === option.id
                ? 'border-accent bg-accent/10'
                : 'border-white/20 bg-white/5 hover:border-white/40'
            }`}
          >
            <Flex direction="row" justify="between" align="center">
              <div>
                <BodyText weight="medium">{option.name}</BodyText>
                <BodyText size="sm" color="secondary">{option.duration}</BodyText>
              </div>
              <Price amount={option.price} size="md" />
            </Flex>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

// Payment Form Component
interface PaymentFormProps {
  paymentInfo: PaymentInfo;
  onPaymentChange: (payment: PaymentInfo) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  paymentInfo,
  onPaymentChange
}) => (
  <div className="space-y-6">
    <Headline>Payment Information</Headline>
    
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-white mb-1">
          Card Number *
        </label>
        <input
          type="text"
          value={paymentInfo.cardNumber}
          onChange={(e) => onPaymentChange({...paymentInfo, cardNumber: e.target.value})}
          className="input-enhanced"
          placeholder="1234 5678 9012 3456"
          maxLength={19}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white mb-1">
          Name on Card *
        </label>
        <input
          type="text"
          value={paymentInfo.nameOnCard}
          onChange={(e) => onPaymentChange({...paymentInfo, nameOnCard: e.target.value})}
          className="input-enhanced"
          required
        />
      </div>

      <Grid columns="3" gap="md">
        <div>
          <label className="block text-sm font-medium text-white mb-1">
            Month *
          </label>
          <select
            value={paymentInfo.expiryMonth}
            onChange={(e) => onPaymentChange({...paymentInfo, expiryMonth: e.target.value})}
            className="input-enhanced"
            required
          >
            <option value="">MM</option>
            {Array.from({length: 12}, (_, i) => (
              <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                {String(i + 1).padStart(2, '0')}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-1">
            Year *
          </label>
          <select
            value={paymentInfo.expiryYear}
            onChange={(e) => onPaymentChange({...paymentInfo, expiryYear: e.target.value})}
            className="input-enhanced"
            required
          >
            <option value="">YYYY</option>
            {Array.from({length: 10}, (_, i) => {
              const year = new Date().getFullYear() + i;
              return (
                <option key={year} value={year}>
                  {year}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-1">
            CVV *
          </label>
          <input
            type="text"
            value={paymentInfo.cvv}
            onChange={(e) => onPaymentChange({...paymentInfo, cvv: e.target.value})}
            className="input-enhanced"
            placeholder="123"
            maxLength={4}
            required
          />
        </div>
      </Grid>
    </div>
  </div>
);

// Review Order Component
interface ReviewOrderProps {
  cartItems: CartItem[];
  shippingAddress: ShippingAddress;
  selectedShipping: typeof SHIPPING_OPTIONS[0];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

const ReviewOrder: React.FC<ReviewOrderProps> = ({
  cartItems,
  shippingAddress,
  selectedShipping,
  subtotal,
  shipping,
  tax,
  total
}) => (
  <div className="space-y-8">
    <Headline>Review Your Order</Headline>
    
    {/* Order Items */}
    <div>
      <BodyText weight="semibold" className="mb-4">Order Items</BodyText>
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg">
            <img
              src={item.image}
              alt={item.title}
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div className="flex-1">
              <BodyText weight="medium">{item.title}</BodyText>
              {item.variant && (
                <BodyText size="sm" color="secondary">{item.variant}</BodyText>
              )}
              <BodyText size="sm" color="secondary">Qty: {item.quantity}</BodyText>
            </div>
            <Price amount={item.price * item.quantity} />
          </div>
        ))}
      </div>
    </div>

    {/* Shipping Address */}
    <div>
      <BodyText weight="semibold" className="mb-4">Shipping Address</BodyText>
      <div className="p-4 bg-white/5 rounded-lg">
        <BodyText>
          {shippingAddress.firstName} {shippingAddress.lastName}
        </BodyText>
        {shippingAddress.company && (
          <BodyText color="secondary">{shippingAddress.company}</BodyText>
        )}
        <BodyText color="secondary">{shippingAddress.address1}</BodyText>
        {shippingAddress.address2 && (
          <BodyText color="secondary">{shippingAddress.address2}</BodyText>
        )}
        <BodyText color="secondary">
          {shippingAddress.city}, {shippingAddress.province} {shippingAddress.zip}
        </BodyText>
      </div>
    </div>

    {/* Shipping Method */}
    <div>
      <BodyText weight="semibold" className="mb-4">Shipping Method</BodyText>
      <div className="p-4 bg-white/5 rounded-lg">
        <Flex direction="row" justify="between" align="center">
          <div>
            <BodyText>{selectedShipping.name}</BodyText>
            <BodyText size="sm" color="secondary">{selectedShipping.duration}</BodyText>
          </div>
          <Price amount={selectedShipping.price} />
        </Flex>
      </div>
    </div>
  </div>
);

// Order Summary Component
interface OrderSummaryProps {
  cartItems: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  cartItems,
  subtotal,
  shipping,
  tax,
  total
}) => (
  <Card variant="secondary" className="sticky top-6">
    <div className="p-6">
      <Headline className="mb-6">Order Summary</Headline>
      
      <div className="space-y-4 mb-6">
        {cartItems.map((item) => (
          <Flex key={item.id} direction="row" justify="between" align="start">
            <div className="flex-1">
              <BodyText size="sm">{item.title}</BodyText>
              <BodyText size="xs" color="secondary">Qty: {item.quantity}</BodyText>
            </div>
            <Price amount={item.price * item.quantity} size="sm" />
          </Flex>
        ))}
      </div>

      <div className="space-y-3 border-t border-white/10 pt-4">
        <Flex direction="row" justify="between">
          <BodyText color="secondary">Subtotal</BodyText>
          <Price amount={subtotal} size="sm" />
        </Flex>
        <Flex direction="row" justify="between">
          <BodyText color="secondary">Shipping</BodyText>
          <Price amount={shipping} size="sm" />
        </Flex>
        <Flex direction="row" justify="between">
          <BodyText color="secondary">Tax</BodyText>
          <Price amount={tax} size="sm" />
        </Flex>
        <div className="border-t border-white/10 pt-3">
          <Flex direction="row" justify="between">
            <BodyText weight="semibold">Total</BodyText>
            <Price amount={total} size="lg" />
          </Flex>
        </div>
      </div>
    </div>
  </Card>
);

// Order Confirmation Component
interface OrderConfirmationProps {
  orderNumber: string;
  total: number;
  onClose: () => void;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({
  orderNumber,
  total,
  onClose
}) => (
  <div className="text-center space-y-8 py-12">
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5, ease: "backOut" }}
      className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto"
    >
      <span className="text-4xl">✅</span>
    </motion.div>

    <div>
      <DisplayText className="text-green-400 mb-4">Order Confirmed!</DisplayText>
      <BodyText color="secondary" className="mb-6">
        Thank you for your purchase. Your order has been confirmed and will be processed shortly.
      </BodyText>
      
      <div className="bg-white/5 p-6 rounded-lg">
        <BodyText weight="semibold" className="mb-2">Order Number</BodyText>
        <BodyText size="lg" className="font-mono text-accent">{orderNumber}</BodyText>
        <div className="mt-4">
          <BodyText color="secondary" className="mb-1">Total Paid</BodyText>
          <Price amount={total} size="xl" />
        </div>
      </div>
    </div>

    <div className="space-y-4">
      <AnimatedButton
        onClick={onClose}
        className="btn-accent-gradient"
        size="lg"
      >
        Continue Shopping
      </AnimatedButton>
      
      <BodyText size="sm" color="secondary">
        You will receive an email confirmation shortly with tracking information.
      </BodyText>
    </div>
  </div>
);