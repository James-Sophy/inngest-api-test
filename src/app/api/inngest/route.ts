import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";
import { helloWorld, priorityQueue, priorityQueueProcessor } from "../../../inngest/functions";

export const { GET, POST, PUT } = serve(inngest, [
  helloWorld, // <-- This is where you'll always add your new functions
  priorityQueue,
  priorityQueueProcessor,
], {
  serveHost: process.env.NEXTJS_SERVER_HOST
});
