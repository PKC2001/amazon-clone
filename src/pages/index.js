import Banner from "@/components/Banner";
import Header from "@/components/Header";
import ProductFeed from "@/components/ProductFeed";
import Head from "next/head";

export default function Home({ products }) {
  return (
    <div>
      <Head>
        <title>Amazon-Clone</title>
      </Head>
      <Header />
      <main className="mx-auto max-w-screen-2xl">
        <Banner />
        <ProductFeed products={products} />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const products = await fetch("https://fakestoreapi.com/products").then(res => res.json())
  return {
    props:{
      products
    }
  }
}
