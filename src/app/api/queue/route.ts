import { NextResponse } from 'next/server';
import { inngest } from "../../../inngest/client"; // Import our client

// Create a simple async Next.js API route handler
export async function GET(request: Request) {
  // Send your event payload to Inngest
  const tests = 10
  for(let i = 0; i < tests; i++){
    await inngest.send({
      name: "test/priority.queue",
      data: {
        item: "test-"+i,
        priority: Math.ceil(Math.random() * 3),
        id: i
      }
    })
  }

  return NextResponse.json({ name: `Queue Test, sent ${tests} tests` });
}
