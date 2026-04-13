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
  { name: 'Copper Horse IPA', style: 'West Coast IPA', abv: '6.8%', ibu: 65, status: 'pouring', notes: 'Bright citrus and pine hop character with a clean, dry finish. Our flagship.' },
  { name: 'Switchback Stout', style: 'Oatmeal Stout', abv: '5.4%', ibu: 30, status: 'pouring', notes: 'Silky smooth with roasted coffee and dark chocolate. Creamy mouthfeel from the oats.' },
  { name: 'Railyard Red', style: 'Irish Red Ale', abv: '5.1%', ibu: 22, status: 'pouring', notes: 'Toasty caramel malt with a hint of toffee. Easy-drinking and balanced.' },
  { name: 'Depot Wheat', style: 'American Wheat', abv: '4.6%', ibu: 15, status: 'pouring', notes: 'Light, crisp, and refreshing with subtle citrus notes. Perfect patio beer.' },
  { name: 'Midnight Express', style: 'Barrel-Aged Imperial Stout', abv: '10.2%', ibu: 55, status: 'pouring', notes: 'Aged 12 months in bourbon barrels. Rich vanilla, oak, and dark fruit. Sip slowly.' },
  { name: 'Boxcar Blonde', style: 'Kölsch', abv: '4.8%', ibu: 20, status: 'pouring', notes: 'German-style ale, light and crisp with delicate floral hops. Crowd favorite.' },
  { name: 'Junction Haze', style: 'New England IPA', abv: '7.1%', ibu: 45, status: 'low', notes: 'Juicy tropical fruit — mango, pineapple, peach. Soft, pillowy mouthfeel. Hazy gold.' },
  { name: 'Signal Light Lager', style: 'Mexican Lager', abv: '4.3%', ibu: 12, status: 'pouring', notes: 'Clean, light-bodied lager with a touch of lime zest. Best with a lime wedge.' },
]

export const EVENTS = [
  { name: 'Trivia Night', day: 'Every Thursday', time: '7pm', description: 'Free entry. Teams of up to 6. Prizes for top 3.' },
  { name: 'Live Music: The Railyard Sessions', day: 'Friday & Saturday', time: '8pm', description: 'Local bands, rotating weekly. No cover.' },
  { name: 'Sunday Brunch & Brews', day: 'Every Sunday', time: '12pm – 3pm', description: 'Food truck + mimosa flights + chill vibes.' },
  { name: 'Midnight Express Release', day: 'April 26', time: '2pm', description: 'Limited barrel-aged imperial stout. 200 bottles. First come, first served.' },
]
