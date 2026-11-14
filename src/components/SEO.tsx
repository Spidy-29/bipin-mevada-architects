import Head from "next/head";

interface SEOProps { title: string; description?: string; image?: string; url?: string; type?: string; }

export default function SEO({
  title,
  description = "BM Design Studio creates thoughtful homes in Ahmedabad, from budget-conscious residences to luxurious bungalows. Architecture for the way you live.",
  image = "/images/logo-assets/social-media/TwitterX-Profile_400x400.png",
  url = "https://bmdesignstudio.in/",
  type = "website",
}: SEOProps) {
  const siteTitle = `${title} | BM Design Studio`;
  return <Head>
    <title>{siteTitle}</title><meta name="description" content={description} />
    <meta property="og:type" content={type} /><meta property="og:url" content={url} />
    <meta property="og:title" content={siteTitle} /><meta property="og:description" content={description} />
    <meta property="og:image" content={image} /><meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={siteTitle} /><meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={image} /><link rel="canonical" href={url} />
  </Head>;
}
