export type RoomDataExit = {
  id: string;
  name: string;
  destinationRoomId: string;
};

export type RoomData = {
  id: string;
  gameId: string;
  name: string;
  description: string;
  exits: RoomDataExit[];
};
