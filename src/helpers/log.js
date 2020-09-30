const LOG_ENABLED= true

const log = (w, s) => {
  if (! LOG_ENABLED) {
    return
  }
  if (w=='form') {
    console.log(`%cValium Formm: ${s}`, "color: orange");
  } else {
    console.log(`Valium Input: ${s}`);
  }
}

export {log}