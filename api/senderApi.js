const puppeteer = require('puppeteer-core');
const stringInject = require('stringinject');
const locateChrome = require('locate-chrome');
const { clipboard, nativeImage } = require('electron');

const USER_DATA_DIR = './whatsapp-session'; // Persistent session

function createMessage(message, infos) {
  const messageCreated = stringInject.default(message, infos);
  return messageCreated;
}

async function sendWhatsappMessage(
  message,
  contacts,
  timeBefore,
  timeAfter,
  isSendingImage,
  imagePath,
  closeBrowser = true
) {
  const chromePath = await locateChrome();
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: false,
    userDataDir: USER_DATA_DIR,
    defaultViewport: null,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  for (let contact of contacts) {
    try {
      const chatUrl = `https://web.whatsapp.com/send?phone=${contact.ContactNumber}`;
      console.log(`Opening chat with ${contact.ContactNumber}...`);
      await page.goto(chatUrl, { waitUntil: 'networkidle2' });

      // Wait for chat sidebar (means WhatsApp is loaded)
      console.log("Checking if logged in...");
      await page.waitForSelector('#side', { timeout: 60000 });

      // Wait for chat input box
      const inputSelector = 'div[contenteditable="true"][data-tab="10"]';
      await page.waitForSelector(inputSelector, { timeout: 60000 });

      const messageToSend = createMessage(message, contact);
      const inputBox = await page.$(inputSelector);

      if (!inputBox) {
        console.error(`Could not find input box for ${contact.ContactNumber}`);
        continue;
      }

      await inputBox.click();
      await page.waitForTimeout((Math.random() * (4 - 2) + 2) * timeBefore);

      if (isSendingImage && imagePath) {
        clipboard.writeImage(nativeImage.createFromPath(imagePath));
        await page.keyboard.down('Control');
        await page.keyboard.press('V');
        await page.keyboard.up('Control');
        await page.waitForTimeout(2000);
        await page.keyboard.press('Enter');
        console.log(`Image sent to ${contact.ContactNumber}`);
      } else {
        // await page.keyboard.type(messageToSend, { delay: 50 });
        // console.log(`Message typed to ${contact.ContactNumber}: ${messageToSend}`);
        // await page.keyboard.press('Enter');
        await inputBox.type(messageToSend, { delay: 50 });
console.log(`Message typed to ${contact.ContactNumber}: ${messageToSend}`);
await inputBox.press('Enter');
await page.waitForTimeout(1500);
console.log(`Message sent to ${contact.ContactNumber}`);


      }

      await page.waitForTimeout((Math.random() * (4 - 2) + 2) * timeAfter);
    } catch (err) {
      console.error(`Error with contact ${contact.ContactNumber}:`, err);
    }
  }

  if (closeBrowser) {
    await browser.close();
  } else {
    console.log('Browser left open as requested.');
  }
}

module.exports = sendWhatsappMessage;


// const puppeteer = require('puppeteer-core');
// const stringInject = require('stringinject');
// const locateChrome = require('locate-chrome');
// const { clipboard, nativeImage } = require('electron');

// function createMessage(message, infos) {
//   const messageCreated = stringInject.default(message, infos);
//   const messageWithoutSpaces = messageCreated.replace(/ /g, '%20');
//   return messageWithoutSpaces;
// }

// function createUrl(message, phone) {
//   const urlCreated = `https://web.whatsapp.com/send?phone=${phone}&text=${message}`;
//   return urlCreated;
// }

// async function sendWhatsappMessage(message, contacts, timeBefore, timeAfter, isSendingImage, imagePath) {
//   const locateChromePath = await locateChrome()

//   const browser = await puppeteer.launch({
//     executablePath: locateChromePath,
//     headless: false
//   });
//   const page = await browser.newPage();

//   for (let contact of contacts) {
//     try {
//       const messageCreated = createMessage(message, contact);
//       const urlCreated = createUrl(messageCreated, contact.telefone);

//       await page.goto(urlCreated);
//       await page.waitForSelector('#side > header');
//       await page.waitForTimeout((Math.random() * (4 - 2) + 2) * timeBefore);

//       if(isSendingImage) {
//         await page.waitForTimeout((Math.random() * (4 - 2) + 2) * timeBefore);
//         clipboard.writeImage(nativeImage.createFromPath(imagePath));
//         await page.keyboard.down('Control')
//         await page.keyboard.press('V')
//         await page.keyboard.up('Control')
//         await page.waitForTimeout((Math.random() * (4 - 2) + 2) * timeBefore);
//         await page.keyboard.press('Enter');
//       }

//       if (!isSendingImage) {
//         await page.keyboard.press('Enter');
//       }

//       await page.waitForTimeout((Math.random() * (4 - 2) + 2) * timeAfter);
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   await browser.close();
// }

// module.exports = sendWhatsappMessage;

