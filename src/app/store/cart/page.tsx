'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { StorefrontNavbar } from '@/components/navigation/StorefrontNavbar';
import { StorefrontFooter } from '@/components/navigation/StorefrontFooter';
import { useWolfData } from '@/context/WolfDataContext';
import { formatSGD } from '@/data/dataset';
import { getProductImage } from '@/data/mediaAssets';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  Truck,
} from 'lucide-react';

export default function StoreCartPage() {
  const router = useRouter();
  const { cart, updateCartQuantity, removeFromCart, clearCart, checkoutCart } = useWolfData();

  // Checkout Form State
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [customerName, setCustomerName] = useState('Alexander Wong');
  const [customerEmail, setCustomerEmail] = useState('alex.wong@example.sg');
  const [customerPhone, setCustomerPhone] = useState('+65 8234 5678');
  const [deliveryAddress, setDeliveryAddress] = useState('15 Marina Boulevard, The Sail #42-01, Singapore 018987');
  const [agreeDemo, setAgreeDemo] = useState(true);

  // Calculations
  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.product.price_sgd * item.quantity, 0);
  }, [cart]);

  const shipping = subtotal > 150 ? 0 : subtotal > 0 ? 8 : 0;
  const total = subtotal + shipping;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeDemo) return;

    const order = checkoutCart({
      name: customerName,
      email: customerEmail,
      phone: customerPhone,
      address: deliveryAddress,
    });

    if (order) {
      router.push(`/store/orders?newOrderId=${order.id}`);
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col text-gray-950 selection:bg-forest selection:text-white">
      <StorefrontNavbar />

      <main className="flex-1 pt-28 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="border-b border-gray-200 pb-6 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-forest font-bold">
                SHOPPING BAG
              </span>
              <h1 className="text-3xl font-black uppercase tracking-tight text-gray-950 mt-1">
                Your Atelier Cart ({cart.reduce((s, i) => s + i.quantity, 0)} Items)
              </h1>
            </div>

            <Link
              href="/store"
              className="text-xs uppercase tracking-widest font-semibold text-gray-600 hover:text-gray-950 flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Continue Shopping</span>
            </Link>
          </div>

          {cart.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Cart Items Column (7 cols) */}
              <div className="lg:col-span-7 space-y-4">
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="p-4 bg-white rounded-none border border-gray-200 flex items-center justify-between gap-4 shadow-ferrari-card"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 rounded-none overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                          <img
                            src={getProductImage(item.product.id)}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500 font-semibold">
                            {item.product.category}
                          </span>
                          <h4 className="text-sm font-bold uppercase text-gray-950">
                            {item.product.name}
                          </h4>
                          <span className="text-xs font-mono text-forest font-bold">
                            {formatSGD(item.product.price_sgd)} each
                          </span>
                        </div>
                      </div>

                      {/* Quantity & Delete Controls */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-none border border-gray-200">
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                            className="w-6 h-6 rounded-none hover:bg-gray-200 flex items-center justify-center text-gray-700 hover:text-gray-950 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-mono font-bold text-gray-950">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                            className="w-6 h-6 rounded-none hover:bg-gray-200 flex items-center justify-center text-gray-700 hover:text-gray-950 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="text-right font-mono text-sm font-bold text-gray-950 min-w-[70px]">
                          {formatSGD(item.product.price_sgd * item.quantity)}
                        </div>

                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-gray-400 hover:text-crimson p-1 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-2">
                  <button
                    onClick={clearCart}
                    className="text-xs text-gray-500 hover:text-crimson uppercase tracking-wider font-mono transition-colors"
                  >
                    Clear Entire Cart
                  </button>
                  <div className="text-xs font-mono text-gray-600 flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-forest" />
                    <span>Complimentary Singapore courier on orders over SGD 150</span>
                  </div>
                </div>
              </div>

              {/* Order Summary & Demo Checkout Column (5 cols) */}
              <div className="lg:col-span-5">
                <div className="bg-white rounded-none border border-gray-200 p-6 shadow-ferrari-card space-y-6">
                  <h3 className="text-base font-bold uppercase tracking-wider text-gray-950 pb-3 border-b border-gray-200">
                    Order Summary
                  </h3>

                  <div className="space-y-2 text-xs font-mono">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal:</span>
                      <span className="text-gray-950 font-bold">{formatSGD(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Standard Singapore Courier:</span>
                      <span className="text-gray-950">
                        {shipping === 0 ? <strong className="text-forest font-bold">FREE</strong> : formatSGD(shipping)}
                      </span>
                    </div>
                    <div className="pt-3 border-t border-gray-200 flex justify-between text-base font-bold text-gray-950">
                      <span>Estimated Total (SGD):</span>
                      <span className="text-forest text-lg font-black">{formatSGD(total)}</span>
                    </div>
                  </div>

                  {!isCheckingOut ? (
                    <button
                      onClick={() => setIsCheckingOut(true)}
                      className="w-full py-4 rounded-none bg-forest hover:bg-forest-light text-white text-xs font-bold uppercase tracking-[0.2em] shadow-sm transition-all flex items-center justify-center gap-2"
                    >
                      <span>Proceed To Demo Checkout</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    /* Checkout Form */
                    <form onSubmit={handleCheckoutSubmit} className="space-y-4 pt-4 border-t border-gray-200 font-mono text-xs animate-in fade-in">
                      <h4 className="text-xs uppercase font-bold tracking-wider text-gray-950">
                        Singapore Delivery Information
                      </h4>

                      <div>
                        <label className="text-[10px] uppercase text-gray-600 block mb-1">Full Name</label>
                        <input
                          type="text"
                          required
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          className="w-full bg-gray-50 border border-gray-300 rounded-none p-2 text-gray-950 focus:outline-none focus:border-forest"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] uppercase text-gray-600 block mb-1">Email</label>
                          <input
                            type="email"
                            required
                            value={customerEmail}
                            onChange={(e) => setCustomerEmail(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-300 rounded-none p-2 text-gray-950 focus:outline-none focus:border-forest"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase text-gray-600 block mb-1">Phone</label>
                          <input
                            type="text"
                            required
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-300 rounded-none p-2 text-gray-950 focus:outline-none focus:border-forest"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] uppercase text-gray-600 block mb-1">
                          Delivery Address (Singapore)
                        </label>
                        <textarea
                          rows={2}
                          required
                          value={deliveryAddress}
                          onChange={(e) => setDeliveryAddress(e.target.value)}
                          className="w-full bg-gray-50 border border-gray-300 rounded-none p-2 text-gray-950 focus:outline-none focus:border-forest"
                        />
                      </div>

                      <div className="p-3 bg-gray-50 rounded-none border border-gray-200">
                        <label className="flex items-start gap-2.5 text-[11px] text-gray-700 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={agreeDemo}
                            onChange={(e) => setAgreeDemo(e.target.checked)}
                            className="accent-forest mt-0.5"
                          />
                          <span>
                            <strong>Demo Simulation Notice:</strong> This purchase creates a demo order in our system. No payment card is collected or charged.
                          </span>
                        </label>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setIsCheckingOut(false)}
                          className="px-4 py-3 rounded-none border border-gray-300 text-gray-700 hover:text-gray-950 hover:bg-gray-100 text-xs font-bold uppercase transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={!agreeDemo}
                          className="flex-1 py-3 rounded-none bg-forest hover:bg-forest-light disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-colors"
                        >
                          Confirm Demo Order
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Empty Cart View */
            <div className="text-center py-20 bg-white rounded-none border border-gray-200 p-8 max-w-lg mx-auto shadow-ferrari-card">
              <ShoppingBag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold uppercase text-gray-950">Your Cart Is Empty</h3>
              <p className="text-xs text-gray-600 mt-2">
                Discover authentic carbon fibre gear, track gloves, and handcrafted travel duffels in our boutique.
              </p>
              <Link
                href="/store"
                className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 rounded-none bg-forest hover:bg-forest-light text-white text-xs font-bold uppercase tracking-widest shadow-sm transition-all"
              >
                <span>Browse Merchandise</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </main>

      <StorefrontFooter />
    </div>
  );
}
