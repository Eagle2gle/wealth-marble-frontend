const throttle = (callback: (...args: any[]) => void, delay: number) => {
  let isThrottled = false;
  return (...args: any[]) => {
    if (!isThrottled) {
      isThrottled = true;
      setTimeout(() => {
        callback(...args);
        isThrottled = false;
      }, delay);
    }
  };
};

export default throttle;
