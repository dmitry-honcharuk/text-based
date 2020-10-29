import SelectInput from 'ink-select-input';
import React, { FunctionComponent } from 'react';
import { StartGame } from './StartGame';

enum Label {
  CreateGame = 'Create game',
  StartGame = 'Start game',
}

enum Option {
  CreateGame = 'create-game',
  StartGame = 'start-game',
}

const MAIN_MENU_ITEMS = [
  {
    label: Label.CreateGame,
    value: Option.CreateGame,
  },
  {
    label: Label.StartGame,
    value: Option.StartGame,
  },
];

type Props = {
  onCreateGame: () => void;
  onStartGame: (gameId: string, playerName: string) => void;
};

export const MainMenu: FunctionComponent<Props> = ({
  onCreateGame,
  onStartGame,
}) => {
  const [selected, setSelected] = React.useState<Option | null>(null);

  const handleSelect = (item: { label: string; value: Option }) => {
    if (item.value === Option.CreateGame) {
      onCreateGame();
    }
    setSelected(item.value);
  };

  return (
    <>
      {!selected && (
        <SelectInput items={MAIN_MENU_ITEMS} onSelect={handleSelect} />
      )}
      {selected === Option.StartGame && <StartGame onStart={onStartGame} />}
    </>
  );
};
