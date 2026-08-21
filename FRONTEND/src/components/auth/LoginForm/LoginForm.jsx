import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input } from '../../common/Input/Input'
import { Button } from '../../common/Button/Button'
import { Loader2 } from 'lucide-react'
import { useAuth } from '../../../context/AuthContext'
import { ROUTES } from '../../../constants/routes'
import { ErrorCard } from '../../common/ErrorCard/ErrorCard'

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
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      {error && (
        <ErrorCard message={error} onClose={() => setError('')} />
      )}
      
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
        error={!!error && error.includes('password')}
        label="Password"
      />
      <Button
        type="submit"
        disabled={isPending}
        className="w-full min-h-[46px] justify-center"
      >
        {isPending ? (
          <Loader2 className="w-5 h-5 animate-spin text-white" />
        ) : (
          'Log In'
        )}
      </Button>
    </form>
  )
}
