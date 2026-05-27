export const isMimeType = (value) => {
    if (typeof value !== "string")
        return false;
    // Basic MIME type validation
    return /^[a-zA-Z0-9!#$&^_.+-]+\/[a-zA-Z0-9!#$&^_.+-]+$/.test(value);
};
