import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const defaultContent = {
  hero: {
    badge: '30+ World Class Amenities | Spacious Balconies for Every Home',
    title: 'THINKING OF A FANTASTIC VICINITY?',
    projectName: 'SKYLINE RESIDENCES',
    smart1bhk: { price: '₹ 49.99 Lacs*', area: '34,999 Sq.Ft.' },
    premium2bhk: { price: '₹ 69.99 Lacs*', area: '34,999 Sq.Ft.' },
    address: 'BBRC No 270/254, Survey No 50, Srinivasanagar Nagar, Hyderabad 500126',
    phone: '90000 272164'
  },
  about: {
    title: 'About Project',
    description: 'Welcome to Eternity, every detail reflects the greatest gesture of luxury that makes life special and memorable. SKYLINE RESIDENCES is an exclusive project that redefines contemporary living. It stands as an embodiment of freedom, perfection, and elegance.\n\nThe project is spread over more than 3 acres and comes with all modern amenities that you would need to live comfortably.',
    btnText: 'Download Brochure'
  },
  amenities: {
    title: 'Amenities',
    subtitle: 'The finest collection of amenities that offer exhilaration, comfort, wellness and luxury design apparent',
    items: [
      { title: 'Gymnasium', icon: '🏋️' },
      { title: 'Kids Play Area', icon: '🎪' },
      { title: 'Kids Play Area', icon: '🛝' },
      { title: 'Jogging Track', icon: '🏃' },
      { title: 'Yoga Deck', icon: '🧘' },
      { title: 'Yoga Deck', icon: '🌿' }
    ],
    btnText: 'View more'
  },
  floorplan: {
    title: 'Floor Plans',
    tabs: ['1 bhk', '2 bhk', '2.5 bhk'],
    area: '760 sq.ft (904 Sq.ft)',
    price: 'Click for price',
    btnText: 'Download Floor Plan'
  },
  nearbyConnectivity: {
    title: 'Nearby Connectivity',
    items: [
      { place: 'HITEC City', distance: '5 km' },
      { place: 'Gachibowli', distance: '4 km' },
      { place: 'Financial District', distance: '6 km' },
      { place: 'International Airport', distance: '28 km' },
      { place: 'Cyber Towers', distance: '5.5 km' },
      { place: 'Rainbow Hospital', distance: '3 km' }
    ]
  },
  developer: {
    title: 'About Developer',
    description: '"Skyline Developers has been consistently building trust through quality construction and timely delivery for over two decades."',
    stats: [
      { value: '6', label: 'Projects' },
      { value: '1.50 LAC', label: 'Sq.ft Delivered' },
      { value: '440+', label: 'Happy Families' },
      { value: '5.79 LAC', label: 'Sq.ft Ongoing' },
      { value: '2 LAC', label: 'Sq.ft Upcoming' }
    ]
  },
  construction: {
    title: 'Construction Updates',
    updates: [
      { label: 'March 2024' },
      { label: 'June 2024' },
      { label: 'December 2024' }
    ]
  },
  faq: {
    title: 'Frequently Asked Questions',
    items: [
      { q: 'What is the location advantage of this project?', a: 'The project is located in Srinivasa Nagar, Hyderabad with excellent connectivity to HITEC City, Gachibowli, and Financial District.' },
      { q: 'What are the available configurations in this project?', a: 'We offer Smart 1 BHK and Premium 2 BHK apartments designed for modern living.' },
      { q: 'What are the home loans available and who are the bankers?', a: 'We have tie-ups with leading banks including SBI, HDFC, ICICI, and Axis Bank for easy home loan facilities.' },
      { q: 'How should you book and what is the payment structure?', a: 'You can book with 10% of the total cost. Flexible payment plans are available based on construction milestones.' }
    ]
  }
};

const ContentContext = createContext();

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState(defaultContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API}/api/content`)
      .then(res => {
        setContent({ ...defaultContent, ...res.data });
      })
      .catch(() => {
        setContent(defaultContent);
      })
      .finally(() => setLoading(false));
  }, []);

  const updateSection = async (section, data, token) => {
    await axios.put(`${API}/api/content/${section}`, { data }, {
      headers: { token }
    });
    setContent(prev => ({ ...prev, [section]: data }));
  };

  return (
    <ContentContext.Provider value={{ content, loading, updateSection }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => useContext(ContentContext);
export { API };
