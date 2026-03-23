const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  
  await page.goto('http://localhost:8000/index.html');
  await page.setViewport({ width: 500, height: 800 });
  
  await page.waitForSelector('.hamburger');
  console.log('Hamburger found!');

  await page.evaluate(() => {
    const btn = document.querySelector('.hamburger');
    console.log('Btn exists:', !!btn);
    console.log('Btn display:', window.getComputedStyle(btn).display);
    btn.click(); // Direct click
  });
  
  await new Promise(r => setTimeout(r, 1000));
  
  const navClass = await page.$eval('.nav-menu', el => el.className);
  console.log('Nav Menu classes:', navClass);
  
  const hamburgerClass = await page.$eval('.hamburger', el => el.className);
  console.log('Hamburger classes:', hamburgerClass);
  
  await browser.close();
})();
