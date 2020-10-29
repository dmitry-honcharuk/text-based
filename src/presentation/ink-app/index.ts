import minimist from 'minimist';
import { join } from 'path';
import { runApp as run } from './App';

process.on('SIGTERM', function () {
  process.exit();
});

export function runApp() {
  const cwd = process.cwd();
  const { config = 'game.json' } = minimist(process.argv.slice(2));

  run(join(cwd, config));
}
