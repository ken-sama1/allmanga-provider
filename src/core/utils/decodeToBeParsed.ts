import { allmangaKey } from "../../api/allmangaAPI.js";
import * as crypto from "node:crypto";

export const decodeToBeParsed = (base64Blob: string) => {
	const rawBuffer = Buffer.from(base64Blob, "base64");
	const fileSize = rawBuffer.length;

	if (fileSize < 29) {
		throw new Error("Invalid payload: Buffer is too small to be carved");
	}

	const baseIv = rawBuffer.subarray(1, 13);

	const suffix = Buffer.from([0x00, 0x00, 0x00, 0x02]);
	const ctrBuffer = Buffer.concat([baseIv, suffix]);

	const cipherTextLen = fileSize - 13 - 16;
	const cipherText = rawBuffer.subarray(13, 13 + cipherTextLen);

	const keyBuffer = allmangaKey;
	const decipher = crypto.createDecipheriv("aes-256-ctr", keyBuffer, ctrBuffer);

	let decryptedBuffer = decipher.update(cipherText);
	decryptedBuffer = Buffer.concat([decryptedBuffer, decipher.final()]);

	return decryptedBuffer.toString("utf-8");
};
