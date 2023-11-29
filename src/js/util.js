// global constants
const LOCALSTORAGE_KEY = 'monaca-image';

// global variables
let globalLocalStorage = null;

// API call
export const getImageFromAI = async (data) => {
  const key = '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'; // Replace your own API key here
  const apiEndPoint = 'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0'
  const response = await fetch(
    apiEndPoint,
    {
      headers: { Authorization: `Bearer ${key}` },
      method: 'POST',
      body: JSON.stringify(data),
    }
  );
  const result = await response.blob();
  return result;
};

// Image-related functions
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

// Database-related functions
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

// Cordova-related functions
const canUsePlugin = () => {
  if (!window?.plugins?.socialsharing) {
    alert('This share feature is not supported on this platform');
    return false;
  }
  return true;
}

export const shareFacebook = (imageSrc) => {
  if (canUsePlugin()) {
    window.plugins.socialsharing.shareViaFacebook(
      'Sharing via Facebook', 
      imageSrc, 
      null
    );
  }
};

export const shareInstgarm = (imageSrc) => {
  if (canUsePlugin()) {
    window.plugins.socialsharing.shareViaInstagram(
      'Message via Instagram', 
      imageSrc
    );
  }
};

// Other functions
export function getCurrentDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

export const validQuery = (query) => {
  if (!query) return false;
  // For example, you can further implement to filter bad words.
  return true;
}
