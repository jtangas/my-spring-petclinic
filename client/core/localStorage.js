export const loadFromStorage = key => {
  try {
    const serialized = localStorage.getItem(key);
    if (serialized === null) {
      return undefined;
    }
    return JSON.parse(serialized);
  } catch (err) {
    return undefined;
  }
};

export const saveToStorage = (key, data) => {
  try {
    const serialized = JSON.stringify(data);
    localStorage.setItem(key, serialized);
  } catch (err) {
    console.warn('Error saving to storage:', err);
  }
};
