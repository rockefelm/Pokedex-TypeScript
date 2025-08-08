export function cleanInput(input: string): string[] {
  const inputList = input.toLowerCase().trim().split(/\s+/);
  return inputList;
}