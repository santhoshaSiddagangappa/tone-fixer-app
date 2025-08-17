import { POST } from '@/app/api/fix-tone/route.ts'

import { createMocks } from 'node-mocks-http'

// Mock GoogleGenerativeAI
jest.mock('@google/generative-ai', () => ({
  GoogleGenerativeAI: jest.fn().mockImplementation(() => ({
    getGenerativeModel: jest.fn().mockReturnValue({
      generateContent: jest.fn()
    })
  }))
}))

describe('/api/fix-tone', () => {
  beforeEach(() => {
    process.env.GEMINI_API_KEY = 'test-api-key'
  })

  afterEach(() => {
    delete process.env.GEMINI_API_KEY
  })

  test('returns 405 for non-POST requests', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(405)
    expect(JSON.parse(res._getData())).toEqual({
      error: 'Method not allowed'
    })
  })

  test('returns 400 for missing required fields', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        text: 'Test message'
        // Missing profession and tone
      },
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(400)
    expect(JSON.parse(res._getData())).toEqual({
      error: 'Missing required fields'
    })
  })

  test('returns 500 when API key is missing', async () => {
    delete process.env.GEMINI_API_KEY

    const { req, res } = createMocks({
      method: 'POST',
      body: {
        text: 'Test message',
        profession: 'Software Engineer',
        tone: 'Professional'
      },
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(500)
    expect(JSON.parse(res._getData())).toEqual({
      error: 'API key not configured'
    })
  })

  test('successfully processes valid request', async () => {
    const mockResponse = {
      response: {
        text: () => 'Transformed professional message'
      }
    }

    const { GoogleGenerativeAI } = require('@google/generative-ai')
    const mockModel = {
      generateContent: jest.fn().mockResolvedValue(mockResponse)
    }
    GoogleGenerativeAI.mockImplementation(() => ({
      getGenerativeModel: jest.fn().mockReturnValue(mockModel)
    }))

    const { req, res } = createMocks({
      method: 'POST',
      body: {
        text: 'Hey, send me that report!',
        profession: 'Software Engineer',
        tone: 'Professional'
      },
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual({
      result: 'Transformed professional message'
    })
  })

  test('handles Gemini API errors', async () => {
    const { GoogleGenerativeAI } = require('@google/generative-ai')
    const mockModel = {
      generateContent: jest.fn().mockRejectedValue(new Error('API Error'))
    }
    GoogleGenerativeAI.mockImplementation(() => ({
      getGenerativeModel: jest.fn().mockReturnValue(mockModel)
    }))

    const { req, res } = createMocks({
      method: 'POST',
      body: {
        text: 'Test message',
        profession: 'Software Engineer',
        tone: 'Professional'
      },
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(500)
    expect(JSON.parse(res._getData())).toEqual({
      error: 'Failed to process request. Please try again.'
    })
  })

  test('handles quota exceeded error', async () => {
    const { GoogleGenerativeAI } = require('@google/generative-ai')
    const mockModel = {
      generateContent: jest.fn().mockRejectedValue(new Error('quota exceeded'))
    }
    GoogleGenerativeAI.mockImplementation(() => ({
      getGenerativeModel: jest.fn().mockReturnValue(mockModel)
    }))

    const { req, res } = createMocks({
      method: 'POST',
      body: {
        text: 'Test message',
        profession: 'Software Engineer',
        tone: 'Professional'
      },
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(429)
    expect(JSON.parse(res._getData())).toEqual({
      error: 'Rate limit exceeded. Please try again in a moment.'
    })
  })
})