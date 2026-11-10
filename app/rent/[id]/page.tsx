import { Metadata } from "next"
import { notFound } from "next/navigation"
import { RentalDetailClient } from "@/components/rental-detail-client"
import { rentalProperties, formatAddress } from "@/lib/data"
import { CURATED_RENT_PROPERTIES } from "@/lib/rent-data"

const allRentals = [...CURATED_RENT_PROPERTIES, ...rentalProperties]

// Ensures static routes can be pre-rendered for rentals
export async function generateStaticParams() {
  return allRentals.map((property) => ({
    id: property.id.toString(),
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id: rawId } = await params
  const id = Number(rawId)
  const property = allRentals.find((p) => p.id === id)

  if (!property) {
    return {
      title: "Rental Not Found",
    }
  }

  const typeStr = property.type ? property.type.charAt(0).toUpperCase() + property.type.slice(1) : "Property"
  const bedStr = property.beds && property.beds > 0 ? `${property.beds} BHK ` : ""
  const title = `${bedStr}${typeStr} for Rent in ${property.address}, ${property.city} | ${property.price}`
  const description = property.description 
    ? property.description.slice(0, 155) + "..."
    : `Rent this beautiful ${property.beds ? property.beds + ' BHK ' : ''}property located at ${formatAddress(property)}. Available now. Contact Shree Balaji Enterprises today.`

  const images = property.images && property.images.length > 0 
    ? property.images[0] 
    : property.image

  const canonicalUrl = `https://shreebalajienterprises.live/rent/${id}`

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "article",
      images: [
        {
          url: images,
          width: 1200,
          height: 630,
          alt: `Rental property: ${property.address}, ${property.city}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [images],
    },
  }
}

export default async function RentalDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id: rawId } = await params
  const id = Number(rawId)
  const property = allRentals.find((p) => p.id === id)

  if (!property) {
    notFound()
  }

  const similar = allRentals.filter((p) => p.id !== id).slice(0, 4)

  const listingSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "@id": `https://shreebalajienterprises.live/rent/${property.id}#listing`,
    name: `${property.beds ? property.beds + " BHK " : ""}${property.type || "Property"} for Rent in ${property.city}`,
    description: property.description,
    url: `https://shreebalajienterprises.live/rent/${property.id}`,
    image: property.images || [property.image],
    datePosted: "2026-02-24",
    about: {
      "@type": property.type === "apartment" ? "Apartment" : property.type === "house" ? "House" : "SingleFamilyResidence",
      name: `${property.address}, ${property.city}`,
      address: {
        "@type": "PostalAddress",
        streetAddress: property.address,
        addressLocality: property.city,
        addressRegion: property.state || "Maharashtra",
        addressCountry: "IN",
      },
      ...(property.lat && property.lng
        ? {
            geo: {
              "@type": "GeoCoordinates",
              latitude: property.lat,
              longitude: property.lng,
            },
          }
        : {}),
      ...(property.beds > 0 ? { numberOfBedrooms: property.beds } : {}),
      ...(property.baths > 0 ? { numberOfBathroomsTotal: property.baths } : {}),
      ...(property.sqft && property.sqft !== "On Request"
        ? {
            floorSize: {
              "@type": "QuantitativeValue",
              value: property.sqft,
              unitText: "SQFT",
            },
          }
        : {}),
    },
    offers: {
      "@type": "Offer",
      url: `https://shreebalajienterprises.live/rent/${property.id}`,
      priceCurrency: "INR",
      ...(property.priceNum && property.priceNum > 0 ? { price: property.priceNum } : {}),
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "INR",
        ...(property.priceNum && property.priceNum > 0 ? { price: property.priceNum } : {}),
        description: property.price,
      },
      itemCondition: "https://schema.org/NewCondition",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "RealEstateAgent",
        name: "Shree Balaji Enterprises",
        telephone: "+917767805544",
        url: "https://shreebalajienterprises.live",
      },
    },
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://shreebalajienterprises.live",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Rent",
        item: "https://shreebalajienterprises.live/rent",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: property.address,
        item: `https://shreebalajienterprises.live/rent/${property.id}`,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <RentalDetailClient 
        initialProperty={property} 
        initialSimilar={similar} 
        id={id} 
      />
    </>
  )
}

