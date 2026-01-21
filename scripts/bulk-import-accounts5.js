import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const TOTAL_BATCHES = 100;
const BATCH_SIZE = 1000000;
const TABLE_NAME = 'accounts5';
const TEMP_DIR = './temp_seeds';
const LOG_FILE = './plan5/seeding_progress.log';

if (!fs.existsSync(TEMP_DIR)) {
    fs.mkdirSync(TEMP_DIR);
}

function log(msg) {
    const timestamp = new Date().toISOString();
    const formattedMsg = `[${timestamp}] ${msg}`;
    console.log(formattedMsg);
    fs.appendFileSync(LOG_FILE, formattedMsg + '\n');
}

async function runSeeding() {
    log(`Starting 100M seeding for ${TABLE_NAME}`);

    for (let i = 1; i <= TOTAL_BATCHES; i++) {
        const batchFile = path.join(TEMP_DIR, `batch_${i}.jsonl`);

        log(`--- Batch ${i}/${TOTAL_BATCHES} ---`);

        // 1. Generate 1M batch
        log(`Generating ${BATCH_SIZE} records into ${batchFile}...`);
        try {
            execSync(`node scripts/generate-seed-data.js ${BATCH_SIZE} ${batchFile}`, { stdio: 'inherit' });
        } catch (err) {
            log(`ERROR generating batch ${i}: ${err.message}`);
            process.exit(1);
        }

        // 2. Import batch
        log(`Importing ${batchFile} into Convex table ${TABLE_NAME}...`);
        try {
            // Using execSync synchronously for each batch to ensure serial execution
            execSync(`npx convex import --table ${TABLE_NAME} --append ${batchFile}`, { stdio: 'inherit' });
            log(`Successfully imported batch ${i}.`);
        } catch (err) {
            log(`ERROR importing batch ${i}: ${err.message}`);
            // If it fails, we might want to retry or stop. Stopping for safety.
            process.exit(1);
        }

        // 3. Cleanup
        log(`Cleaning up ${batchFile}...`);
        fs.unlinkSync(batchFile);

        log(`Progress: ${i}% complete (${(i * BATCH_SIZE).toLocaleString()} records total)`);
    }

    log('✅ 100M Seeding Task Completed Successfully!');
    fs.rmdirSync(TEMP_DIR);
}

runSeeding().catch(err => {
    log(`FATAL ERROR: ${err.message}`);
});
