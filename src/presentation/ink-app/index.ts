export { runApp } from './App';

process.on('SIGTERM', function () {
  process.exit();
});
