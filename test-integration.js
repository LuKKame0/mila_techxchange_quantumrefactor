// Simple test to verify NVIDIA NIM integration
// This is a basic test that can be run with Node.js

import OpenAI from 'openai';

async function testNvidiaNIM() {
  const client = new OpenAI({
    baseURL: "https://integrate.api.nvidia.com/v1",
    apiKey: "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"
  });

  try {
    console.log('Testing NVIDIA NIM API connection...');
    
    const completion = await client.chat.completions.create({
      model: "ibm/granite-3.3-8b-instruct",
      messages: [{ role: "user", content: "Hello! Can you respond with a simple JSON object containing a 'status' field set to 'success'?" }],
      temperature: 0.2,
      top_p: 0.7,
      max_tokens: 100,
    });

    const response = completion.choices[0]?.message?.content;
    console.log('Response received:', response);
    console.log('✅ NVIDIA NIM integration test successful!');
    
  } catch (error) {
    console.error('❌ NVIDIA NIM integration test failed:', error.message);
  }
}

// Run the test
testNvidiaNIM(); 