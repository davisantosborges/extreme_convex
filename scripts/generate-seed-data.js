// Script to generate varied account records for Convex import (configurable count)
import fs from 'fs';

// Sample data pools for variation
const firstNames = [
    'James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda',
    'William', 'Barbara', 'David', 'Elizabeth', 'Richard', 'Susan', 'Joseph', 'Jessica',
    'Thomas', 'Sarah', 'Charles', 'Karen', 'Christopher', 'Nancy', 'Daniel', 'Lisa',
    'Matthew', 'Betty', 'Anthony', 'Margaret', 'Mark', 'Sandra', 'Donald', 'Ashley',
    'Steven', 'Kimberly', 'Paul', 'Emily', 'Andrew', 'Donna', 'Joshua', 'Michelle',
    'Kenneth', 'Dorothy', 'Kevin', 'Carol', 'Brian', 'Amanda', 'George', 'Melissa',
    'Edward', 'Deborah', 'Ronald', 'Stephanie', 'Timothy', 'Rebecca', 'Jason', 'Sharon',
    'Jeffrey', 'Laura', 'Ryan', 'Cynthia', 'Jacob', 'Kathleen', 'Gary', 'Amy',
    'Nicholas', 'Shirley', 'Eric', 'Angela', 'Jonathan', 'Helen', 'Stephen', 'Anna',
    'Larry', 'Brenda', 'Justin', 'Pamela', 'Scott', 'Nicole', 'Brandon', 'Emma',
    'Benjamin', 'Samantha', 'Samuel', 'Katherine', 'Raymond', 'Christine', 'Gregory', 'Debra',
    'Alexander', 'Rachel', 'Frank', 'Catherine', 'Patrick', 'Carolyn', 'Raymond', 'Janet',
    'Jack', 'Ruth', 'Dennis', 'Maria', 'Jerry', 'Heather', 'Tyler', 'Diane',
    'Aaron', 'Virginia', 'Jose', 'Julie', 'Adam', 'Joyce', 'Henry', 'Victoria',
    'Nathan', 'Olivia', 'Douglas', 'Kelly', 'Zachary', 'Christina', 'Peter', 'Lauren'
];

const lastNames = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
    'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas',
    'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White',
    'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young',
    'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores',
    'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell',
    'Carter', 'Roberts', 'Gomez', 'Phillips', 'Evans', 'Turner', 'Diaz', 'Parker',
    'Cruz', 'Edwards', 'Collins', 'Reyes', 'Stewart', 'Morris', 'Morales', 'Murphy',
    'Cook', 'Rogers', 'Gutierrez', 'Ortiz', 'Morgan', 'Cooper', 'Peterson', 'Bailey',
    'Reed', 'Kelly', 'Howard', 'Ramos', 'Kim', 'Cox', 'Ward', 'Richardson',
    'Watson', 'Brooks', 'Chavez', 'Wood', 'James', 'Bennett', 'Gray', 'Mendoza',
    'Ruiz', 'Hughes', 'Price', 'Alvarez', 'Castillo', 'Sanders', 'Patel', 'Myers',
    'Long', 'Ross', 'Foster', 'Jimenez', 'Powell', 'Jenkins', 'Perry', 'Russell'
];

const streetSuffixes = ['St', 'Ave', 'Blvd', 'Rd', 'Ln', 'Dr', 'Ct', 'Way', 'Pl', 'Pkwy'];
const streetNames = [
    'Main', 'Oak', 'Maple', 'Cedar', 'Elm', 'Washington', 'Lake', 'Hill', 'Park', 'River',
    'Pine', 'Broadway', 'Church', 'Spring', 'Market', 'Center', 'Liberty', 'Union', 'Mill', 'School',
    'Forest', 'Valley', 'Summit', 'Ridge', 'Woodland', 'Highland', 'Madison', 'Franklin', 'Jackson', 'Lincoln',
    'Jefferson', 'Adams', 'Wilson', 'Sunset', 'Willow', 'College', 'Cherry', 'Walnut', 'Hickory', 'Garden'
];

// Top 50 US cities with their states and typical ZIP code ranges
const cities = [
    { city: 'New York', state: 'NY', zipStart: '10001', zipEnd: '10292' },
    { city: 'Los Angeles', state: 'CA', zipStart: 90001, zipEnd: 90089 },
    { city: 'Chicago', state: 'IL', zipStart: 60601, zipEnd: 60661 },
    { city: 'Houston', state: 'TX', zipStart: 77001, zipEnd: 77099 },
    { city: 'Phoenix', state: 'AZ', zipStart: 85001, zipEnd: 85055 },
    { city: 'Philadelphia', state: 'PA', zipStart: 19101, zipEnd: 19154 },
    { city: 'San Antonio', state: 'TX', zipStart: 78201, zipEnd: 78266 },
    { city: 'San Diego', state: 'CA', zipStart: 92101, zipEnd: 92199 },
    { city: 'Dallas', state: 'TX', zipStart: 75201, zipEnd: 75398 },
    { city: 'San Jose', state: 'CA', zipStart: 95101, zipEnd: 95196 },
    { city: 'Austin', state: 'TX', zipStart: 78701, zipEnd: 78799 },
    { city: 'Jacksonville', state: 'FL', zipStart: 32099, zipEnd: 32258 },
    { city: 'Fort Worth', state: 'TX', zipStart: 76101, zipEnd: 76199 },
    { city: 'Columbus', state: 'OH', zipStart: 43201, zipEnd: 43299 },
    { city: 'Charlotte', state: 'NC', zipStart: 28201, zipEnd: 28299 },
    { city: 'San Francisco', state: 'CA', zipStart: 94101, zipEnd: 94199 },
    { city: 'Indianapolis', state: 'IN', zipStart: 46201, zipEnd: 46299 },
    { city: 'Seattle', state: 'WA', zipStart: 98101, zipEnd: 98199 },
    { city: 'Denver', state: 'CO', zipStart: 80201, zipEnd: 80299 },
    { city: 'Washington', state: 'DC', zipStart: '20001', zipEnd: '20099' },
    { city: 'Boston', state: 'MA', zipStart: '02101', zipEnd: '02299' },
    { city: 'Nashville', state: 'TN', zipStart: 37201, zipEnd: 37250 },
    { city: 'Detroit', state: 'MI', zipStart: 48201, zipEnd: 48288 },
    { city: 'Portland', state: 'OR', zipStart: 97201, zipEnd: 97299 },
    { city: 'Las Vegas', state: 'NV', zipStart: 89101, zipEnd: 89199 },
    { city: 'Memphis', state: 'TN', zipStart: 37501, zipEnd: 38125 },
    { city: 'Louisville', state: 'KY', zipStart: 40201, zipEnd: 40299 },
    { city: 'Baltimore', state: 'MD', zipStart: 21201, zipEnd: 21231 },
    { city: 'Milwaukee', state: 'WI', zipStart: 53201, zipEnd: 53295 },
    { city: 'Albuquerque', state: 'NM', zipStart: 87101, zipEnd: 87199 },
    { city: 'Tucson', state: 'AZ', zipStart: 85701, zipEnd: 85775 },
    { city: 'Fresno', state: 'CA', zipStart: 93701, zipEnd: 93799 },
    { city: 'Sacramento', state: 'CA', zipStart: 94203, zipEnd: 94299 },
    { city: 'Kansas City', state: 'MO', zipStart: 64101, zipEnd: 64199 },
    { city: 'Mesa', state: 'AZ', zipStart: 85201, zipEnd: 85299 },
    { city: 'Atlanta', state: 'GA', zipStart: 30301, zipEnd: 30399 },
    { city: 'Omaha', state: 'NE', zipStart: 68101, zipEnd: 68199 },
    { city: 'Colorado Springs', state: 'CO', zipStart: 80901, zipEnd: 80951 },
    { city: 'Raleigh', state: 'NC', zipStart: 27601, zipEnd: 27699 },
    { city: 'Miami', state: 'FL', zipStart: 33101, zipEnd: 33199 },
    { city: 'Cleveland', state: 'OH', zipStart: 44101, zipEnd: 44199 },
    { city: 'Minneapolis', state: 'MN', zipStart: 55401, zipEnd: 55488 },
    { city: 'Tampa', state: 'FL', zipStart: 33601, zipEnd: 33694 },
    { city: 'New Orleans', state: 'LA', zipStart: 70112, zipEnd: 70195 },
    { city: 'Arlington', state: 'TX', zipStart: 76001, zipEnd: 76099 },
];

const statuses = ['active', 'inactive', 'pending', 'suspended', 'closed'];

// Helper to get random item from array
function randomFrom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// Helper to get random number in range
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate a random account
function generateAccount() {
    const firstName = randomFrom(firstNames);
    const lastName = randomFrom(lastNames);
    const name = `${firstName} ${lastName}`;

    const status = randomFrom(statuses);

    const streetNumber = randomInt(1, 9999);
    const streetName = randomFrom(streetNames);
    const streetSuffix = randomFrom(streetSuffixes);
    const street = `${streetNumber} ${streetName} ${streetSuffix}`;

    const cityData = randomFrom(cities);
    const zipStart = parseInt(cityData.zipStart);
    const zipEnd = parseInt(cityData.zipEnd);
    const zipCode = String(randomInt(zipStart, zipEnd)).padStart(5, '0');

    return {
        name,
        status,
        address: {
            street,
            city: cityData.city,
            state: cityData.state,
            zipCode,
        },
    };
}

// Generate specified number of records
const numRecords = parseInt(process.argv[2]) || 10000;
const outputFile = process.argv[3] || 'seed_data.jsonl';

console.log(`Generating ${numRecords.toLocaleString()} account records...`);
const writeStream = fs.createWriteStream(outputFile);

let i = 0;
function write() {
    let ok = true;
    while (i < numRecords && ok) {
        const account = generateAccount();
        const jsonLine = JSON.stringify(account) + (i === numRecords - 1 ? '' : '\n');

        ok = writeStream.write(jsonLine);
        i++;

        if (i % 10000 === 0) {
            process.stdout.write(`\rGenerated ${i.toLocaleString()} records...`);
        }
    }

    if (i < numRecords) {
        // Had to stop early because of backpressure
        writeStream.once('drain', write);
    } else {
        writeStream.end();
    }
}

writeStream.on('finish', () => {
    console.log(`\n✅ Successfully generated ${outputFile} with ${numRecords.toLocaleString()} records!`);
    console.log(`\nImport with: npx convex import --table <table_name> ${outputFile}`);
    console.log('\nExamples:');
    console.log(`  npx convex import --table accounts seed_data.jsonl`);
    console.log(`  npx convex import --table accounts2 seed_data_100k.jsonl`);
    console.log(`  npx convex import --table accounts3 seed_data_1m.jsonl`);
    console.log(`  npx convex import --table accounts4 seed_data_10m.jsonl`);
});

write();

