import { inngest } from "./client"

// Default example function from quick start docs
export const helloWorld = inngest.createFunction(
    { name: "Hello World" },
    { event: "test/hello.world" },
    async ({ event, step }) => {
      await step.sleep("1s")
      return { event, body: "Hello, World!" }
    }
  )

/*
 *  Custom priority queue setup. Use at your own peril.
 */
// The queue
const queue: any[] = []

// Add to the queue
export const priorityQueue = inngest.createFunction(
  { name: "Priority Queue" },
  { event: "test/priority.queue" },
  async ({ event, step }) => {
    const queueLength = await step.run("Add item to queue", () => {
      queue.push(event.data)
      queue.sort((a: any, b: any) => b.priority - a.priority)
      return queue.length
    })
    if(queueLength <= 1) await step.sendEvent("test/priority.queue_processor", { data: { action: "Process Queue" } })
    return { event, queue }
  }
)

// Proccess the queue
export const priorityQueueProcessor = inngest.createFunction(
  { name: "Priority Queue Processor "},
  { event: "test/priority.queue_processor" },
  async ({ event, step }) => {
    const [ queueLength, item ] = await step.run("Get current queue", () => {
      return [ queue.length, queue[queue.length-1] ]
    })
    if(queueLength){
      //simulate doing something
      await step.sleep("5s")
      await step.run(`Delete processed item: ${item.id}`, () => {
        return queue.splice(queue.findIndex(queueItem => queueItem.id === item.id), 1)
      })
      await step.sendEvent("test/priority.queue_processor", { data: { action: "Process Queue" } })
    }
    return { event, queue }
  }
)
