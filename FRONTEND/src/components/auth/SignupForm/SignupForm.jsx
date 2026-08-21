import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input } from '../../common/Input/Input'
import { Button } from '../../common/Button/Button'
import { Loader2 } from 'lucide-react'
import { useAuth } from '../../../context/AuthContext'
import { ROUTES } from '../../../constants/routes'
import { ErrorCard } from '../../common/ErrorCard/ErrorCard'

export const SignupForm = () => {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [isPending, setIsPending] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!name || !email || !password || !confirmPassword) {
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
      await register({ name, email, password })
      navigate(ROUTES.LOGIN)
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data?.error || err.message || 'Signup failed')
    } finally {
      setIsPending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      {error && (
        <ErrorCard message={error} onClose={() => setError('')} />
      )}
      
      <Input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={isPending}
        error={!!error && error.includes('name')}
        label="Name"
      />
      <Input
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isPending}
        error={!!error && error.includes('email')}
        label="Email"
      />
      <Input
        type="password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isPending}
        error={!!error && error.includes('Password must')}
        label="Password"
      />
      <Input
        type="password"
        placeholder="••••••••"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        disabled={isPending}
        error={!!error && error.includes('match')}
        label="Confirm Password"
      />
      <Button
        type="submit"
        disabled={isPending}
        className="w-full min-h-[46px] justify-center"
      >
        {isPending ? (
          <Loader2 className="w-5 h-5 animate-spin text-white" />
        ) : (
          'Sign Up'
        )}
      </Button>
    </form>
  )
}
