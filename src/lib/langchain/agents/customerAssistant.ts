import { ChatGroq } from '@langchain/groq';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { RESTAURANT_CONTEXT } from '../config';

export async function createCustomerAssistantAgent() {
  const model = new ChatGroq({
    model: 'llama-3.1-70b-versatile',
    temperature: 0.7,
    apiKey: process.env.GROQ_API_KEY,
    callbacks: process.env.LANGCHAIN_TRACING_V2 === 'true' ? undefined : [],
  });

  return {
    invoke: async ({ input, chat_history }: any) => {
      const prompt = ChatPromptTemplate.fromMessages([
        ['system', RESTAURANT_CONTEXT + '\n\nYou are a helpful restaurant assistant. Answer questions about availability, menu, and reservations.'],
        ['human', '{input}'],
      ]);

      const chain = prompt.pipe(model);
      const result = await chain.invoke({ input });

      return {
        output: result.content,
      };
    },
  };
}
