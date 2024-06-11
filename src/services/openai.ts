import OpenAI from "openai";

const openai = new OpenAI();

export async function getOrCreateAssistant() {
	const assistants = await openai.beta.assistants.list();

	const codeWriterAssistant = assistants.data.find(
		(assistant) => assistant.name === "code-writer-assistant"
	);

	// you can store this Id to prevent future lookups
	return (
		codeWriterAssistant ??
		openai.beta.assistants.create({
			name: "code-writer-assistant",
			description: "Code Writer Assistant",
			model: "gpt-4o",
			instructions: `You are an expert software engineer.
Your goal is to help another engineer write code using Javascript.
Take a deep breathe and focus on writing clean, performant and concise code to solve the problem.
Only output the code, do not provide an explanation.`,
			tools: [{ type: "code_interpreter" }],
		})
	);
}

export async function createThread(input: string) {
	return openai.beta.threads.create({
		messages: [
			{
				role: "user",
				content: input,
			},
		],
	});
}

export async function runThreadAndWait(threadId: string, assistantId: string) {
	return openai.beta.threads.runs.createAndPoll(threadId, {
		assistant_id: assistantId,
	});
}

export async function addResponseToThread(threadId: string, content: string) {
	return openai.beta.threads.messages.create(threadId, {
		role: "user",
		content,
	});
}

export async function getThreadMessages(threadId: string) {
	return openai.beta.threads.messages.list(threadId);
}
