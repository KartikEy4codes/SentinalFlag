const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { initChangeStream, refreshCache } = require('../src/modules/flags/flag.service');
const Flag = require('../src/modules/flags/flag.model');

dotenv.config();

const testRealTime = async () => {
    try {
        console.log('🚀 Starting Real-Time Verification Test...');

        // Connect to MongoDB
        const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sentinel-flag';
        await mongoose.connect(mongoURI);
        console.log('✅ MongoDB Connected');

        // Initialize Cache
        await refreshCache();

        // Initialize Change Stream
        initChangeStream();

        console.log('\n📝 Instructions for Manual Verification:');
        console.log('1. Open MongoDB Compass or mongosh.');
        console.log('2. Update a flag in the "flags" collection (e.g., change "enabled").');
        console.log('3. Watch this console for "[Change Stream] Event" and "[Cache] Refreshed" logs.');
        console.log('\nPress Ctrl+C to stop the test.');

        // Keep process alive
        setInterval(() => { }, 1000);

    } catch (error) {
        console.error('❌ Test failed:', error);
        process.exit(1);
    }
};

testRealTime();
