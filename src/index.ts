import {
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

const messages = await getThreadMessages(thread.id);

console.log(
	"Response: ",
	(
		messages.data.find((m) => m.role === "assistant")
			?.content[0] as TextContentBlock
	).text
);
