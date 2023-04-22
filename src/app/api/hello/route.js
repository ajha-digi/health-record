import { connectToDatabase } from "@/DB";
connectToDatabase()
export async function GET(request) {
  return new Response('Hello, Next.js!')
}
