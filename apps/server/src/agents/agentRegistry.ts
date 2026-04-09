import { Agent } from "../types/agent";
import { supportAgent } from "./supportAgent";
import { orderAgent } from "./orderAgent";
import { billingAgent } from "./billingAgent";

export const agentRegistry: Record<string, Agent> = {
  support: supportAgent,
  order: orderAgent,
  billing: billingAgent,
  fallback: supportAgent,
};
