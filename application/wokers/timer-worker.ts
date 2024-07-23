let timer = 0;
let timerInterval: string | number | undefined;

const startTimer = (initialTimer: number) => {
  timer = initialTimer;
  const updateTimerWatch = () => {
    timer += 1;
    const hours = Math.floor(timer / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((timer % 3600) / 60).toString().padStart(2, '0');
    const seconds = (timer % 60).toString().padStart(2, '0');
    postMessage({
      type: 'update',
      timeSpent: `${hours} : ${minutes} : ${seconds}`
    });
  };
  timerInterval = setInterval(updateTimerWatch, 1000) as unknown as number;
};

const countdownTimer = (initialTimer: number) => {
  timer = initialTimer;
  const updateTimerWatch = () => {
    timer -= 1;
    const hours = Math.floor(timer / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((timer % 3600) / 60).toString().padStart(2, '0');
    const seconds = (timer % 60).toString().padStart(2, '0');
    postMessage({
      type: 'update',
      timeSpent: `${hours} : ${minutes} : ${seconds}`
    });
  };
  timerInterval = setInterval(updateTimerWatch, 1000) as unknown as number;
};

const stopTimer = () => {
  clearInterval(timerInterval as number);
};

addEventListener("message", (event) => {
  const { type, timer: initialTimer } = event.data;
  if (type === 'start') {
    startTimer(initialTimer);
  } else if (type === 'countdown') {
    countdownTimer(initialTimer);
  } else if (type === 'stop') {
    stopTimer();
  }
});