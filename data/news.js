// News configuration for GLG Capital Group
// The first news item (Magnificus partnership) is fixed and won't change
// The other 5 news items can be updated automatically

export const newsData = [
  {
    id: 1,
    date: 'January 15, 2024',
    headline: 'GLG Capital Group and Magnificus Dominus Consulting Sign Strategic Partnership',
    excerpt: 'GLG Capital Group LLC has announced a groundbreaking partnership with Magnificus Dominus Consulting for the exclusive management of share sales. This strategic alliance will revolutionize the equity landscape and provide unprecedented opportunities for qualified participants.',
    tag: 'partnership',
    isFixed: true, // This news item will never change
    priority: 1
  },
  {
    id: 2,
    date: 'January 12, 2024',
    headline: 'Global Markets Show Strong Recovery in Q1 2024',
    excerpt: 'International markets are demonstrating remarkable resilience with major indices reaching new highs. Analysts predict continued growth in luxury financial sectors, particularly in exclusive equity instruments and premium asset classes.',
    tag: 'markets',
    isFixed: false,
    priority: 2
  },
  {
    id: 3,
    date: 'January 10, 2024',
    headline: 'Digital Asset Regulation Advances in European Union',
    excerpt: 'The European Union has implemented new comprehensive regulations for digital assets and tokenized equity products. This regulatory framework provides enhanced security and transparency for institutional-grade digital financial products.',
    tag: 'regulation',
    isFixed: false,
    priority: 3
  },
  {
    id: 4,
    date: 'January 8, 2024',
    headline: 'Luxury Financial Sector Reaches Record Highs',
    excerpt: 'The luxury financial market has achieved unprecedented growth, with high-net-worth individuals increasingly seeking exclusive equity opportunities. Premium financial products are showing exceptional performance and stability.',
    tag: 'luxury',
    isFixed: false,
    priority: 4
  },
  {
    id: 5,
    date: 'January 5, 2024',
    headline: 'Blockchain Technology Revolutionizes Equity Management',
    excerpt: 'Advanced blockchain solutions are transforming how institutional participants manage and track their portfolios. GLG Capital Group leads the industry with innovative blockchain-based equity platforms and secure tokenization services.',
    tag: 'technology',
    isFixed: false,
    priority: 5
  },
  {
    id: 6,
    date: 'January 3, 2024',
    headline: 'Exclusive Financial Opportunities in Emerging Markets',
    excerpt: 'Emerging markets are presenting unique financial opportunities for sophisticated participants. GLG Capital Group\'s strategic partnerships provide exclusive access to high-growth sectors in developing economies with exceptional return potential.',
    tag: 'emerging',
    isFixed: false,
    priority: 6
  }
];

// Alternative news items that can replace the non-fixed ones
export const alternativeNews = [
  {
    id: 7,
    date: 'January 20, 2024',
    headline: 'Institutional Participants Increase Crypto Allocation by 40%',
    excerpt: 'Major institutional participants are significantly increasing their cryptocurrency allocations, with a 40% year-over-year growth. This trend reflects growing confidence in digital assets as a legitimate financial class.',
    tag: 'markets',
    priority: 2
  },
  {
    id: 8,
    date: 'January 18, 2024',
    headline: 'Sustainable Finance Regulations Strengthen Global Standards',
    excerpt: 'New international standards for sustainable finance are being implemented worldwide, creating opportunities for ESG-focused financial products. GLG Capital Group is at the forefront of sustainable equity solutions.',
    tag: 'regulation',
    priority: 3
  },
  {
    id: 9,
    date: 'January 16, 2024',
    headline: 'Private Equity Deals Reach Record $1.2 Trillion',
    excerpt: 'Global private equity transactions have reached unprecedented levels, with deal volume exceeding $1.2 trillion. This surge reflects strong participant appetite for alternative financial opportunities.',
    tag: 'luxury',
    priority: 4
  },
  {
    id: 10,
    date: 'January 14, 2024',
    headline: 'AI-Powered Financial Platforms Show 300% Growth',
    excerpt: 'Artificial intelligence is revolutionizing financial decision-making, with AI-powered platforms showing 300% growth in adoption. GLG Capital Group integrates cutting-edge AI technology in its equity strategies.',
    tag: 'technology',
    priority: 5
  },
  {
    id: 11,
    date: 'January 12, 2024',
    headline: 'Asian Markets Lead Global Financial Recovery',
    excerpt: 'Asian markets are leading the global financial recovery, with particularly strong performance in technology and healthcare sectors. Strategic partnerships in the region are creating exceptional opportunities.',
    tag: 'emerging',
    priority: 6
  },
  {
    id: 12,
    date: 'January 10, 2024',
    headline: 'Tokenization of Real Assets Gains Momentum',
    excerpt: 'The tokenization of real estate and other physical assets is gaining significant momentum, with institutional adoption increasing by 150%. This trend is creating new financial opportunities for qualified participants.',
    tag: 'technology',
    priority: 5
  },
  {
    id: 13,
    date: 'January 8, 2024',
    headline: 'Central Bank Digital Currencies Enter Mainstream',
    excerpt: 'Central Bank Digital Currencies (CBDCs) are entering mainstream adoption, with major economies launching pilot programs. This development is reshaping the global financial landscape.',
    tag: 'regulation',
    priority: 3
  },
  {
    id: 14,
    date: 'January 6, 2024',
    headline: 'Luxury Real Estate Financial Yields Exceed 15%',
    excerpt: 'Luxury real estate financial products are delivering exceptional returns, with yields exceeding 15% in prime markets. High-net-worth individuals are increasingly allocating capital to premium property assets.',
    tag: 'luxury',
    priority: 4
  }
];

// Function to get random news items (excluding the fixed Magnificus news)
export function getRandomNews() {
  const fixedNews = newsData.filter(news => news.isFixed);
  const nonFixedNews = [...newsData.filter(news => !news.isFixed), ...alternativeNews];
  
  // Shuffle the non-fixed news
  const shuffled = nonFixedNews.sort(() => 0.5 - Math.random());
  
  // Take the first 5 non-fixed news items
  const selectedNews = shuffled.slice(0, 5);
  
  // Combine fixed news with random news
  return [...fixedNews, ...selectedNews];
}

// Function to update news dates to current dates
export function updateNewsDates(newsArray) {
  const today = new Date();
  const updatedNews = newsArray.map((news, index) => {
    if (news.isFixed) {
      return news; // Don't change the Magnificus news date
    }
    
    // Calculate a date that's a few days ago
    const newsDate = new Date(today);
    newsDate.setDate(today.getDate() - (index * 2 + 1));
    
    return {
      ...news,
      date: newsDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    };
  });
  
  return updatedNews;
} 