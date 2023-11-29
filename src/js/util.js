// global constants
const LOCALSTORAGE_KEY = 'monaca-image';

// global variables
let globalLocalStorage = null;

export function getCurrentDateTime() {
  const now = new Date();

  // Get the current date components
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(now.getDate()).padStart(2, '0');

  // Get the current time components
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');

  // Combine date and time in the desired format
  const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;

  return formattedDateTime;
}

export const validImage = (base64Data) => {
  const isValid = /^data:image\/(png|jpeg|jpg);base64,/.test(base64Data);
  return isValid;
};

export const convertToBase64 = (blobData) => {
  return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(blobData);
      reader.onloadend = () => {
          resolve(reader.result);
      };
  });
};

export const readFromLocalStorage = () => {
  if (globalLocalStorage) return globalLocalStorage;
  try {
    const data = localStorage.getItem(LOCALSTORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
    localStorage.removeItem(LOCALSTORAGE_KEY);
    return [];
  }
}

export const writeToLocalStorage = (data) => {
  const stringifiedData = JSON.stringify(data)
  localStorage.setItem(
    LOCALSTORAGE_KEY,
    stringifiedData
  );
}
