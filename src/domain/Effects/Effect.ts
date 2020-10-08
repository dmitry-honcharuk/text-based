export interface Effect {
  execute(gameId: string, issuerId: string, targets: string[]): Promise<void>;
}
