export default async function CategoryLoader() {
  const res = await fetch("https://shop-x-backend-seven.vercel.app/category");
  if (!res.ok) {
    throw new Response("Failed to fetch categories", { status: res.status });
  }
  return res.json();
}