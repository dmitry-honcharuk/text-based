export type RoomEntityExit = {
  id: string;
  name: string;
  destinationRoomId: string;
};

export type RoomEntity = {
  id: string;
  name: string;
  description: string;
  exits: RoomEntityExit[];
};
