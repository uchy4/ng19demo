export function toSentenceCase(value: string): string {
    const words = value.split(/(?=[A-Z][a-z])/);

    // Capitalize the first letter of each word and join them with a space
    const converted = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  
    return converted;
}

export function toEllipsis(value: string, length: number): string {
    const newValue = value?.trim()?.slice(0, length) + '...';
    if (newValue.length < value.length) {
        return newValue;
    }
    return value;
}