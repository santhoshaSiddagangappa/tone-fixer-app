describe('Form Validation', () => {
  const validateForm = (text, profession, tone, customProfession = '', customTone = '') => {
    if (!text.trim()) return 'Please enter some text'
    if (text.length > 2000) return 'Text too long (max 2000 characters)'
    if (!profession) return 'Please select a profession'
    if (!tone) return 'Please select a tone'
    if (profession === 'Other' && !customProfession.trim()) return 'Please specify your profession'
    if (tone === 'Other' && !customTone.trim()) return 'Please specify the desired tone'
    return null
  }

  test('validates empty text', () => {
    expect(validateForm('', 'Engineer', 'Professional')).toBe('Please enter some text')
    expect(validateForm('   ', 'Engineer', 'Professional')).toBe('Please enter some text')
  })

  test('validates text length', () => {
    const longText = 'a'.repeat(2001)
    expect(validateForm(longText, 'Engineer', 'Professional')).toBe('Text too long (max 2000 characters)')
  })

  test('validates profession selection', () => {
    expect(validateForm('Hello', '', 'Professional')).toBe('Please select a profession')
  })

  test('validates tone selection', () => {
    expect(validateForm('Hello', 'Engineer', '')).toBe('Please select a tone')
  })

  test('validates custom profession', () => {
    expect(validateForm('Hello', 'Other', 'Professional', '')).toBe('Please specify your profession')
    expect(validateForm('Hello', 'Other', 'Professional', '   ')).toBe('Please specify your profession')
  })

  test('validates custom tone', () => {
    expect(validateForm('Hello', 'Engineer', 'Other', '', '')).toBe('Please specify the desired tone')
    expect(validateForm('Hello', 'Engineer', 'Other', '', '   ')).toBe('Please specify the desired tone')
  })

  test('passes valid input', () => {
    expect(validateForm('Hello world', 'Engineer', 'Professional')).toBe(null)
    expect(validateForm('Hello world', 'Other', 'Other', 'Custom Prof', 'Custom Tone')).toBe(null)
  })
})