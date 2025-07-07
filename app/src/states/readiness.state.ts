export let isReady = false;

export function setReady() {
  isReady = true;
}

export function getReady() {
  return isReady;
}