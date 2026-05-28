#!/usr/bin/env node

/**
 * CAPTA LEADS - Paid Customer Setup Wizard
 *
 * Simple interactive script to register as a paid customer locally
 * Allows testing the full app experience before or instead of real payment
 *
 * Usage: node setup-paid-customer.js
 */

import fs from 'fs';
import readline from 'readline';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Helper function to ask questions
function question(query) {
  return new Promise(resolve => {
    rl.question(`${colors.cyan}${query}${colors.reset}`, (answer) => {
      resolve(answer.trim());
    });
  });
}

// Helper function to print colored messages
function print(message, color = 'reset') {
  console.log(`${colors[color] || ''}${message}${colors.reset}`);
}

// Main setup function
async function setupPaidCustomer() {
  console.clear();

  print('╔════════════════════════════════════════════════════════════════╗', 'bright');
  print('║                                                                ║', 'bright');
  print('║     🚀 CAPTA LEADS - Paid Customer Setup Wizard               ║', 'bright');
  print('║                                                                ║', 'bright');
  print('║     Configure local access as a paid customer                 ║', 'bright');
  print('║                                                                ║', 'bright');
  print('╚════════════════════════════════════════════════════════════════╝', 'bright');
  print('');

  try {
    // Step 1: Get email
    print('📧 Step 1: Email Address', 'bright');
    print('Enter the email you want to use for CAPTA LEADS:', 'cyan');
    const email = await question('Email: ');

    if (!email.includes('@')) {
      print('❌ Invalid email address! Please try again.', 'yellow');
      rl.close();
      return;
    }

    // Step 2: Choose plan
    print('');
    print('📋 Step 2: Choose Your Plan', 'bright');
    print('');
    print('1. Free Plan (R$ 0/month)', 'green');
    print('   - Unlimited lead search');
    print('   - Unlimited email campaigns');
    print('   - Unlimited landing pages');
    print('   - AI chat assistant');
    print('');
    print('2. Professional Plan (R$ 99/month)', 'green');
    print('   - Everything in Free +');
    print('   - Advanced analytics');
    print('   - API integrations');
    print('   - Multiple users');
    print('   - Priority support');
    print('');
    print('3. Enterprise Plan (Custom pricing)', 'green');
    print('   - Everything in Professional +');
    print('   - Dedicated support');
    print('   - Custom integrations');
    print('   - SLA guarantees');
    print('');

    const planChoice = await question('Choose plan (1, 2, or 3): ');

    const plans = {
      '1': 'free',
      '2': 'professional',
      '3': 'enterprise'
    };

    const plan = plans[planChoice];

    if (!plan) {
      print('❌ Invalid choice! Please enter 1, 2, or 3.', 'yellow');
      rl.close();
      return;
    }

    // Step 3: Confirmation
    print('');
    print('✅ Step 3: Verify Your Information', 'bright');
    print('');
    print(`Email: ${colors.cyan}${email}${colors.reset}`);
    print(`Plan: ${colors.cyan}${plan.toUpperCase()}${colors.reset}`);
    print('');

    const confirm = await question('Is this correct? (yes/no): ');

    if (confirm.toLowerCase() !== 'yes' && confirm.toLowerCase() !== 'y') {
      print('❌ Setup cancelled.', 'yellow');
      rl.close();
      return;
    }

    // Step 4: Create or update paid-customers.json
    const customerFile = './paid-customers.json';
    let customers = [];

    if (fs.existsSync(customerFile)) {
      try {
        const content = fs.readFileSync(customerFile, 'utf-8');
        customers = JSON.parse(content);
      } catch (e) {
        print('⚠️  Could not read existing file, creating new one...', 'yellow');
        customers = [];
      }
    }

    // Check if email already exists
    const existingIndex = customers.findIndex(c => c.email === email);

    const now = new Date().toISOString();
    const customerData = {
      email: email,
      plan: plan,
      registeredAt: now,
      status: 'active',
      paidAt: now,
      amount: plan === 'free' ? 0 : plan === 'professional' ? 99.00 : null,
      currency: 'BRL'
    };

    if (existingIndex >= 0) {
      // Update existing customer
      customers[existingIndex] = customerData;
      print('', 'reset');
      print('✅ Customer updated!', 'green');
    } else {
      // Add new customer
      customers.push(customerData);
      print('', 'reset');
      print('✅ Customer registered successfully!', 'green');
    }

    // Write to file
    fs.writeFileSync(customerFile, JSON.stringify(customers, null, 2), 'utf-8');

    // Step 5: Display success message
    print('');
    print('╔════════════════════════════════════════════════════════════════╗', 'bright');
    print('║                     ✅ SETUP COMPLETE!                         ║', 'bright');
    print('╚════════════════════════════════════════════════════════════════╝', 'bright');
    print('');
    print('📋 Your Registration Details:', 'bright');
    print('');
    print(`  Email:        ${colors.cyan}${email}${colors.reset}`);
    print(`  Plan:         ${colors.cyan}${plan.charAt(0).toUpperCase() + plan.slice(1)}${colors.reset}`);
    print(`  Status:       ${colors.green}ACTIVE${colors.reset}`);
    print(`  Registered:   ${colors.cyan}${new Date().toLocaleDateString()}${colors.reset}`);
    print('');

    // Step 6: Next steps
    print('🚀 Next Steps:', 'bright');
    print('');
    print('1. Start the server:');
    print(`   ${colors.yellow}npm start${colors.reset}`);
    print('');
    print('2. Open in your browser:');
    print(`   ${colors.yellow}http://localhost:3000${colors.reset}`);
    print('');
    print('3. Create a new project and start using CAPTA LEADS!');
    print('');

    // Step 7: Offer to start server
    print('═════════════════════════════════════════════════════════════════', 'reset');
    print('');

    const startServer = await question('Would you like to start the server now? (yes/no): ');

    if (startServer.toLowerCase() === 'yes' || startServer.toLowerCase() === 'y') {
      rl.close();
      print('');
      print('🚀 Starting server...', 'green');
      print('');

      // Start the server
      import('./server.js').then(() => {
        // Server will start and stay running
      }).catch(err => {
        print(`❌ Error starting server: ${err.message}`, 'yellow');
      });
    } else {
      print('');
      print('When ready, run: npm start', 'cyan');
      print('Then open: http://localhost:3000', 'cyan');
      print('');
      rl.close();
    }

  } catch (error) {
    print(`❌ Error: ${error.message}`, 'yellow');
    rl.close();
  }
}

// Show welcome and start setup
print('');
print('Welcome to CAPTA LEADS Setup! 🎯', 'bright');
print('');
print('This wizard will help you register as a paid customer', 'reset');
print('so you can test the full CAPTA LEADS experience locally.', 'reset');
print('');

// Start the wizard
setupPaidCustomer().catch(err => {
  print(`Fatal error: ${err.message}`, 'yellow');
  process.exit(1);
});
