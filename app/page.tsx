'use client';
import React, { useState, useEffect } from 'react';
import { ShoppingCart, Plus, Minus, Trash2, ChevronDown, Search, X, Heart, Star, Zap, TrendingUp, Eye, ArrowRight } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: 'premium' | 'budget';
  image: string;
  rating: number;
  reviews: number;
  stock: number;
  isNew?: boolean;
  onSale?: boolean;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'info';
}

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [showCart, setShowCart] = useState(false);
  const [sortOrder, setSortOrder] = useState('none');
  const [animatedItems, setAnimatedItems] = useState(new Set<string>());
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'premium' | 'budget'>('all');
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [compareMode, setCompareMode] = useState(false);
  const [compareList, setCompareList] = useState<Product[]>([]);
  const [flyingItems, setFlyingItems] = useState<Set<string>>(new Set());
  const [scrollY, setScrollY] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      if (window.scrollY > 0) setHasScrolled(true);
    };
    setHasScrolled(true);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const products: Product[] = [
    {
      id: '1',
      name: 'Gan 16 Max 3x3',
      price: 349.99,
      category: 'premium',
      image: 'https://i.imgur.com/Sp2iNQn.jpeg',
      rating: 4.9,
      reviews: 234,
      stock: 3,
      isNew: true,
      description: 'أحدث مكعب من GAN مع تقنية MagLev المتطورة'
    },
    {
      id: '2',
      name: 'Moyo Wilong v11 20-BallCore',
      price: 319.99,
      originalPrice: 379.99,
      category: 'premium',
      image: 'https://iili.io/fJVrjX2.webp',
      rating: 4.8,
      reviews: 189,
      stock: 7,
      onSale: true,
      description: 'نظام Ball-Core الثوري لأداء فائق السرعة'
    },
    {
      id: '3',
      name: 'Yoo Cube Deluxe II',
      price: 289.99,
      category: 'premium',
      image: 'https://iili.io/fJV6UoQ.webp',
      rating: 4.7,
      reviews: 156,
      stock: 12,
      description: 'مغناطيسات قوية للتحكم المثالي'
    },
    {
      id: '4',
      name: 'moyo rs3m 2020',
      price: 49.99,
      category: 'budget',
      image: 'https://iili.io/fJVPgmG.webp',
      rating: 4.6,
      reviews: 445,
      stock: 28,
      description: 'الخيار الأمثل للمبتدئين بسعر رائع'
    },
    {
      id: '5',
      name: 'GAN356 ME 3x3',
      price: 59.99,
      category: 'budget',
      image: 'https://iili.io/fJVsx9e.webp',
      rating: 4.5,
      reviews: 312,
      stock: 15,
      description: 'مكعب GAN بسعر معقول وأداء ممتاز'
    },
    {
      id: '6',
      name: 'DaYan GuHong Pro+ 3x3 54mm',
      price: 35.99,
      category: 'budget',
      image: 'https://iili.io/fJVLkrB.jpg',
      rating: 4.4,
      reviews: 267,
      stock: 22,
      onSale: true,
      originalPrice: 45.99,
      description: 'كلاسيكي محسّن بتصميم عصري'
    },
    {
      id: '7',
      name: 'GAN 15 MagLev UV 3x3',
      price: 309.99,
      category: 'premium',
      image: 'https://iili.io/fJVQM4p.webp',
      rating: 4.9,
      reviews: 178,
      stock: 5,
      isNew: true,
      description: 'تقنية MagLev UV للانزلاق الأسطوري'
    },
    {
      id: '8',
      name: 'MoYu Super WeiLong V2 Ball-Core',
      price: 299.99,
      category: 'premium',
      image: 'https://iili.io/fJVtJg2.webp',
      rating: 4.8,
      reviews: 203,
      stock: 8,
      description: 'Ball-Core V2 لأداء استثنائي'
    },
    {
      id: '9',
      name: 'X-Man Tornado V4 Pioneer UV',
      price: 279.99,
      category: 'premium',
      image: 'https://iili.io/fJVDvna.webp',
      rating: 4.7,
      reviews: 145,
      stock: 11,
      onSale: true,
      originalPrice: 319.99,
      description: 'إعصار السرعة مع طلاء UV المتطور'
    },
    {
      id: '10',
      name: 'GAN 12 UI Smart Cube MagLev',
      price: 329.99,
      category: 'premium',
      image: 'https://iili.io/fJVmaLu.webp',
      rating: 4.9,
      reviews: 167,
      stock: 4,
      isNew: true,
      description: 'مكعب ذكي مع تطبيق تتبع الأداء'
    },
    {
      id: '11',
      name: 'MoYu WeiLong AI V11 PowerPod',
      price: 339.99,
      category: 'premium',
      image: 'https://iili.io/fJVpDPa.webp',
      rating: 4.8,
      reviews: 134,
      stock: 6,
      isNew: true,
      description: 'ذكاء اصطناعي مدمج لتحليل الحلول'
    },
    {
      id: '12',
      name: 'GAN 562 5x5 Core Magnets UV',
      price: 259.99,
      category: 'premium',
      image: 'https://iili.io/fJW9eEu.webp',
      rating: 4.7,
      reviews: 98,
      stock: 9,
      description: 'مكعب 5x5 بمغناطيسات Core متطورة'
    },
    {
      id: '13',
      name: 'MoYu RS3M V5 Ball-Core UV',
      price: 79.99,
      category: 'budget',
      image: 'https://iili.io/fJWJVxS.webp',
      rating: 4.7,
      reviews: 389,
      stock: 31,
      isNew: true,
      description: 'أحدث نسخة من RS3M بتقنية Ball-Core'
    },
    {
      id: '14',
      name: 'X-Man Tornado V4 Flagship',
      price: 129.99,
      category: 'budget',
      image: 'https://iili.io/fJW2w9j.webp',
      rating: 4.6,
      reviews: 267,
      stock: 19,
      description: 'نسخة Flagship بسعر معقول'
    },
    {
      id: '15',
      name: 'MoYu YS3M Ball-Core UV',
      price: 89.99,
      category: 'budget',
      image: 'https://iili.io/fJWFFkJ.webp',
      rating: 4.5,
      reviews: 223,
      stock: 24,
      description: 'Ball-Core بسعر لا يُقاوم'
    },
    {
      id: '16',
      name: 'QiYi M Pro V2 UV Coated',
      price: 69.99,
      category: 'budget',
      image: 'https://iili.io/fJWK8V2.webp',
      rating: 4.5,
      reviews: 301,
      stock: 27,
      onSale: true,
      originalPrice: 84.99,
      description: 'طلاء UV فاخر بسعر اقتصادي'
    },
    {
      id: '17',
      name: 'DaYan ZhanChi V5 3x3',
      price: 65.99,
      category: 'budget',
      image: 'https://iili.io/fJWqhTG.webp',
      rating: 4.4,
      reviews: 198,
      stock: 33,
      description: 'عودة الأسطورة بتحديثات عصرية'
    },
    {
      id: '18',
      name: 'YJ MGC2 Beta Ball-Core UV',
      price: 54.99,
      category: 'budget',
      image: 'https://iili.io/fJWBXcP.webp',
      rating: 4.6,
      reviews: 276,
      stock: 21,
      description: 'MGC الجديد بنظام Ball-Core'
    },
  ];

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const addToCart = (product: Product) => {
    setFlyingItems(prev => new Set(prev).add(product.id));
    setTimeout(() => {
      setFlyingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(product.id);
        return newSet;
      });
    }, 800);

    setAnimatedItems(prev => new Set(prev).add(product.id));
    setTimeout(() => {
      setAnimatedItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(product.id);
        return newSet;
      });
    }, 600);

    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        showToast(`تم تحديث الكمية في السلة`);
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      showToast(`تم إضافة ${product.name} إلى السلة`);
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prevCart =>
      prevCart
        .map(item =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const removeFromCart = (id: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
    showToast('تم إزالة المنتج من السلة', 'info');
  };

  const toggleWishlist = (id: string) => {
    setWishlist(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
        showToast('تم إزالة من المفضلة', 'info');
      } else {
        newSet.add(id);
        showToast('تم إضافة للمفضلة');
      }
      return newSet;
    });
  };

  const toggleCompare = (product: Product) => {
    setCompareList(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) {
        return prev.filter(p => p.id !== product.id);
      }
      if (prev.length >= 3) {
        showToast('يمكنك مقارنة 3 منتجات فقط', 'info');
        return prev;
      }
      return [...prev, product];
    });
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'all' || p.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === 'low-to-high') return a.price - b.price;
    if (sortOrder === 'high-to-low') return b.price - a.price;
    if (sortOrder === 'rating') return b.rating - a.rating;
    if (sortOrder === 'popular') return b.reviews - a.reviews;
    return 0;
  });

  const premiumProducts = sortedProducts.filter(p => p.category === 'premium');
  const budgetProducts = sortedProducts.filter(p => p.category === 'budget');

  const relatedProducts = products
    .filter(p => p.id !== selectedProduct?.id && p.category === selectedProduct?.category)
    .slice(0, 3);

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap" rel="stylesheet" />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 relative overflow-hidden" style={{ fontFamily: "'Cairo', sans-serif" }}>
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }} />
        </div>

        <div className="fixed top-24 right-4 z-[60] space-y-2">
          {toasts.map(toast => (
            <div key={toast.id} className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-xl px-6 py-3 shadow-2xl animate-in slide-in-from-right">
              <p className="text-white font-semibold">{toast.message}</p>
            </div>
          ))}
        </div>

        <header className="bg-white/10 backdrop-blur-xl shadow-2xl sticky top-0 z-50 border-b border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="text-5xl animate-bounce">🎲</div>
                <span className="text-4xl font-bold text-white drop-shadow-lg">متجر مكعبات روبيك</span>
              </div>
              <div className="flex items-center gap-3">
                {compareMode && (
                  <button onClick={() => setCompareMode(false)} className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-4 py-2 rounded-full transition-all transform hover:scale-110 shadow-xl border border-white/30 flex items-center gap-2">
                    <X className="w-5 h-5" />
                    إلغاء المقارنة
                  </button>
                )}
                <button onClick={() => setShowCart(!showCart)} className="relative bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all transform hover:scale-110 shadow-xl border border-white/30">
                  <ShoppingCart className="w-6 h-6" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center animate-pulse">
                      {totalItems}
                    </span>
                  )}
                </button>
              </div>
            </div>

            <div className="mt-4 relative">
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="ابحث عن مكعبك المفضل..." className="w-full bg-white/10 backdrop-blur-md text-white placeholder-white/60 px-12 py-3 rounded-xl border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 text-right" dir="rtl" />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex gap-2 flex-wrap">
              <button onClick={() => setActiveFilter('all')} className={`px-6 py-2 rounded-xl font-semibold transition-all transform hover:scale-105 ${activeFilter === 'all' ? 'bg-white/30 backdrop-blur-md text-white border-2 border-white/50' : 'bg-white/10 backdrop-blur-md text-white/80 border border-white/20'}`}>الكل</button>
              <button onClick={() => setActiveFilter('premium')} className={`px-6 py-2 rounded-xl font-semibold transition-all transform hover:scale-105 flex items-center gap-2 ${activeFilter === 'premium' ? 'bg-white/30 backdrop-blur-md text-white border-2 border-white/50' : 'bg-white/10 backdrop-blur-md text-white/80 border border-white/20'}`}>
                <Star className="w-4 h-4" />احترافية
              </button>
              <button onClick={() => setActiveFilter('budget')} className={`px-6 py-2 rounded-xl font-semibold transition-all transform hover:scale-105 flex items-center gap-2 ${activeFilter === 'budget' ? 'bg-white/30 backdrop-blur-md text-white border-2 border-white/50' : 'bg-white/10 backdrop-blur-md text-white/80 border border-white/20'}`}>
                <TrendingUp className="w-4 h-4" />اقتصادية
              </button>
              <button onClick={() => setCompareMode(!compareMode)} className={`px-6 py-2 rounded-xl font-semibold transition-all transform hover:scale-105 ${compareMode ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'bg-white/10 backdrop-blur-md text-white/80 border border-white/20'}`}>
                مقارنة ({compareList.length}/3)
              </button>
            </div>

            <div className="relative">
              <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="appearance-none bg-white/20 backdrop-blur-md text-white px-6 py-3 pl-12 pr-6 rounded-xl border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 cursor-pointer font-semibold shadow-lg text-right" dir="rtl">
                <option value="none" className="bg-gray-800/95 backdrop-blur-md">بدون ترتيب</option>
                <option value="low-to-high" className="bg-gray-800/95 backdrop-blur-md">السعر: من الأقل للأعلى</option>
                <option value="high-to-low" className="bg-gray-800/95 backdrop-blur-md">السعر: من الأعلى للأقل</option>
                <option value="rating" className="bg-gray-800/95 backdrop-blur-md">الأعلى تقييماً</option>
                <option value="popular" className="bg-gray-800/95 backdrop-blur-md">الأكثر مبيعاً</option>
              </select>
              <ChevronDown className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white pointer-events-none" />
            </div>
          </div>
        </div>

        {compareList.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/30 p-6 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-4">مقارنة المنتجات</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {compareList.map(product => (
                  <div key={product.id} className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                    <div className="flex justify-between items-start mb-2">
                      <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-lg" />
                      <button onClick={() => toggleCompare(product)} className="text-white/60 hover:text-white">
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <h4 className="font-bold text-white mb-2">{product.name}</h4>
                    <div className="space-y-1 text-sm text-white/80">
                      <p>السعر: {product.price} ريال</p>
                      <p>التقييم: {product.rating} ⭐</p>
                      <p>المخزون: {product.stock}</p>
                      <p>الفئة: {product.category === 'premium' ? 'احترافي' : 'اقتصادي'}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20 relative z-10">
          {premiumProducts.length > 0 && (
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6 drop-shadow-lg flex items-center gap-3">
                <Zap className="w-8 h-8 text-yellow-400" />المكعبات الاحترافية
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {premiumProducts.map((product, index) => (
                  <div key={product.id} className={`bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden transform transition-all hover:scale-105 border border-white/30 ${animatedItems.has(product.id) ? 'animate-pulse scale-105' : ''} ${flyingItems.has(product.id) ? 'animate-bounce' : ''}`} style={{ opacity: 1, transform: 'translateY(0)', transition: `all 0.6s ease ${index * 0.1}s` }}>
                    <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
                      {product.isNew && <span className="bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">جديد</span>}
                      {product.onSale && <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">تخفيض</span>}
                      {product.stock <= 5 && <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">{product.stock} فقط</span>}
                    </div>
                    <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                      <button onClick={() => toggleWishlist(product.id)} className={`p-2 rounded-full backdrop-blur-sm transition-all transform hover:scale-110 ${wishlist.has(product.id) ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'}`}>
                        <Heart className={`w-5 h-5 ${wishlist.has(product.id) ? 'fill-current' : ''}`} />
                      </button>
                      {compareMode && (
                        <button onClick={() => toggleCompare(product)} className={`p-2 rounded-full backdrop-blur-sm transition-all transform hover:scale-110 ${compareList.find(p => p.id === product.id) ? 'bg-purple-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'}`}>
                          <Eye className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                    <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-8 flex items-center justify-center relative group cursor-pointer overflow-hidden" onClick={() => setSelectedProduct(product)}>
                      <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-xl transform transition-transform group-hover:scale-110" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Eye className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-white/30'}`} />
                          ))}
                        </div>
                        <span className="text-white/80 text-sm">({product.reviews})</span>
                      </div>
                      <div className="mb-3">
                        {product.onSale && product.originalPrice ? (
                          <div>
                            <span className="text-white/60 line-through text-lg ml-2">{product.originalPrice} ريال</span>
                            <span className="text-3xl font-bold text-white">{product.price} ريال</span>
                          </div>
                        ) : (
                          <p className="text-3xl font-bold text-white">{product.price} ريال</p>
                        )}
                      </div>
                      <button onClick={() => addToCart(product)} className="w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-bold py-3 px-4 rounded-xl transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg border border-white/30">
                        <Plus className="w-5 h-5" />أضف للسلة
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {budgetProducts.length > 0 && (
            <section>
              <h2 className="text-3xl font-bold text-white mb-6 drop-shadow-lg flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-green-400" />المكعبات الاقتصادية
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {budgetProducts.map((product, index) => (
                  <div key={product.id} className={`bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden transform transition-all hover:scale-105 border border-white/30 ${animatedItems.has(product.id) ? 'animate-pulse scale-105' : ''} ${flyingItems.has(product.id) ? 'animate-bounce' : ''}`} style={{ opacity: 1, transform: 'translateY(0)', transition: `all 0.6s ease ${index * 0.1}s` }}>
                    <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
                      {product.isNew && <span className="bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">جديد</span>}
                      {product.onSale && <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">تخفيض</span>}
                      {product.stock <= 5 && <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">{product.stock} فقط</span>}
                    </div>
                    <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                      <button onClick={() => toggleWishlist(product.id)} className={`p-2 rounded-full backdrop-blur-sm transition-all transform hover:scale-110 ${wishlist.has(product.id) ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'}`}>
                        <Heart className={`w-5 h-5 ${wishlist.has(product.id) ? 'fill-current' : ''}`} />
                      </button>
                      {compareMode && (
                        <button onClick={() => toggleCompare(product)} className={`p-2 rounded-full backdrop-blur-sm transition-all transform hover:scale-110 ${compareList.find(p => p.id === product.id) ? 'bg-purple-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'}`}>
                          <Eye className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                    <div className="bg-gradient-to-br from-green-400 to-blue-500 p-8 flex items-center justify-center relative group cursor-pointer overflow-hidden" onClick={() => setSelectedProduct(product)}>
                      <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-xl transform transition-transform group-hover:scale-110" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Eye className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-white/30'}`} />
                          ))}
                        </div>
                        <span className="text-white/80 text-sm">({product.reviews})</span>
                      </div>
                      <div className="mb-3">
                        {product.onSale && product.originalPrice ? (
                          <div>
                            <span className="text-white/60 line-through text-lg ml-2">{product.originalPrice} ريال</span>
                            <span className="text-3xl font-bold text-white">{product.price} ريال</span>
                          </div>
                        ) : (
                          <p className="text-3xl font-bold text-white">{product.price} ريال</p>
                        )}
                      </div>
                      <button onClick={() => addToCart(product)} className="w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-bold py-3 px-4 rounded-xl transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg border border-white/30">
                        <Plus className="w-5 h-5" />أضف للسلة
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {sortedProducts.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-white/80 text-xl">لم يتم العثور على منتجات</p>
            </div>
          )}
        </main>

        {selectedProduct && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-[70] flex items-center justify-center p-4" onClick={() => setSelectedProduct(null)}>
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl max-w-2xl w-full border border-white/30 shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center p-6 border-b border-white/20">
                <h2 className="text-2xl font-bold text-white">تفاصيل المنتج</h2>
                <button onClick={() => setSelectedProduct(null)} className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl p-12 flex items-center justify-center overflow-hidden">
                    <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover rounded-xl" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3">{selectedProduct.name}</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-5 h-5 ${i < Math.floor(selectedProduct.rating) ? 'text-yellow-400 fill-current' : 'text-white/30'}`} />
                        ))}
                      </div>
                      <span className="text-white/80">({selectedProduct.reviews} تقييم)</span>
                    </div>
                    <p className="text-white/80 mb-4">{selectedProduct.description}</p>
                    <div className="space-y-2 mb-4 text-white/80">
                      <p>📦 المخزون: {selectedProduct.stock} قطعة</p>
                      <p>🏷️ الفئة: {selectedProduct.category === 'premium' ? 'احترافي' : 'اقتصادي'}</p>
                    </div>
                    <div className="mb-4">
                      {selectedProduct.onSale && selectedProduct.originalPrice ? (
                        <div>
                          <span className="text-white/60 line-through text-xl ml-2">{selectedProduct.originalPrice} ريال</span>
                          <span className="text-4xl font-bold text-white">{selectedProduct.price} ريال</span>
                        </div>
                      ) : (
                        <p className="text-4xl font-bold text-white">{selectedProduct.price} ريال</p>
                      )}
                    </div>
                    <button onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }} className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-105 shadow-2xl flex items-center justify-center gap-2">
                      <Plus className="w-5 h-5" />أضف للسلة
                    </button>
                  </div>
                </div>
                {relatedProducts.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-white/20">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <ArrowRight className="w-5 h-5" />منتجات مشابهة
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      {relatedProducts.map(related => (
                        <div key={related.id} className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20 cursor-pointer hover:bg-white/20 transition-all" onClick={() => setSelectedProduct(related)}>
                          <img src={related.image} alt={related.name} className="w-full h-20 object-cover rounded-lg mb-2" />
                          <p className="text-white text-sm font-semibold text-center">{related.name}</p>
                          <p className="text-white/80 text-xs text-center">{related.price} ريال</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className={`fixed top-0 left-0 h-full w-full md:w-96 bg-white/10 backdrop-blur-xl shadow-2xl transform transition-transform duration-300 z-50 border-r border-white/20 ${showCart ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center p-6 border-b border-white/20">
              <h2 className="text-2xl font-bold text-white">سلة التسوق</h2>
              <button onClick={() => setShowCart(false)} className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="text-center text-white/70 mt-12">
                  <ShoppingCart className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>السلة فارغة</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg" />
                          </div>
                          <h3 className="font-bold text-white mb-1">{item.name}</h3>
                          <p className="text-white/80">{item.price} ريال</p>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="text-red-300 hover:text-red-100 hover:bg-red-500/20 p-2 rounded-lg transition-colors">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 bg-white/10 rounded-lg p-1">
                          <button onClick={() => updateQuantity(item.id, -1)} className="text-white hover:bg-white/20 p-2 rounded transition-colors">
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-white font-bold px-4">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="text-white hover:bg-white/20 p-2 rounded transition-colors">
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <span className="text-white font-bold">{(item.price * item.quantity).toFixed(2)} ريال</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {cart.length > 0 && (
              <div className="border-t border-white/20 p-6 bg-white/5">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-bold text-white">المجموع:</span>
                  <span className="text-2xl font-bold text-white">{totalPrice.toFixed(2)} ريال</span>
                </div>
                <button className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-105 shadow-2xl">
                  إتمام الشراء
                </button>
              </div>
            )}
          </div>
        </div>

        {showCart && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={() => setShowCart(false)} />
        )}
      </div>
    </>
  );
}
