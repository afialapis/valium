const LOG_ENABLED= false

const log = (w, s) => {
  if (! LOG_ENABLED) {
    return
  }
  if (w=='form') {
    console.log(`%cValium Form: ${s}`, "color: orange");
  } else {
    console.log(`Valium Input: ${s}`);
  }
}

export {log}