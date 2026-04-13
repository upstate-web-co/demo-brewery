export const SITE = {
  name: 'Copper Rail Brewing Co',
  tagline: 'Craft beer. Live music. Good people.',
  url: 'https://copperrailbrewing.com',
  email: 'hello@copperrailbrewing.com',
  phone: '(864) 555-2739',
  address: '250 Brewery Lane, Greenville, SC 29601',
  hours: {
    mon: 'Closed',
    tue: '4pm – 10pm',
    wed: '4pm – 10pm',
    thu: '4pm – 11pm',
    fri: '2pm – 12am',
    sat: '12pm – 12am',
    sun: '12pm – 8pm',
  },
} as const

export const BRAND = {
  primaryColor: '#D97706',  // Amber
  darkColor: '#1C1917',     // Dark stone
  accentColor: '#78716C',   // Warm gray
} as const

export const TAP_LIST = [
  { name: 'Copper Horse IPA', style: 'West Coast IPA', abv: '6.8%', status: 'pouring' },
  { name: 'Switchback Stout', style: 'Oatmeal Stout', abv: '5.4%', status: 'pouring' },
  { name: 'Railyard Red', style: 'Irish Red Ale', abv: '5.1%', status: 'pouring' },
  { name: 'Depot Wheat', style: 'American Wheat', abv: '4.6%', status: 'pouring' },
  { name: 'Midnight Express', style: 'Barrel-Aged Imperial Stout', abv: '10.2%', status: 'pouring' },
  { name: 'Boxcar Blonde', style: 'Kölsch', abv: '4.8%', status: 'pouring' },
  { name: 'Junction Haze', style: 'New England IPA', abv: '7.1%', status: 'low' },
  { name: 'Signal Light Lager', style: 'Mexican Lager', abv: '4.3%', status: 'pouring' },
]

export const EVENTS = [
  { name: 'Trivia Night', day: 'Every Thursday', time: '7pm', description: 'Free entry. Teams of up to 6. Prizes for top 3.' },
  { name: 'Live Music: The Railyard Sessions', day: 'Friday & Saturday', time: '8pm', description: 'Local bands, rotating weekly. No cover.' },
  { name: 'Sunday Brunch & Brews', day: 'Every Sunday', time: '12pm – 3pm', description: 'Food truck + mimosa flights + chill vibes.' },
  { name: 'Midnight Express Release', day: 'April 26', time: '2pm', description: 'Limited barrel-aged imperial stout. 200 bottles. First come, first served.' },
]
