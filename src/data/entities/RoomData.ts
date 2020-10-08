export type RoomDataExit = {
  id: string;
  name: string;
  destinationRoomId: string;
};

export type RoomData = {
  id: string;
  customId: string;
  gameId: string;
  name: string;
  description: string;
  exits: RoomDataExit[];
};
