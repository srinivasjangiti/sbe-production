export interface PropertyData {
  id: number
  image: string
  images?: string[]
  price: string
  priceNum?: number
  beds: number
  baths: number
  sqft: string
  address: string
  city: string
  state?: string
  zip?: string
  tag?: string
  tagColor?: string
  /** Full subtype string e.g. "Apartment", "Office Space", "Factory / Industrial Shed" */
  type?: string
  /** Top-level category */
  category?: "residential" | "commercial" | "industrial"
  yearBuilt?: number
  lotSize?: string
  description?: string
  features?: string[]
  listingAgent?: AgentData
  isRental?: boolean
  rentPrice?: string
  status?: "for-sale" | "for-rent" | "sold" | "pending"
  daysOnMarket?: number
  zestimate?: string
  monthlyPayment?: string
  hoaFee?: string
  garage?: number
  stories?: number
  heating?: string
  cooling?: string
  parking?: string
  lat?: number
  lng?: number
  isFeatured?: boolean
  isTrending?: boolean
  /** Listing placement flags */
  isForSale?: boolean
  isForRent?: boolean
  /** Property-specific details */
  facing?: string
  furnishing?: string
  floor?: number
  totalFloors?: number
  availableFrom?: string
  securityDeposit?: string
  maintenanceCharges?: string
  lockInPeriod?: string
  landmark?: string
  locality?: string
  possessionDate?: string
  ageOfProperty?: string
}

export interface AgentData {
  id: number
  name: string
  image: string
  phone: string
  email: string
  company: string
  rating: number
  reviewCount: number
  salesCount: number
  bio: string
  specialties: string[]
  areas: string[]
  yearsExperience: number
}

export const agents: AgentData[] = [
  {
    id: 1,
    name: "Anju Jangiti",
    image: "/images/logo.png",
    phone: "7767805544",
    email: "anjujangiti@gmail.com",
    company: "Shree Balaji Enterprises",
    rating: 5.0,
    reviewCount: 1000,
    salesCount: 500,
    bio: "With over 15 years of experience in real estate, Anju founded Shree Balaji Enterprises (Established 2016) on the foundation of trust, transparency, and personal service. Her deep understanding of the local market and commitment to client satisfaction has helped thousands of families find their perfect property across the Mumbai Metropolitan Region.",
    specialties: ["Residential", "Commercial", "Industrial"],
    areas: ["Ambernath", "Badlapur", "Thane", "Mumbai", "Navi Mumbai"],
    yearsExperience: 15,
  },
]

const IK_BASE = "https://ik.imagekit.io/shreebalaji"

export const buyProperties: PropertyData[] = [
  {
    id: 1,
    image: `${IK_BASE}/Ishwar%20Subhalaxmi/WhatsApp%20Image%202026-02-24%20at%201.35.31%20PM.jpeg?tr=w-800,h-600,q-85,fo-auto`,
    images: [
      `${IK_BASE}/Ishwar%20Subhalaxmi/WhatsApp%20Image%202026-02-24%20at%201.35.31%20PM.jpeg?tr=w-800,h-600,q-85,fo-auto`,
      `${IK_BASE}/Ishwar%20Subhalaxmi/WhatsApp%20Image%202026-02-24%20at%201.35.32%20PM.jpeg?tr=w-800,h-600,q-85,fo-auto`,
      `${IK_BASE}/Ishwar%20Subhalaxmi/WhatsApp%20Image%202026-02-24%20at%201.35.33%20PM.jpeg?tr=w-800,h-600,q-85,fo-auto`,
      `${IK_BASE}/Ishwar%20Subhalaxmi/WhatsApp%20Image%202026-02-24%20at%201.35.34%20PM.jpeg?tr=w-800,h-600,q-85,fo-auto`,
      `${IK_BASE}/Ishwar%20Subhalaxmi/WhatsApp%20Image%202026-02-24%20at%201.35.35%20PM.jpeg?tr=w-800,h-600,q-85,fo-auto`,
      `${IK_BASE}/Ishwar%20Subhalaxmi/WhatsApp%20Image%202026-02-24%20at%201.35.36%20PM.jpeg?tr=w-800,h-600,q-85,fo-auto`,
      `${IK_BASE}/Ishwar%20Subhalaxmi/WhatsApp%20Image%202026-02-24%20at%201.35.37%20PM.jpeg?tr=w-800,h-600,q-85,fo-auto`,
      `${IK_BASE}/Ishwar%20Subhalaxmi/WhatsApp%20Image%202026-02-24%20at%201.35.38%20PM.jpeg?tr=w-800,h-600,q-85,fo-auto`,
    ],
    price: "Contact for Price",
    beds: 0,
    baths: 0,
    sqft: "On Request",
    address: "Ishwar Subhalaxmi",
    city: "Ambernath",
    state: "Maharashtra",
    tag: "For Sale",
    tagColor: "primary",
    type: "house",
    description: "Premium residential property in Ambernath. Ready to Move. Contact Shree Balaji Enterprises for complete details, site visits, and pricing information. RERA Registered Agency – Reg No: A51700023633.",
    features: ["Residential", "Premium", "Ready to Move"],
    listingAgent: agents[0],
    status: "for-sale",
    daysOnMarket: 7,
    lat: 19.197,
    lng: 73.191,
    isFeatured: true,
    isTrending: true,
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop&auto=format",
    price: "₹45 Lakh",
    priceNum: 4500000,
    beds: 2,
    baths: 1,
    sqft: "850",
    address: "Greenwood Heights",
    city: "Badlapur",
    state: "Maharashtra",
    tag: "For Sale",
    tagColor: "primary",
    type: "apartment",
    description: "Spacious 2BHK apartment in the heart of Badlapur with modern amenities, close to railway station. Ideal for first-time home buyers.",
    features: ["2 BHK", "Near Station", "Ready to Move"],
    listingAgent: agents[0],
    status: "for-sale",
    daysOnMarket: 3,
    lat: 19.161,
    lng: 73.231,
    isFeatured: true,
    isTrending: true,
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop&auto=format",
    price: "₹72 Lakh",
    priceNum: 7200000,
    beds: 3,
    baths: 2,
    sqft: "1200",
    address: "Royal Residency",
    city: "Ambernath",
    state: "Maharashtra",
    tag: "New Launch",
    tagColor: "primary",
    type: "apartment",
    description: "Luxurious 3BHK in a gated community with 24/7 security, clubhouse, and landscaped gardens. Prime location in Ambernath East.",
    features: ["3 BHK", "Gated Community", "Clubhouse"],
    listingAgent: agents[0],
    status: "for-sale",
    daysOnMarket: 1,
    lat: 19.205,
    lng: 73.198,
    isFeatured: true,
    isTrending: true,
  },








  {
    id: 4,
    image: "/images/properties/ambernath/empire-centrum/whatsapp-image-2026-10-25-at-5.49.51-pm-2.jpg",
    images: [
          "/images/properties/ambernath/empire-centrum/whatsapp-image-2026-10-25-at-5.49.51-pm-2.jpg",
          "/images/properties/ambernath/empire-centrum/whatsapp-image-2026-10-25-at-5.49.51-pm-1.jpg",
          "/images/properties/ambernath/empire-centrum/whatsapp-image-2026-10-25-at-5.49.51-pm-3.jpg",
          "/images/properties/ambernath/empire-centrum/whatsapp-image-2026-10-25-at-5.49.51-pm.jpg",
          "/images/properties/ambernath/empire-centrum/whatsapp-image-2026-10-25-at-5.49.52-pm-1.jpg",
          "/images/properties/ambernath/empire-centrum/whatsapp-image-2026-10-25-at-5.49.52-pm-2.jpg",
          "/images/properties/ambernath/empire-centrum/whatsapp-image-2026-10-25-at-5.49.52-pm.jpg",
          "/images/properties/ambernath/empire-centrum/whatsapp-image-2026-10-25-at-5.49.53-pm-1.jpg",
          "/images/properties/ambernath/empire-centrum/whatsapp-image-2026-10-25-at-5.49.53-pm-2.jpg",
          "/images/properties/ambernath/empire-centrum/whatsapp-image-2026-10-25-at-5.49.53-pm.jpg",
          "/images/properties/ambernath/empire-centrum/whatsapp-image-2026-10-25-at-5.49.54-pm-1.jpg",
          "/images/properties/ambernath/empire-centrum/whatsapp-image-2026-10-25-at-5.49.54-pm.jpg"
    ],
    price: "Contact for Price",
    beds: 0,
    baths: 0,
    sqft: "On Request",
    address: "Empire Centrum",
    city: "Ambernath",
    state: "Maharashtra",
    tag: "Commercial",
    tagColor: "primary",
    type: "Office",
    category: "commercial",
    description: "Prime commercial property and corporate office spaces in Ambernath at Empire Centrum. Advanced commercial infrastructure, strategic transit connectivity, and modern business facilities. Contact Shree Balaji Enterprises for floor plans, available units, and site visits. RERA Registered Agency – Reg No: A51700023633.",
    features: ["Commercial Complex","High Footfall","Elevators","Power Backup","Visitor Parking","24x7 Security"],
    listingAgent: agents[0],
    status: "for-sale",
    daysOnMarket: 5,
    lat: 19.202,
    lng: 73.195,
    isFeatured: true,
    isTrending: true,
    isForSale: true,
  },
  {
    id: 5,
    image: "/images/properties/ambernath/empire-homes/cbfjy.jpg",
    images: [
          "/images/properties/ambernath/empire-homes/cbfjy.jpg",
          "/images/properties/ambernath/empire-homes/bcggc-bkvchkfy.jpg",
          "/images/properties/ambernath/empire-homes/cbgjt.jpg",
          "/images/properties/ambernath/empire-homes/cfbgnj.jpg",
          "/images/properties/ambernath/empire-homes/cgdht.jpg",
          "/images/properties/ambernath/empire-homes/fgrt6u.jpg",
          "/images/properties/ambernath/empire-homes/fszdsvr.jpg",
          "/images/properties/ambernath/empire-homes/fyjfgc.jpg",
          "/images/properties/ambernath/empire-homes/gbuo.jpg",
          "/images/properties/ambernath/empire-homes/ghky-bg.jpg",
          "/images/properties/ambernath/empire-homes/ghkyt7itn.jpg",
          "/images/properties/ambernath/empire-homes/guj-lyp.jpg",
          "/images/properties/ambernath/empire-homes/hgygjmlp.jpg",
          "/images/properties/ambernath/empire-homes/jb-jmluyo88ujml.jpg",
          "/images/properties/ambernath/empire-homes/srfbg.jpg",
          "/images/properties/ambernath/empire-homes/vhgfkyit.jpg",
          "/images/properties/ambernath/empire-homes/vhk.jpg",
          "/images/properties/ambernath/empire-homes/vhkj.jpg",
          "/images/properties/ambernath/empire-homes/vhmykf.jpg",
          "/images/properties/ambernath/empire-homes/vhykgb.jpg",
          "/images/properties/ambernath/empire-homes/vhykmhn-v.jpg",
          "/images/properties/ambernath/empire-homes/whatsapp-image-2026-10-25-at-5.54.15-pm.jpg",
          "/images/properties/ambernath/empire-homes/whatsapp-image-2026-10-25-at-5.54.18-pm.jpg",
          "/images/properties/ambernath/empire-homes/whatsapp-image-2026-10-25-at-5.54.21-pm.jpg",
          "/images/properties/ambernath/empire-homes/whatsapp-image-2026-10-25-at-5.54.26-pm.jpg",
          "/images/properties/ambernath/empire-homes/whatsapp-image-2026-10-25-at-5.54.28-pm.jpg",
          "/images/properties/ambernath/empire-homes/yjhyjf.jpg"
    ],
    price: "Contact for Price",
    beds: 0,
    baths: 0,
    sqft: "On Request",
    address: "Empire Homes",
    city: "Ambernath",
    state: "Maharashtra",
    tag: "For Sale",
    tagColor: "primary",
    type: "Apartment",
    category: "residential",
    description: "Contemporary residential apartments in Ambernath at Empire Homes. Thoughtfully designed homes with excellent natural light, ventilation, and family-friendly amenities. Contact Shree Balaji Enterprises for verified details and bookings. RERA Registered Agency – Reg No: A51700023633.",
    features: ["Residential","Gated Community","Lift / Elevator","24x7 Security","Ready to Move"],
    listingAgent: agents[0],
    status: "for-sale",
    daysOnMarket: 8,
    lat: 19.198,
    lng: 73.192,
    isFeatured: true,
    isTrending: false,
    isForSale: true,
  },
  {
    id: 6,
    image: "/images/properties/ambernath/gbk-ambernath/8yhmjnl.jpg",
    images: [
          "/images/properties/ambernath/gbk-ambernath/8yhmjnl.jpg",
          "/images/properties/ambernath/gbk-ambernath/b.jpg",
          "/images/properties/ambernath/gbk-ambernath/gumjjulhh.jpg",
          "/images/properties/ambernath/gbk-ambernath/hgulj.jpg",
          "/images/properties/ambernath/gbk-ambernath/hmny8.jpg",
          "/images/properties/ambernath/gbk-ambernath/huhv.jpg",
          "/images/properties/ambernath/gbk-ambernath/iu8jkm.jpg",
          "/images/properties/ambernath/gbk-ambernath/jb-lguo.jpg",
          "/images/properties/ambernath/gbk-ambernath/jhuy.jpg",
          "/images/properties/ambernath/gbk-ambernath/kiukjb.jpg",
          "/images/properties/ambernath/gbk-ambernath/mhjiuy.jpg",
          "/images/properties/ambernath/gbk-ambernath/mhyih.jpg",
          "/images/properties/ambernath/gbk-ambernath/miku8y.jpg",
          "/images/properties/ambernath/gbk-ambernath/mjhyu.jpg",
          "/images/properties/ambernath/gbk-ambernath/my8hm.jpg",
          "/images/properties/ambernath/gbk-ambernath/njhuyjhy.jpg",
          "/images/properties/ambernath/gbk-ambernath/t7iukj.jpg",
          "/images/properties/ambernath/gbk-ambernath/t7ygjhmuk.jpg",
          "/images/properties/ambernath/gbk-ambernath/u8ljhmnk.jpg",
          "/images/properties/ambernath/gbk-ambernath/uhjvmn.jpg",
          "/images/properties/ambernath/gbk-ambernath/uhyjml.jpg",
          "/images/properties/ambernath/gbk-ambernath/uyjhm.jpg",
          "/images/properties/ambernath/gbk-ambernath/whatsapp-image-2026-10-25-at-10.14.58-pm.jpg",
          "/images/properties/ambernath/gbk-ambernath/whatsapp-image-2026-10-25-at-10.14.59-pm.jpg"
    ],
    price: "Contact for Price",
    beds: 0,
    baths: 0,
    sqft: "On Request",
    address: "GBK Ambernath",
    city: "Ambernath",
    state: "Maharashtra",
    tag: "For Sale",
    tagColor: "primary",
    type: "Apartment",
    category: "residential",
    description: "Well-crafted residential community in Ambernath at GBK Ambernath. Quality construction, serene surroundings, and proximity to Ambernath railway station and markets. Contact Shree Balaji Enterprises for site visits. RERA Registered Agency – Reg No: A51700023633.",
    features: ["Residential","Children Play Area","Garden / Park","Power Backup","CCTV Surveillance"],
    listingAgent: agents[0],
    status: "for-sale",
    daysOnMarket: 10,
    lat: 19.195,
    lng: 73.189,
    isFeatured: false,
    isTrending: true,
    isForSale: true,
  },
  {
    id: 7,
    image: "/images/properties/ambernath/gps/whatsapp-image-2026-10-27-at-11.48.44-pm.jpg",
    images: [
          "/images/properties/ambernath/gps/whatsapp-image-2026-10-27-at-11.48.44-pm.jpg",
          "/images/properties/ambernath/gps/whatsapp-image-2026-10-27-at-11.48.45-pm.jpg"
    ],
    price: "Contact for Price",
    beds: 0,
    baths: 0,
    sqft: "On Request",
    address: "GPS Residency",
    city: "Ambernath",
    state: "Maharashtra",
    tag: "For Sale",
    tagColor: "primary",
    type: "Apartment",
    category: "residential",
    description: "Comfortable residential apartments in Ambernath East. Close to educational institutions, healthcare, and daily transit. Contact Shree Balaji Enterprises for current availability. RERA Registered Agency – Reg No: A51700023633.",
    features: ["Residential","Prime Connectivity","Water Storage","Ready to Move"],
    listingAgent: agents[0],
    status: "for-sale",
    daysOnMarket: 12,
    lat: 19.199,
    lng: 73.196,
    isFeatured: false,
    isTrending: false,
    isForSale: true,
  },
  {
    id: 8,
    image: "/images/properties/ambernath/sarvodaya-nagar/whatsapp-image-2026-10-29-at-12.31.23-pm-1.jpg",
    images: [
          "/images/properties/ambernath/sarvodaya-nagar/whatsapp-image-2026-10-29-at-12.31.23-pm-1.jpg",
          "/images/properties/ambernath/sarvodaya-nagar/whatsapp-image-2026-10-29-at-12.31.23-pm-2.jpg",
          "/images/properties/ambernath/sarvodaya-nagar/whatsapp-image-2026-10-29-at-12.31.23-pm-3.jpg",
          "/images/properties/ambernath/sarvodaya-nagar/whatsapp-image-2026-10-29-at-12.31.23-pm.jpg",
          "/images/properties/ambernath/sarvodaya-nagar/whatsapp-image-2026-10-29-at-12.31.24-pm-1.jpg",
          "/images/properties/ambernath/sarvodaya-nagar/whatsapp-image-2026-10-29-at-12.31.24-pm-2.jpg",
          "/images/properties/ambernath/sarvodaya-nagar/whatsapp-image-2026-10-29-at-12.31.24-pm-3.jpg",
          "/images/properties/ambernath/sarvodaya-nagar/whatsapp-image-2026-10-29-at-12.31.24-pm.jpg",
          "/images/properties/ambernath/sarvodaya-nagar/whatsapp-image-2026-10-29-at-12.31.25-pm-1.jpg",
          "/images/properties/ambernath/sarvodaya-nagar/whatsapp-image-2026-10-29-at-12.31.25-pm.jpg"
    ],
    price: "Contact for Price",
    beds: 0,
    baths: 0,
    sqft: "On Request",
    address: "Sarvodaya Nagar",
    city: "Ambernath",
    state: "Maharashtra",
    tag: "For Sale",
    tagColor: "primary",
    type: "Apartment",
    category: "residential",
    description: "Desirable residential living in Ambernath at Sarvodaya Nagar. Well-connected neighborhood with established civic amenities and a vibrant community. Contact Shree Balaji Enterprises for site inspections. RERA Registered Agency – Reg No: A51700023633.",
    features: ["Residential","Peaceful Locality","Near Market","Ready to Move"],
    listingAgent: agents[0],
    status: "for-sale",
    daysOnMarket: 6,
    lat: 19.201,
    lng: 73.193,
    isFeatured: false,
    isTrending: false,
    isForSale: true,
  },
  {
    id: 9,
    image: "/images/properties/ambernath/shreeji-skyview/whatsapp-image-2026-10-27-at-6.22.42-pm-1.jpg",
    images: [
          "/images/properties/ambernath/shreeji-skyview/whatsapp-image-2026-10-27-at-6.22.42-pm-1.jpg",
          "/images/properties/ambernath/shreeji-skyview/whatsapp-image-2026-10-27-at-6.22.42-pm.jpg",
          "/images/properties/ambernath/shreeji-skyview/whatsapp-image-2026-10-27-at-6.22.43-pm-1.jpg",
          "/images/properties/ambernath/shreeji-skyview/whatsapp-image-2026-10-27-at-6.22.43-pm-2.jpg",
          "/images/properties/ambernath/shreeji-skyview/whatsapp-image-2026-10-27-at-6.22.43-pm.jpg",
          "/images/properties/ambernath/shreeji-skyview/whatsapp-image-2026-10-27-at-6.22.44-pm-1.jpg",
          "/images/properties/ambernath/shreeji-skyview/whatsapp-image-2026-10-27-at-6.22.44-pm-2.jpg",
          "/images/properties/ambernath/shreeji-skyview/whatsapp-image-2026-10-27-at-6.22.44-pm.jpg"
    ],
    price: "Contact for Price",
    beds: 0,
    baths: 0,
    sqft: "On Request",
    address: "Shreeji Skyview",
    city: "Ambernath",
    state: "Maharashtra",
    tag: "New Launch",
    tagColor: "primary",
    type: "Apartment",
    category: "residential",
    description: "High-rise luxury residential towers at Shreeji Skyview, Ambernath. Panoramic views of the city, premium lifestyle amenities, and prime connectivity. Contact Shree Balaji Enterprises for floor plans, unit allocations, and prices. RERA Registered Agency – Reg No: A51700023633.",
    features: ["Skyline Views","Modern Clubhouse","Gym / Fitness Center","High-Speed Elevators","Fire Safety"],
    listingAgent: agents[0],
    status: "for-sale",
    daysOnMarket: 3,
    lat: 19.207,
    lng: 73.199,
    isFeatured: true,
    isTrending: true,
    isForSale: true,
  },
  {
    id: 10,
    image: "/images/properties/ambernath/tharwani-ariana/whatsapp-image-2026-10-30-at-12.48.19-am.jpg",
    images: [
          "/images/properties/ambernath/tharwani-ariana/whatsapp-image-2026-10-30-at-12.48.19-am.jpg",
          "/images/properties/ambernath/tharwani-ariana/whatsapp-image-2026-10-30-at-12.48.40-am.jpg",
          "/images/properties/ambernath/tharwani-ariana/whatsapp-image-2026-10-30-at-12.48.41-am.jpg",
          "/images/properties/ambernath/tharwani-ariana/whatsapp-image-2026-10-30-at-12.48.43-am.jpg",
          "/images/properties/ambernath/tharwani-ariana/whatsapp-image-2026-10-30-at-12.48.45-am.jpg",
          "/images/properties/ambernath/tharwani-ariana/whatsapp-image-2026-10-30-at-12.48.47-am.jpg",
          "/images/properties/ambernath/tharwani-ariana/whatsapp-image-2026-10-30-at-12.48.49-am.jpg",
          "/images/properties/ambernath/tharwani-ariana/whatsapp-image-2026-10-30-at-12.48.52-am.jpg",
          "/images/properties/ambernath/tharwani-ariana/whatsapp-image-2026-10-30-at-12.48.54-am.jpg",
          "/images/properties/ambernath/tharwani-ariana/whatsapp-image-2026-10-30-at-12.48.57-am.jpg",
          "/images/properties/ambernath/tharwani-ariana/whatsapp-image-2026-10-30-at-12.48.59-am.jpg",
          "/images/properties/ambernath/tharwani-ariana/whatsapp-image-2026-10-30-at-12.49.07-am.jpg",
          "/images/properties/ambernath/tharwani-ariana/whatsapp-image-2026-10-30-at-12.49.16-am.jpg",
          "/images/properties/ambernath/tharwani-ariana/whatsapp-image-2026-10-30-at-12.49.23-am.jpg",
          "/images/properties/ambernath/tharwani-ariana/whatsapp-image-2026-10-30-at-12.49.25-am.jpg",
          "/images/properties/ambernath/tharwani-ariana/whatsapp-image-2026-10-30-at-12.49.27-am.jpg",
          "/images/properties/ambernath/tharwani-ariana/whatsapp-image-2026-10-30-at-12.49.29-am.jpg",
          "/images/properties/ambernath/tharwani-ariana/whatsapp-image-2026-10-30-at-12.49.32-am.jpg",
          "/images/properties/ambernath/tharwani-ariana/whatsapp-image-2026-10-30-at-12.49.37-am.jpg",
          "/images/properties/ambernath/tharwani-ariana/whatsapp-image-2026-10-30-at-12.49.39-am.jpg",
          "/images/properties/ambernath/tharwani-ariana/whatsapp-image-2026-10-30-at-12.49.41-am.jpg",
          "/images/properties/ambernath/tharwani-ariana/whatsapp-image-2026-10-30-at-12.49.45-am.jpg",
          "/images/properties/ambernath/tharwani-ariana/whatsapp-image-2026-10-30-at-12.49.49-am.jpg",
          "/images/properties/ambernath/tharwani-ariana/whatsapp-image-2026-10-30-at-12.49.52-am.jpg",
          "/images/properties/ambernath/tharwani-ariana/whatsapp-image-2026-10-30-at-12.49.55-am.jpg",
          "/images/properties/ambernath/tharwani-ariana/whatsapp-image-2026-10-30-at-12.49.58-am.jpg",
          "/images/properties/ambernath/tharwani-ariana/whatsapp-image-2026-10-30-at-12.50.00-am.jpg",
          "/images/properties/ambernath/tharwani-ariana/whatsapp-image-2026-10-30-at-12.50.03-am.jpg",
          "/images/properties/ambernath/tharwani-ariana/whatsapp-image-2026-10-30-at-12.50.05-am.jpg"
    ],
    price: "Contact for Price",
    beds: 0,
    baths: 0,
    sqft: "On Request",
    address: "Tharwani Ariana",
    city: "Ambernath",
    state: "Maharashtra",
    tag: "Featured",
    tagColor: "primary",
    type: "Apartment",
    category: "residential",
    description: "Flagship integrated township in Ambernath by Tharwani Group. Sprawling landscaped gardens, grand clubhouse, swimming pool, and resort-inspired living. Contact Shree Balaji Enterprises for verified listings and guided site tours. RERA Registered Agency – Reg No: A51700023633.",
    features: ["Township Living","Swimming Pool","Grand Clubhouse","Landscaped Gardens","24x7 Security","Children Play Area"],
    listingAgent: agents[0],
    status: "for-sale",
    daysOnMarket: 2,
    lat: 19.204,
    lng: 73.201,
    isFeatured: true,
    isTrending: true,
    isForSale: true,
  },
  {
    id: 11,
    image: "/images/properties/ambernath/tulsi-sanidhya/whatsapp-image-2026-10-26-at-8.50.35-am.jpg",
    images: [
          "/images/properties/ambernath/tulsi-sanidhya/whatsapp-image-2026-10-26-at-8.50.35-am.jpg",
          "/images/properties/ambernath/tulsi-sanidhya/whatsapp-image-2026-10-26-at-8.50.36-am.jpg",
          "/images/properties/ambernath/tulsi-sanidhya/whatsapp-image-2026-10-26-at-8.50.37-am.jpg",
          "/images/properties/ambernath/tulsi-sanidhya/whatsapp-image-2026-10-26-at-8.50.38-am.jpg",
          "/images/properties/ambernath/tulsi-sanidhya/whatsapp-image-2026-10-26-at-8.50.40-am.jpg",
          "/images/properties/ambernath/tulsi-sanidhya/whatsapp-image-2026-10-26-at-8.50.43-am.jpg",
          "/images/properties/ambernath/tulsi-sanidhya/whatsapp-image-2026-10-26-at-8.50.45-am.jpg",
          "/images/properties/ambernath/tulsi-sanidhya/whatsapp-image-2026-10-26-at-8.50.48-am.jpg",
          "/images/properties/ambernath/tulsi-sanidhya/whatsapp-image-2026-10-26-at-8.50.51-am.jpg",
          "/images/properties/ambernath/tulsi-sanidhya/whatsapp-image-2026-10-26-at-8.50.53-am.jpg",
          "/images/properties/ambernath/tulsi-sanidhya/whatsapp-image-2026-10-26-at-8.50.54-am.jpg",
          "/images/properties/ambernath/tulsi-sanidhya/whatsapp-image-2026-10-26-at-8.50.55-am.jpg",
          "/images/properties/ambernath/tulsi-sanidhya/whatsapp-image-2026-10-26-at-8.51.00-am.jpg",
          "/images/properties/ambernath/tulsi-sanidhya/whatsapp-image-2026-10-26-at-8.51.05-am.jpg",
          "/images/properties/ambernath/tulsi-sanidhya/whatsapp-image-2026-10-26-at-8.51.09-am.jpg",
          "/images/properties/ambernath/tulsi-sanidhya/whatsapp-image-2026-10-26-at-8.51.13-am.jpg",
          "/images/properties/ambernath/tulsi-sanidhya/whatsapp-image-2026-10-26-at-8.51.15-am.jpg"
    ],
    price: "Contact for Price",
    beds: 0,
    baths: 0,
    sqft: "On Request",
    address: "Tulsi Sanidhya",
    city: "Ambernath",
    state: "Maharashtra",
    tag: "For Sale",
    tagColor: "primary",
    type: "Apartment",
    category: "residential",
    description: "Elegantly designed residential homes in Ambernath at Tulsi Sanidhya. Peaceful living environment, quality fittings, and hassle-free transit to railway station and highway. Contact Shree Balaji Enterprises for inspection and pricing. RERA Registered Agency – Reg No: A51700023633.",
    features: ["Vastu Compliant","Gated Security","Lift / Elevator","Rainwater Harvesting","Children Play Area"],
    listingAgent: agents[0],
    status: "for-sale",
    daysOnMarket: 9,
    lat: 19.196,
    lng: 73.194,
    isFeatured: true,
    isTrending: false,
    isForSale: true,
  },
  {
    id: 12,
    image: "/images/properties/dombivli/lodha-regency/whatsapp-image-2026-10-25-at-5.49.51-pm.jpg",
    images: [
          "/images/properties/dombivli/lodha-regency/whatsapp-image-2026-10-25-at-5.49.51-pm.jpg",
          "/images/properties/dombivli/lodha-regency/b-j.jpg",
          "/images/properties/dombivli/lodha-regency/ffuj.jpg",
          "/images/properties/dombivli/lodha-regency/gjui.jpg",
          "/images/properties/dombivli/lodha-regency/hy.jpg",
          "/images/properties/dombivli/lodha-regency/nj.jpg",
          "/images/properties/dombivli/lodha-regency/ug.jpg",
          "/images/properties/dombivli/lodha-regency/whatsapp-image-2026-10-25-at-5.52.14-pm.jpg",
          "/images/properties/dombivli/lodha-regency/yf.jpg"
    ],
    price: "Contact for Price",
    beds: 0,
    baths: 0,
    sqft: "On Request",
    address: "Lodha Regency",
    city: "Dombivli",
    state: "Maharashtra",
    tag: "For Sale",
    tagColor: "primary",
    type: "Apartment",
    category: "residential",
    description: "Premium residential address in Dombivli at Lodha Regency. Superb craftsmanship, lush landscaped surroundings, and comprehensive clubhouse amenities. Contact Shree Balaji Enterprises for verified apartments and site visits. RERA Registered Agency – Reg No: A51700023633.",
    features: ["Lodha Brand Quality","Clubhouse","Swimming Pool","Gym / Fitness Center","24x7 Multi-Tier Security"],
    listingAgent: agents[0],
    status: "for-sale",
    daysOnMarket: 4,
    lat: 19.221,
    lng: 73.089,
    isFeatured: true,
    isTrending: true,
    isForSale: true,
  },
  {
    id: 13,
    image: "/images/properties/dombivli/runwal-garden-city/whatsapp-image-2026-10-29-at-5.55.04-pm.jpg",
    images: [
          "/images/properties/dombivli/runwal-garden-city/whatsapp-image-2026-10-29-at-5.55.04-pm.jpg",
          "/images/properties/dombivli/runwal-garden-city/dggtg.jpg",
          "/images/properties/dombivli/runwal-garden-city/gbku.jpg",
          "/images/properties/dombivli/runwal-garden-city/ghyi.jpg",
          "/images/properties/dombivli/runwal-garden-city/hvyfk.jpg",
          "/images/properties/dombivli/runwal-garden-city/yghbkn.jpg"
    ],
    price: "Contact for Price",
    beds: 0,
    baths: 0,
    sqft: "On Request",
    address: "Runwal Garden City",
    city: "Dombivli",
    state: "Maharashtra",
    tag: "Featured",
    tagColor: "primary",
    type: "Apartment",
    category: "residential",
    description: "Massive self-sustained township in Dombivli at Runwal Garden City. Sprawling over hundreds of acres with central park, international school, convenience retail, and sporting arenas. Contact Shree Balaji Enterprises for exclusive buyer consultations. RERA Registered Agency – Reg No: A51700023633.",
    features: ["Integrated Mega-Township","Central Park","Clubhouse & Sports","Schools & Retail","24x7 Security","Jogging Track"],
    listingAgent: agents[0],
    status: "for-sale",
    daysOnMarket: 1,
    lat: 19.224,
    lng: 73.092,
    isFeatured: true,
    isTrending: true,
    isForSale: true,
  },
]

export const rentalProperties: PropertyData[] = []


export function getPropertyById(id: number): PropertyData | undefined {
  return [...buyProperties, ...rentalProperties].find((p) => p.id === id)
}

export function formatAddress(property: PropertyData): string {
  return `${property.address}, ${property.city}${property.state ? `, ${property.state}` : ""}${property.zip ? ` ${property.zip}` : ""}`
}
