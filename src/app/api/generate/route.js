import { Configuration, OpenAIApi } from "openai";
import { NextResponse } from "next/server";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

if (!configuration.apiKey) {
  throw new Error("No OPENAI_API_KEY environment variable found");
}

const openai = new OpenAIApi(configuration);

export async function POST(request) {
  const body = await request.json();

  //   better error handling
  if (!body.prompt || body.prompt.length === 0) {
    return NextResponse.error(new Error("You must provide a prompt"), {
      status: 400,
    });
  }

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Dame un chiste para programdor de ${body.prompt}`,
      temperature: 0.8,
      max_tokens: 60,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });

    return NextResponse.json(response.data.choices[0].text);
  } catch (error) {
    return NextResponse.error(error, { status: 500 });
  }
}
