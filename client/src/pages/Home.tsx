import { useState } from 'react';
import { Copy, CheckCircle, Banknote, Coins } from 'lucide-react';

/**
 * DESIGN PHILOSOPHY: Midnight Luxury with Emerald Accents
 * - Deep navy backgrounds with emerald green accents
 * - Glassmorphism effects for premium feel
 * - Elegant serif typography (Playfair Display) for headings
 * - Smooth animations and refined interactions
 * - Bento grid layout for wishlist items
 */

interface WishItem {
  id: string;
  title: string;
  price: string;
  excerpt: string;
  image: string;
  details: string;
}

interface PaymentMethod {
  id: string;
  title: string;
  icon: React.ReactNode;
  details: Array<{ label: string; value: string }>;
}

export default function Home() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ show: boolean; message: string }>({
    show: false,
    message: '',
  });

  const wishItems: WishItem[] = [
    {
      id: 'ps5',
      title: 'PlayStation 5',
      price: '$570 (N850,000)',
      excerpt: 'All work and no play makes Jack a dull boy…',
      image: '/images/ps5-card.jpg',
      details:
        'All work and no play makes Jack a dull boy. Khalifa has been working hard all year and needs occasional downtime to reset, recharge, and stay creative.',
    },
    {
      id: 'myslf',
      title: 'Myslf EDP',
      price: '$170 (N250,000)',
      excerpt: 'Elegance is a presence before it\'s a word…',
      image: '/images/fragrance-card.jpg',
      details:
        'The name Khalifa speaks elegance. A refined fragrance is a quiet but powerful expression of confidence and presence.',
    },
    {
      id: 'culinary',
      title: 'Culinary School',
      price: '$670 (N1,000.000)',
      excerpt: 'Teach a man to fish, and you feed him for life…',
      image: '/images/culinary-card.jpg',
      details:
        'Khalifa is a professional chef looking to sharpen pastry and dessert skills. This is an investment in long-term growth and mastery.',
    },
  ];

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'bank',
      title: 'Bank Transfer',
      icon: <Banknote size={24} />,
      details: [
        { label: 'Bank', value: 'Guaranty Trust Bank' },
        { label: 'Name', value: 'Yakub Mohammed' },
        { label: 'Account Number', value: '0225423481' },
      ],
    },
    {
      id: 'usdt',
      title: 'USDT (BEP-20)',
      icon: <Coins size={24} />,
      details: [
        { label: 'Address', value: '0x389f2904973089deea03e6a651d364bc085fee03' },
        { label: 'Network', value: 'Binance Smart Chain (BSC)' },
      ],
    },
    {
      id: 'usdc',
      title: 'USDC (BEP-20)',
      icon: <Coins size={24} />,
      details: [
        { label: 'Address', value: '0x389f2904973089deea03e6a651d364bc085fee03' },
        { label: 'Network', value: 'Binance Smart Chain (BSC)' },
      ],
    },
  ];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      showToast('Copied to clipboard!');
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const showToast = (message: string) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>GoFundKhalifa</h1>
          <p className="tagline">HO HO HO</p>
          <div className="hero-description">
            <p>
              'Tis the season of giving. Khalifa is grateful for life, good health, and the journey so far — but even gratitude leaves room for a few material joys.
            </p>
            <p>
              While the world celebrates in different ways, here's a modest wishlist. It may seem unusual, but then again, someone out there just received a private jet.
            </p>
          </div>
        </div>
      </section>

      {/* Wishlist Section */}
      <section className="container wishlist-section">
        <div className="section-title">
          <h2>What You're Supporting</h2>
          <p className="section-subtitle">Three meaningful wishes for growth and joy</p>
        </div>

        <div className="bento-grid">
          {wishItems.map((item) => (
            <div
              key={item.id}
              className="wish-card"
              onClick={() => setActiveModal(item.id)}
            >
              <div className="wish-image">
                <img src={item.image} alt={item.title} loading="lazy" />
              </div>
              <h3>{item.title}</h3>
              <p className="price">{item.price}</p>
              <p className="excerpt">{item.excerpt}</p>
              <button className="view-details-btn">View Details</button>
            </div>
          ))}
        </div>
      </section>

      {/* Payment Section */}
      <section className="container payment-section">
        <div className="section-title">
          <h2>Support Directly</h2>
          <p className="section-subtitle">Choose your preferred payment method</p>
        </div>

        <div className="payment-grid">
          {paymentMethods.map((method) => (
            <div key={method.id} className="payment-card">
              <h3>
                {method.icon}
                {method.title}
              </h3>

              {method.details.map((detail, index) => (
                <div key={index}>
                  <p className="label">{detail.label}</p>
                  <p className="value">{detail.value}</p>
                </div>
              ))}

              <button
                className={`copy-btn ${copiedId === method.id ? 'copied' : ''}`}
                onClick={() =>
                  handleCopy(
                    method.details[0].value,
                    method.id
                  )
                }
              >
                {copiedId === method.id ? (
                  <>
                    <CheckCircle size={16} />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    Copy {method.title === 'Bank Transfer' ? 'Account' : 'Address'}
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="container">
        <p>© GoFundKhalifa — Transparent. Direct. Simple.</p>
      </footer>

      {/* Modals */}
      {wishItems.map((item) => (
        <div
          key={`modal-${item.id}`}
          className={`modal-overlay ${activeModal === item.id ? 'active' : ''}`}
          onClick={() => setActiveModal(null)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setActiveModal(null)}
            >
              ×
            </button>
            <h3>{item.title}</h3>
            <p className="price">{item.price}</p>
            <p>{item.details}</p>
          </div>
        </div>
      ))}

      {/* Toast Notification */}
      {toast.show && (
        <div className="toast show">
          <CheckCircle size={18} />
          {toast.message}
        </div>
      )}
    </div>
  );
}
