import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input } from '../../common/Input/Input'
import { Button } from '../../common/Button/Button'
import { Loader } from '../../common/Loader/Loader'
import { useAuth } from '../../../context/AuthContext'
import { ROUTES } from '../../../constants/routes'

export const LoginForm = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isPending, setIsPending] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }

    setIsPending(true)
    try {
      await login({ email, password })
      navigate(ROUTES.PORTAL)
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
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
        errorMessage={error}
        label="Password"
      />
      <Button
        type="submit"
        disabled={isPending}
        className="w-full flex items-center justify-center gap-2"
      >
        {isPending ? (
          <>
            <Loader size="sm" />
            <span>Logging in...</span>
          </>
        ) : (
          'Log In'
        )}
      </Button>
    </form>
  )
}
