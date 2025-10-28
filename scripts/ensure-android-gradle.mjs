import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const wrapperPath = resolve('app/android/gradle/wrapper/gradle-wrapper.properties');
const desiredVersion = '8.10.2';
const distributionUrl = `https://services.gradle.org/distributions/gradle-${desiredVersion}-all.zip`;
const encodedDistributionUrl = distributionUrl.replace(/:/g, '\\:');

let contents = readFileSync(wrapperPath, 'utf8');
if (!contents.includes(encodedDistributionUrl)) {
  contents = contents.replace(/distributionUrl=.*/g, `distributionUrl=${encodedDistributionUrl}`);
  writeFileSync(wrapperPath, contents);
  console.log(`Updated Gradle wrapper to ${desiredVersion}`);
} else {
  console.log(`Gradle wrapper already at ${desiredVersion}`);
}
