import {
	addResponseToThread,
	createThread,
	getOrCreateAssistant,
	getThreadMessages,
	runThreadAndWait,
} from "./services/openai.js";
import fs from "fs";
import { TextContentBlock } from "openai/resources/beta/threads/messages.mjs";
import path from "path";

console.log("Code assistant started!");

const assitant = await getOrCreateAssistant();

if (!assitant) {
	throw new Error("Cannot find assistant!");
}

const thread = await createThread(`Refactor this file.

${fs.readFileSync(path.resolve("./src/sample.js"))}
`);

await runThreadAndWait(thread.id, assitant.id);

let messages = await getThreadMessages(thread.id);

console.log(
	"Refactor Response: ",
	(
		messages.data.find((m) => m.role === "assistant")
			?.content[0] as TextContentBlock
	).text
);

await addResponseToThread(
	thread.id,
	"Can you write a simple unit test for that file?"
);

await runThreadAndWait(thread.id, assitant.id);

messages = await getThreadMessages(thread.id);

console.log(
	"Test Gen Response: ",
	(messages.data[0].content[0] as TextContentBlock).text
);
