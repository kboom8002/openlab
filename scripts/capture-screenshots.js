import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const artifactDir = 'C:\\Users\\User\\.gemini\\antigravity\\brain\\94a860c6-f9a2-4fa5-9b0a-90c054e628a9';

if (!fs.existsSync(artifactDir)) {
  fs.mkdirSync(artifactDir, { recursive: true });
}

async function capture() {
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 1,
  });

  const page = await context.newPage();

  const pagesToCapture = [
    { url: 'http://localhost:3000/', name: 'screenshot_home.png' },
    { url: 'http://localhost:3000/challenges', name: 'screenshot_challenges.png' },
    { url: 'http://localhost:3000/ideas', name: 'screenshot_ideas.png' },
    { url: 'http://localhost:3000/ideas/10000000-0000-4000-8000-000000000003', name: 'screenshot_idea_detail.png' },
    { url: 'http://localhost:3000/ideas/10000000-0000-4000-8000-000000000003/passport', name: 'screenshot_idea_passport.png' },
    { url: 'http://localhost:3000/sign-in', name: 'screenshot_signin.png' },
  ];

  for (const item of pagesToCapture) {
    try {
      console.log(`Navigating to ${item.url}...`);
      await page.goto(item.url, { waitUntil: 'networkidle', timeout: 15000 });
      const outputPath = path.join(artifactDir, item.name);
      await page.screenshot({ path: outputPath, fullPage: false });
      console.log(`Captured screenshot: ${outputPath}`);
    } catch (err) {
      console.error(`Failed to capture ${item.url}:`, err.message);
    }
  }

  await browser.close();
  console.log('Screenshots capture complete!');
}

capture().catch(console.error);
