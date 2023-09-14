import { ChatBody } from '@/types/types';
import { OpenAIStream } from '@/utils/chatStream';

export const config = {
  runtime: 'edge',
};

const handler = async (req: Request): Promise<Response> => {
  try {
    const { inputCode, model, apiKey } = (await req.json()) as ChatBody;
    let apiKeyFinal;

    if (apiKey) {
      apiKeyFinal = apiKey;
    } else {
      apiKeyFinal = "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";
    }

    if (!apiKey) {
      return new Response('API key not found', { status: 500 });
    }

    const stream = await OpenAIStream(inputCode, model, apiKeyFinal);

    return new Response(stream);
  } catch (error) {
    console.error(error);
    return new Response('Error', { status: 500 });
  }
};

export default handler;
