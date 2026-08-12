import React, { useState } from 'react'
import { Input } from '../../common/Input/Input'
import { Button } from '../../common/Button/Button'
import { Loader } from '../../common/Loader/Loader'

export const SignupForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [isPending, setIsPending] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    setIsPending(true)
    try {
      // TODO: Wire up to backend signup endpoint once auth is implemented
      console.log('Signup attempt:', { email, password })
      // await signupMutation.mutateAsync({ email, password })
    } catch (err) {
      setError(err.message || 'Signup failed')
    } finally {
      setIsPending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-sm">
      <Input
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isPending}
        error={!!error}
        label="Email"
      />
      <Input
        type="password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isPending}
        error={!!error}
        label="Password"
      />
      <Input
        type="password"
        placeholder="••••••••"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        disabled={isPending}
        error={!!error}
        errorMessage={error}
        label="Confirm Password"
      />
      <Button
        type="submit"
        disabled={isPending}
        className="w-full flex items-center justify-center gap-2"
      >
        {isPending ? (
          <>
            <Loader size="sm" />
            <span>Signing up...</span>
          </>
        ) : (
          'Sign Up'
        )}
      </Button>
    </form>
  )
}
