import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ToneFixer from '@/components/ToneFixer'; // Adjust path as needed

// Mock fetch
global.fetch = jest.fn()

describe('ToneFixer Component', () => {
  beforeEach(() => {
    fetch.mockClear()
  })

  test('renders main heading', () => {
    render(<ToneFixer />)
    expect(screen.getByText('Perfect Your')).toBeInTheDocument()
    expect(screen.getByText('Professional Tone')).toBeInTheDocument()
  })

  test('renders form elements', () => {
    render(<ToneFixer />)

    // Check textarea
    expect(screen.getByPlaceholderText(/Paste your text here/)).toBeInTheDocument()

    // Check dropdowns
    expect(screen.getByText('Choose profession...')).toBeInTheDocument()
    expect(screen.getByText('Select your preferred tone...')).toBeInTheDocument()

    // Check button
    expect(screen.getByText('Transform My Text')).toBeInTheDocument()
  })

  test('shows character count', async () => {
    const user = userEvent.setup()
    render(<ToneFixer />)

    const textarea = screen.getByPlaceholderText(/Paste your text here/)
    await user.type(textarea, 'Hello world')

    expect(screen.getByText('11/2000 characters')).toBeInTheDocument()
  })

  test('shows validation error for empty text', async () => {
    const user = userEvent.setup()
    render(<ToneFixer />)

    const button = screen.getByText('Transform My Text')
    await user.click(button)

    expect(screen.getByText('Please enter some text')).toBeInTheDocument()
  })

  test('shows validation error for missing profession', async () => {
    const user = userEvent.setup()
    render(<ToneFixer />)

    const textarea = screen.getByPlaceholderText(/Paste your text here/)
    await user.type(textarea, 'Test message')

    const button = screen.getByText('Transform My Text')
    await user.click(button)

    expect(screen.getByText('Please select a profession')).toBeInTheDocument()
  })

  test('shows validation error for text too long', async () => {
    const user = userEvent.setup()
    render(<ToneFixer />)

    const textarea = screen.getByPlaceholderText(/Paste your text here/)
    const longText = 'a'.repeat(2001)
    await user.type(textarea, longText)

    const button = screen.getByText('Transform My Text')
    await user.click(button)

    expect(screen.getByText('Text too long (max 2000 characters)')).toBeInTheDocument()
  })

  test('enables custom profession input when "Other" is selected', async () => {
    const user = userEvent.setup()
    render(<ToneFixer />)

    const professionSelect = screen.getByDisplayValue('')
    await user.selectOptions(professionSelect, 'Other')

    expect(screen.getByPlaceholderText(/e.g., Freelance Designer/)).toBeInTheDocument()
  })

  test('submits form with valid data', async () => {
    const user = userEvent.setup()

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        result: 'Transformed text result'
      })
    })

    render(<ToneFixer />)

    // Fill form
    await user.type(screen.getByPlaceholderText(/Paste your text here/), 'Test message')
    await user.selectOptions(screen.getAllByRole('combobox')[0], 'Software Engineer')
    await user.selectOptions(screen.getAllByRole('combobox')[1], 'Professional')

    // Submit
    await user.click(screen.getByText('Transform My Text'))

    // Check loading state
    expect(screen.getByText('Transforming Your Text...')).toBeInTheDocument()

    // Wait for result
    await waitFor(() => {
      expect(screen.getByText('Transformed text result')).toBeInTheDocument()
    })
  })

  test('handles API error gracefully', async () => {
    const user = userEvent.setup()

    fetch.mockRejectedValueOnce(new Error('Network error'))

    render(<ToneFixer />)

    // Fill form
    await user.type(screen.getByPlaceholderText(/Paste your text here/), 'Test message')
    await user.selectOptions(screen.getAllByRole('combobox')[0], 'Software Engineer')
    await user.selectOptions(screen.getAllByRole('combobox')[1], 'Professional')

    // Submit
    await user.click(screen.getByText('Transform My Text'))

    // Wait for error
    await waitFor(() => {
      expect(screen.getByText('Something went wrong. Please try again.')).toBeInTheDocument()
    })
  })

  test('copies result to clipboard', async () => {
    const user = userEvent.setup()

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        result: 'Transformed text result'
      })
    })

    render(<ToneFixer />)

    // Fill and submit form
    await user.type(screen.getByPlaceholderText(/Paste your text here/), 'Test message')
    await user.selectOptions(screen.getAllByRole('combobox')[0], 'Software Engineer')
    await user.selectOptions(screen.getAllByRole('combobox')[1], 'Professional')
    await user.click(screen.getByText('Transform My Text'))

    // Wait for result and copy
    await waitFor(() => {
      expect(screen.getByText('Transformed text result')).toBeInTheDocument()
    })

    const copyButton = screen.getByTitle('Copy to clipboard')
    await user.click(copyButton)

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('Transformed text result')
    expect(screen.getByText('Copied to clipboard! ✓')).toBeInTheDocument()
  })

  test('toggles mobile menu', async () => {
    const user = userEvent.setup()
    render(<ToneFixer />)

    const menuButton = screen.getByRole('button', { name: /menu/i })
    await user.click(menuButton)

    // Mobile menu should be visible
    expect(screen.getByText('Features')).toBeInTheDocument()
    expect(screen.getByText('Pricing')).toBeInTheDocument()
  })
})