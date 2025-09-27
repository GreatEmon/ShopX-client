export default async function CategoryLoader() {
  const res = await fetch("http://localhost:3000/category");
  if (!res.ok) {
    throw new Response("Failed to fetch categories", { status: res.status });
  }
  return res.json();
}