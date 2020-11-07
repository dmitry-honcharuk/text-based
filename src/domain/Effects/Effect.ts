import { RoomEntity } from '../entities/RoomEntity';

export type Options = {
  gameId: string;
  issuerId: string;
  issuerRoomId: string;
  playerRoom: RoomEntity;
  possibleTargets: string[];
};

export interface Effect {
  execute(options: Options): Promise<void>;
}
