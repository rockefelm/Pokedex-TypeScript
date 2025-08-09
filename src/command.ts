// holds the command type definition
// This file defines the structure of a CLI command used in the REPL
export type CLICommand = {
  name: string;
  description: string;
  callback: (commands: Record<string, CLICommand>) => void;
};