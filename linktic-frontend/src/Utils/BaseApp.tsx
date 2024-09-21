import { aesDecrypt, aesEncrypt } from "crypt-hpulido";
import { env } from "./Environment";
import { Theme, ToastPosition, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as MarketsmsService from "../services/MarketsmsService";

import { UsersItems } from "../models/Users";

import md5 from "md5";
import Fingerprint2 from 'fingerprintjs2';

const messages = require("../config/messages.json");

export async function encrypt(text_plain: string) {
  const crypt_key = await env("KEY_AES_ENCRYPT");
  return aesEncrypt(text_plain, crypt_key)
    .then((crypt) => {
      return crypt;
    })
    .catch((error) => {
      console.error("Hubo un error:", error);
      return "";
    });
}

export async function decrypt(text_crypt: string) {
  const crypt_key = await env("KEY_AES_ENCRYPT");
  return aesDecrypt(text_crypt, crypt_key);
}

export async function encryptList(list: Object) {
  const listEncrypt: { [key: string]: string } = {};

  for (const key of Object.keys(list) as (keyof typeof list)[]) {
    try {
      const encryptedValue = await encrypt(list[key] + "");
      listEncrypt[key] = encryptedValue;
    } catch (error) {
      console.error("Error encriptando el valor:", error);
    }
  }
  return listEncrypt;
}

export const customMessage = (key: string) => {
  return messages[key]["es"];
}

export function showToastTR(
  message: string,
  timeout: number,
  type = "default"
) {
  showToast(message, "top-right", timeout, type);
}

export function showToastTC(
  message: string,
  timeout: number,
  type = "default"
) {
  showToast(message, "top-center", timeout, type);
}

function showToast(
  message: string,
  position: ToastPosition,
  timeout: number,
  type: string
) {
  const toastOptions = {
    position: position,
    autoClose: timeout,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: getTheme(),
  };

  switch (type) {
    case "warn":
      toast.warn(message, toastOptions);
      break;
    case "info":
      toast.info(message, toastOptions);
      break;
    case "success":
      toast.success(message, toastOptions);
      break;
    case "error":
      toast.error(message, toastOptions);
      break;
    default:
      toast(message, toastOptions);
      break;
  }
}

function getTheme(): Theme {
  // Incialmente se deja light
  return "light";
}

export async function getCurrentUser(): Promise<UsersItems | null> {

  const response = await MarketsmsService.getCurrentUser();
  console.log(response)
  if (response !== null) {
    if (response.status === 200) {
      if (response.data) {
        return response.data;
      } else {
        return null;
      }
    } else {
      return null;
    }
  } else {
    return null;
  }

}



// export async function csvToJson(csv: string) {
//   const lines = csv.split("\n");
//   const headers = lines[0].split(",").map((header) => header.trim()); // Eliminar espacios adicionales

//   const jsonData: any[] = [];

//   for (let i = 1; i < lines.length; i++) {
//     const currentLine = lines[i].split(",");

//     if (currentLine.length === headers.length) {
//       const lineObject: any = {};

//       for (let j = 0; j < headers.length; j++) {
//         lineObject[headers[j]] = currentLine[j].trim(); // Eliminar espacios adicionales
//       }

//       jsonData.push(lineObject);
//     }
//   }

//   return jsonData;
// }


export function getBadgeProductStatus(status: number) {
  switch (status) {
    case 1:
      return "success";
    case 2:
      return "danger";
    default:
      return "dark";
  }
};


export function getBadgeOrderStatus(status: number) {
  switch (status) {
    case 1:
      return "info";
    case 2:
      return "primary";
    case 3:
      return "warning";
    case 4:
      return "success";
    default:
      return "dark";
  }
};


export async function getDeviceId() {
  const fp = await new Promise((resolve, reject) => {
    Fingerprint2.get((components: any) => {
      const values = components.map((component: any) => component.value);
      const murmur = Fingerprint2.x64hash128(values.join(''), 21);
      resolve(murmur);
    });
  });
  return fp + md5(fp + "")
};

export async function getDeviceData() {
  const userAgent = window.navigator.userAgent;
  const platform = window.navigator.platform;
  const language = window.navigator.language;
  const resolution = `${window.screen.width}x${window.screen.height}`;

  let os: string;
  let device_id: string;
  let browser: string;
  let browser_version: string | undefined;

  if (/Android/i.test(userAgent)) {
    os = 'Android';
  } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
    os = 'iOS';
  } else if (/Win/i.test(platform)) {
    os = 'Windows';
  } else if (/Mac/i.test(platform)) {
    os = 'MacOS';
  } else if (/Linux/i.test(platform)) {
    os = 'Linux';
  } else {
    os = 'Desconocido';
  }

  if (/Firefox/i.test(userAgent)) {
    browser = 'Firefox';
    browser_version = /Firefox\/([\d.]+)/i.exec(userAgent)?.[1];
  } else if (/Chrome/i.test(userAgent)) {
    browser = 'Chrome';
    browser_version = /Chrome\/([\d.]+)/i.exec(userAgent)?.[1];
  } else if (/Safari/i.test(userAgent)) {
    browser = 'Safari';
    browser_version = /Version\/([\d.]+)/i.exec(userAgent)?.[1];
  } else if (/Edge/i.test(userAgent)) {
    browser = 'Edge';
    browser_version = /Edge\/([\d.]+)/i.exec(userAgent)?.[1];
  } else if (/Opera|OPR/i.test(userAgent)) {
    browser = 'Opera';
    browser_version = /(?:Opera|OPR)\/([\d.]+)/i.exec(userAgent)?.[1];
  } else if (/FxiOS/i.test(userAgent)) {
    browser = 'Firefox iOS';
    browser_version = /FxiOS\/([\d.]+)/i.exec(userAgent)?.[1];
  } else if (/CriOS/i.test(userAgent)) {
    browser = 'Chrome iOS';
    browser_version = /CriOS\/([\d.]+)/i.exec(userAgent)?.[1];
  } else {
    browser = 'Desconocido';
  }

  device_id = await getDeviceId()
  return { device_id, os, browser, browser_version, language, resolution };
}



// export function validateUrl(input: string): boolean {
//   const urlRegex = /^(ftp|http|https):\/\/(?:www\.)?([a-zA-Z0-9-]+(?:\.[a-zA-Z0-9]+)+)(?:\/[\w-]+)*(?:\?[\w%&=]*)?(?:#[\w-]*)?$/;
//   return urlRegex.test(input);
// };




// export function getDefaultPhoneNumber(): number | null {
//   return localStorage.getItem("default_phone_number") ? parseInt(localStorage.getItem("default_phone_number") + "") : null;
// }


