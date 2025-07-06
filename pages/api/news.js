import { getRandomNews, updateNewsDates } from '../../data/news';

export default function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Get random news and update dates
      const randomNews = getRandomNews();
      const updatedNews = updateNewsDates(randomNews);
      
      res.status(200).json({
        success: true,
        news: updatedNews,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to fetch news'
      });
    }
  } else {
    res.status(405).json({
      success: false,
      error: 'Method not allowed'
    });
  }
} 