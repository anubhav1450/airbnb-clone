// Static listing content (the clone has no backend; this is the whole dataset).
export const LISTING = {
  title: 'Romantic Jacuzzi 1BHK Candolim | Mirashya UG10',
  subtitle: 'Entire serviced apartment in Candolim, India',
  facts: '3 guests · 1 bedroom · 1 bed · 1 bathroom',
  rating: '4.95',
  reviewCount: 19,
  price: '28,499',
  nights: 5,
  checkIn: '10/18/2026',
  checkOut: '10/23/2026',
  guests: '2 guests',
  freeCancelBefore: '17 October',
  host: 'Mirashya Homes',
  hostSince: '2 years hosting',
}

export const HIGHLIGHTS = [
  { icon: 'hlOutdoor', title: 'Outdoor entertainment', text: 'The pool and alfresco dining are great for summer trips.' },
  { icon: 'hlCool', title: 'Designed for staying cool', text: 'Beat the heat with the A/C and ceiling fan.' },
  { icon: 'hlCheckin', title: 'Self check-in', text: 'You can check in with the building staff.' },
]

export const DESCRIPTION =
  '🌴 Plan Your Relaxing Holiday at Amor De Goa by Mirashya Homes! ✨ Stay in this cozy 1BHK in the heart of Candolim, featuring a private jacuzzi 🛁 for the perfect unwind. Enjoy high-speed WiFi 💻, Smart TV 📺, pet-friendly comfort 🐾, and stylish interiors. Just minutes from Candolim Beach 🏖️, popular cafés, restaurants, and nightlife 🍹, it’s ideal for couples seeking romance, relaxation, and a touch of luxury in North Goa. ❤️🌴'

export const SLEEPING = [
  { img: '67c61c6f-6260-4809-9510-0360e58a345d.jpeg', title: 'Bedroom', text: '1 double bed' },
  { img: 'a9831aeb-f441-44f5-a38f-4cf54e3f0fcf.jpeg', title: 'Living room', text: '1 sofa' },
]

// Amenities shown on the page (the dialog lists all of them).
export const TOP_AMENITIES = [
  'Kitchen',
  'Wifi',
  'Dedicated workspace',
  'Free parking on premises',
  'Pool',
  'Hot tub',
  'Pets allowed',
  'Exterior security cameras on property',
  'Carbon monoxide alarm',
  'Smoke alarm',
]
export const UNAVAILABLE_AMENITIES = ['Carbon monoxide alarm', 'Smoke alarm']

export const RATING_BARS = [
  { star: 5, pct: 95 },
  { star: 4, pct: 5 },
  { star: 3, pct: 0 },
  { star: 2, pct: 0 },
  { star: 1, pct: 0 },
]

export const CATEGORY_SCORES = [
  { label: 'Cleanliness', value: '5.0', icon: 'catCleanliness' },
  { label: 'Accuracy', value: '5.0', icon: 'catAccuracy' },
  { label: 'Check-in', value: '5.0', icon: 'catCheckin' },
  { label: 'Communication', value: '5.0', icon: 'catCommunication' },
  { label: 'Location', value: '4.8', icon: 'catLocation' },
  { label: 'Value', value: '4.8', icon: 'catValue' },
]

export const REVIEW_CHIPS = [
  ['Comfort', 6, 'comfort'],
  ['Accuracy', 5, 'accuracy'],
  ['Hot tub', 5, 'hot-tub'],
  ['Condition', 4, 'condition'],
  ['Hospitality', 8, 'hospitality'],
  ['Cleanliness', 4, 'cleanliness'],
  ['Amenities', 2, 'amenities'],
  ['Decor', 2, 'decor'],
  ['Indoor spaces', 2, 'indoor-spaces'],
  ['Location', 2, 'location'],
].map(([label, count, img]) => ({ label, count, img }))

export const REVIEWS = [
  { name: 'Amit', since: '2 months on Airbnb', when: '1 week ago', initial: 'A', color: '#c1852a', bg: '#f7ede2', text: 'Very helpful and responsive team. Safe and peaceful stay. loved everything about the property.' },
  { name: 'Aheesh', since: '3 years on Airbnb', when: '2 weeks ago', avatar: 'rev1.jpeg', text: 'We had a wonderful stay. The apartment was clean, comfortable, and exactly as shown in the photos. The host was very responsive and helpful throughout our stay. We would definitely recommend this place and would love to stay here again.', clamp: true },
  { name: 'Samiksha', since: '8 months on Airbnb', when: 'May 2026', avatar: 'rev2.jpeg', text: 'the host nitish was really great help' },
  { name: 'Vedant', since: '4 years on Airbnb', when: 'May 2026', initial: 'V', color: '#8b6fc4', bg: '#efeaf7', text: 'We had an amazing stay at this property in Goa! The entire home was spotless and exceptionally well-maintained, making us feel comfortable from the moment we arrived. The cleanliness standards were truly impressive, with every corner of the house looking fresh and pristine.\nThe highlight of our stay was definitely the jacuzzi. It was clean, well-kept, and the perfect place to relax after a day of exploring Goa. It added a luxurious touch to our vacation and made our experience even more memorable.\nThe property was exactly as described, well-equipped, and offered a peaceful atmosphere. We would highly recommend this place to anyone looking for a comfortable, clean, and relaxing stay in Goa. Looking forward to visiting again!', clamp: true },
  { name: 'Vaibhav S', since: '3 years on Airbnb', when: 'May 2026', avatar: 'rev3.jpeg', text: "Great great experience living out there , can't expect more , will always look for it in the future and will recommend my friends too." },
  { name: 'Mohd', since: '5 years on Airbnb', when: 'May 2026', avatar: 'rev4.jpeg', text: 'Great place. Exactly as described in the listing.' },
]

export const NEIGHBOURHOOD =
  'Located in the heart of Candolim, Amor de Goa offers a peaceful stay with easy access to beaches, cafés, and popular attractions.'

export const COHOSTS = [
  { name: 'Sharath', avatar: 'co1.jpg' },
  { name: 'Aman Dev Pahwa', avatar: 'co2.jpg' },
  { name: 'Maria Karen Priyanka', avatar: 'co3.jpg' },
  { name: 'Simran', avatar: 'rev5.jpeg' },
  { name: 'Pallavi', avatar: 'rev1.jpeg' },
  { name: 'Sanyukta', avatar: 'rev2.jpeg' },
  { name: 'Shruti', initial: 'S', color: '#d4356e', bg: '#fde7ef' },
  { name: 'Amisha', initial: 'A', color: '#3a6ecc', bg: '#e7f0fd' },
]

export const THINGS_TO_KNOW = [
  {
    icon: 'ttkCancel',
    title: 'Cancellation policy',
    lines: ['Free cancellation before 17 October. Cancel before check-in on 18 October for a partial refund.', 'Review this host’s full policy for details.'],
    spaced: true,
  },
  { icon: 'ttkRules', title: 'House rules', lines: ['Check-in after 2:00 pm', 'Checkout before 11:00 am', '3 guests maximum'] },
  { icon: 'ttkSafety', title: 'Safety & property', lines: ['Carbon monoxide alarm not reported', 'Smoke alarm not reported', 'Exterior security cameras on property'] },
]

export const SIMILAR = [
  { img: 's1.jpeg', title: 'Beautiful Studio with a view to die for', price: '23,600', rating: '4.91' },
  { img: 's2.jpeg', title: 'NAQAB - 1bhk with private pool', price: '42,218', rating: '4.95' },
  { img: 's3.jpeg', title: 'Greentique Luxury Flat with plunge pool, Calangute', price: '44,506', rating: '4.94' },
  { img: 's4.jpeg', title: 'The Tropical Studio | 5 mins to Beach', price: '22,824', rating: '4.96' },
  { img: 's5.jpeg', title: 'Luxury Casa Bella 1BHK with plunge pool, Calangute', price: '39,942', rating: '4.95' },
  { img: 's6.jpeg', title: 'Kanso by Earthen Window | Jacuzzi | Terrace | Pool', price: '45,648', rating: '5.0' },
  { img: 's2.jpeg', title: 'Luxury Apt | Private Pool | 6 Mins from Beach', price: '48,786', rating: '4.93' },
  { img: 's4.jpeg', title: 'Serendipity Cottage - Calm Stay in Calangute-Baga.', price: '22,824', rating: '4.92' },
]

// Calendar: Oct + Nov 2026. Selected range 18–23 Oct; the listed Nov days are unavailable.
export const CALENDAR = {
  months: [
    { name: 'October 2026', offset: 4, days: 31 },
    { name: 'November 2026', offset: 0, days: 30 },
  ],
  rangeStart: { month: 0, day: 18 },
  rangeEnd: { month: 0, day: 23 },
  unavailable: { 1: [18, 19, 20, 21, 22, 23, 24, 29, 30] },
}
