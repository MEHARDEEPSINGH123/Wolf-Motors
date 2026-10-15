'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { StorefrontNavbar } from '@/components/navigation/StorefrontNavbar';
import { StorefrontFooter } from '@/components/navigation/StorefrontFooter';
import { useWolfData } from '@/context/WolfDataContext';
import { EcommerceProduct } from '@/types/dataset';
import { formatSGD } from '@/data/dataset';
import { getProductImage } from '@/data/mediaAssets';
import {
  ShoppingBag,
  Search,
  Plus,
  Check,
  X,
  ArrowRight,
} from 'lucide-react';

export default function StoreCataloguePage() {
  const { products, cart, addToCart } = useWolfData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<EcommerceProduct | null>(null);

  // Extract unique categories from products
  const categories = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.category)));
  }, [products]);

  // Filtered products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === 'all' || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  const cartTotalItems = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="bg-white min-h-screen flex flex-col text-gray-950 selection:bg-forest selection:text-white">
      <StorefrontNavbar />

      <main className="flex-1 pt-28 pb-20">
        {/* Merchandise Banner */}
        <section className="bg-[#F8F9FA] border-b border-gray-200 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-forest font-bold">
                OFFICIAL WOLF ATELIER
              </span>
              <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-gray-950 font-sans mt-2">
                Accessories & Merchandise
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 mt-2 max-w-xl">
                Precision lifestyle gear, carbon fiber accessories, and bespoke track apparel bearing the authentic WOLF MOTORS crest.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/store/orders"
                className="px-4 py-2.5 rounded-none bg-white hover:bg-gray-100 border border-gray-300 text-xs uppercase tracking-wider text-gray-800 font-mono transition-colors"
              >
                Orders Registry
              </Link>

              <Link
                href="/store/cart"
                className="px-5 py-2.5 rounded-none bg-forest hover:bg-forest-light text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Cart ({cartTotalItems})</span>
              </Link>
            </div>
          </div>

          {/* Category Pills */}
          <div className="max-w-7xl mx-auto mt-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-t border-gray-200 pt-4">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-1.5 rounded-none text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                selectedCategory === 'all'
                  ? 'bg-forest text-white'
                  : 'bg-white text-gray-700 hover:text-gray-950 border border-gray-200'
              }`}
            >
              All Merchandise ({products.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-none text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-forest text-white'
                    : 'bg-white text-gray-700 hover:text-gray-950 border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Product Catalogue Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          {/* Search bar */}
          <div className="bg-white p-3 rounded-none border border-gray-200 mb-8 max-w-md shadow-sm">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search gloves, carbon mounts, apparel..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-none pl-9 pr-4 py-2 text-xs text-gray-950 placeholder-gray-400 focus:outline-none focus:border-forest"
              />
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const imgUrl = getProductImage(product.id);
              const inCart = cart.find((i) => i.product.id === product.id);

              return (
                <div
                  key={product.id}
                  className="group bg-white rounded-none border border-gray-200 hover:border-forest/60 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-ferrari-card"
                >
                  <div>
                    {/* Image */}
                    <div
                      onClick={() => setSelectedProduct(product)}
                      className="relative h-56 w-full overflow-hidden bg-gray-100 cursor-pointer"
                    >
                      <img
                        src={imgUrl}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95 group-hover:brightness-100"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                      <div className="absolute top-3 left-3">
                        <span className="px-2 py-0.5 rounded-none bg-white/90 backdrop-blur-md text-[10px] font-mono uppercase tracking-widest text-gray-900 border border-gray-200 shadow-sm font-semibold">
                          {product.category}
                        </span>
                      </div>

                      <div className="absolute top-3 right-3">
                        <span className="px-2 py-0.5 rounded-none bg-white/90 text-[10px] font-mono text-gray-800 border border-gray-200 shadow-sm">
                          {product.stock} in stock
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3
                        onClick={() => setSelectedProduct(product)}
                        className="text-sm font-bold uppercase tracking-wider text-gray-950 group-hover:text-forest transition-colors cursor-pointer line-clamp-1"
                      >
                        {product.name}
                      </h3>
                      <p className="text-xs text-gray-600 mt-1.5 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>
                  </div>

                  {/* Footer Rate and Add to Cart */}
                  <div className="p-5 pt-0 flex items-center justify-between border-t border-gray-100 mt-2">
                    <div className="text-lg font-black text-gray-950 font-mono">
                      {formatSGD(product.price_sgd)}
                    </div>

                    <button
                      onClick={() => addToCart(product.id, 1)}
                      className={`px-3.5 py-1.5 rounded-none text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                        inCart
                          ? 'bg-forest/10 border border-forest text-forest hover:bg-forest hover:text-white'
                          : 'bg-forest hover:bg-forest-light text-white shadow-sm'
                      }`}
                    >
                      {inCart ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>In Cart ({inCart.quantity})</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Cart</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* PRODUCT DETAIL MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white border border-gray-200 rounded-none max-w-2xl w-full p-6 sm:p-8 text-gray-950 shadow-2xl relative">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-950 p-1 rounded-none transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="h-64 sm:h-80 rounded-none overflow-hidden bg-gray-100 border border-gray-200">
                <img
                  src={getProductImage(selectedProduct.id)}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-forest font-bold">
                    {selectedProduct.category} COLLECTION
                  </span>
                  <h3 className="text-xl font-bold uppercase tracking-wider text-gray-950 mt-1">
                    {selectedProduct.name}
                  </h3>
                  <div className="text-2xl font-black text-gray-950 font-mono mt-2">
                    {formatSGD(selectedProduct.price_sgd)}
                  </div>
                  <p className="text-xs text-gray-600 mt-3 leading-relaxed">
                    {selectedProduct.description}
                  </p>

                  <div className="mt-4 pt-4 border-t border-gray-200 text-xs font-mono text-gray-600 space-y-1">
                    <div>Product SKU: {selectedProduct.id}</div>
                    <div>Availability: {selectedProduct.stock} Units Available</div>
                    <div>Dispatch: Handled via Central Singapore Hub</div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 flex items-center gap-3">
                  <button
                    onClick={() => {
                      addToCart(selectedProduct.id, 1);
                      setSelectedProduct(null);
                    }}
                    className="flex-1 py-3 rounded-none bg-forest hover:bg-forest-light text-white text-xs font-bold uppercase tracking-widest shadow-sm flex items-center justify-center gap-2 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Item to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <StorefrontFooter />
    </div>
  );
}
