export interface Tool {
  name: string;
  description: string;
  execute(params: any): Promise<any>;
}

export interface Agent {
  name: string;
  description: string;
  tools: Tool[];
  execute({ message, context }: { message: string; context: any }): Promise<{
    response: string;
    agent: string;
    reasoning: string;
  }>;
}
