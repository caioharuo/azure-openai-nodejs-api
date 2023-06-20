import { OpenAIClient, AzureKeyCredential } from '@azure/openai';
import { env } from '../env';

export async function chatUseCase(prompt: string[]): Promise<string[]> {
  const key = env.AZURE_OPENAI_KEY;
  const endpoint = env.AZURE_OPENAI_ENDPOINT;
  const client = new OpenAIClient(endpoint, new AzureKeyCredential(key));

  const deploymentName = env.AZURE_OPENAI_DEPLOYMENT_NAME;

  let answer: string[] = [];

  try {
    const { choices } = await client.getCompletions(deploymentName, prompt, {
      temperature: 0.9,
      maxTokens: 128,
    });

    for (const choice of choices) {
      answer.push(choice.text);
    }
  } catch (err) {
    if (env.NODE_ENV === 'dev') {
      console.error('Error: ', err);
    }
  }

  return answer;
}
