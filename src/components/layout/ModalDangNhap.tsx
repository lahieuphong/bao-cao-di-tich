'use client'

import { FormEvent, useEffect, useState } from 'react'
import type { DangNhapItem } from '@/src/data/dangNhap'

interface ModalDangNhapProps {
  isOpen: boolean
  onClose: () => void
  dangNhapItems: DangNhapItem[]
  onLoginSuccess: (user: { id: string; username: string; avatar: string }) => void
  onNotify: (payload: { type: 'success' | 'error'; message: string }) => void
}

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}

function LoginIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 3h3a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3h-3" />
      <path d="M10 17 15 12 10 7" />
      <path d="M15 12H3" />
    </svg>
  )
}

function UsernameIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20a8 8 0 0 1 16 0" />
    </svg>
  )
}

function PasswordIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="11" width="16" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
      <circle cx="12" cy="15.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function AuthHeaderIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3 7 3v5c0 4.8-3 8.5-7 10-4-1.5-7-5.2-7-10V6l7-3Z" />
      <path d="m9.5 12 1.8 1.8 3.2-3.2" />
    </svg>
  )
}

export default function ModalDangNhap({
  isOpen,
  onClose,
  dangNhapItems,
  onLoginSuccess,
  onNotify,
}: ModalDangNhapProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isAutoTyping, setIsAutoTyping] = useState(false)
  const [resultMessage, setResultMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      return
    }

    let usernameTimer: ReturnType<typeof setInterval> | null = null
    let passwordTimer: ReturnType<typeof setInterval> | null = null
    let passwordStartTimer: ReturnType<typeof setTimeout> | null = null
    let resetTimer: ReturnType<typeof setTimeout> | null = null

    const startAutoTyping = (defaultUsername: string, defaultPassword: string) => {
      let usernameIndex = 0
      usernameTimer = setInterval(() => {
        usernameIndex += 1
        setUsername(defaultUsername.slice(0, usernameIndex))

        if (usernameIndex >= defaultUsername.length) {
          if (usernameTimer) {
            clearInterval(usernameTimer)
            usernameTimer = null
          }

          let passwordIndex = 0
          passwordStartTimer = setTimeout(() => {
            passwordTimer = setInterval(() => {
              passwordIndex += 1
              setPassword(defaultPassword.slice(0, passwordIndex))

              if (passwordIndex >= defaultPassword.length) {
                if (passwordTimer) {
                  clearInterval(passwordTimer)
                  passwordTimer = null
                }
                setIsAutoTyping(false)
              }
            }, 170)
          }, 320)
        }
      }, 170)
    }

    resetTimer = setTimeout(() => {
      setUsername('')
      setPassword('')
      setResultMessage('')
      setShowPassword(false)
      setIsAutoTyping(true)

      const defaultAccount = dangNhapItems[0]
      const usernameFromFile = String(defaultAccount?.username ?? '').trim()
      const passwordFromFile = String(defaultAccount?.password ?? '')

      if (!usernameFromFile || !passwordFromFile) {
        setIsAutoTyping(false)
      } else {
        startAutoTyping(usernameFromFile, passwordFromFile)
      }
    }, 0)

    return () => {
      if (resetTimer) {
        clearTimeout(resetTimer)
      }
      if (usernameTimer) {
        clearInterval(usernameTimer)
      }
      if (passwordTimer) {
        clearInterval(passwordTimer)
      }
      if (passwordStartTimer) {
        clearTimeout(passwordStartTimer)
      }
    }
  }, [dangNhapItems, isOpen])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setIsSubmitting(true)
    setResultMessage('')

    const matchedAccount = dangNhapItems.find(
      (item) => item.username === username.trim() && item.password === password,
    )

    if (!matchedAccount) {
      setIsSuccess(false)
      const message = 'Username hoặc password không đúng.'
      setResultMessage(message)
      onNotify({ type: 'error', message })
      setIsSubmitting(false)
      return
    }

    setIsSuccess(true)
    const message = 'Đăng nhập thành công.'
    setResultMessage(message)
    onNotify({ type: 'success', message })
    onLoginSuccess({
      id: matchedAccount.id,
      username: matchedAccount.username,
      avatar: matchedAccount.avatar,
    })
    setIsSubmitting(false)
    onClose()
  }

  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div
        className="w-full max-w-md overflow-hidden rounded-2xl border border-[#6f8fff]/30 bg-[#0e1422]/78 shadow-[0_28px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl"
      >
        <div className="relative flex items-center justify-end border-b border-[#6f8fff]/25 px-5 py-4">
          <p className="absolute left-1/2 inline-flex -translate-x-1/2 items-center gap-2 text-base font-semibold tracking-normal text-white">
            <AuthHeaderIcon />
            <span>Đăng nhập hệ thống</span>
          </p>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#6f8fff]/30 bg-[#101a30] text-white/85 transition hover:bg-[#172340] hover:text-white"
            aria-label="Đóng đăng nhập"
          >
            <CloseIcon />
          </button>
        </div>

        <form className="space-y-4 px-5 py-5" onSubmit={handleSubmit}>
          <div className="space-y-2.5">
            <label htmlFor="username" className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/90">
              <UsernameIcon />
              <span>Username</span>
            </label>
            <input
              id="username"
              type="text"
              value={username}
              disabled={isAutoTyping}
              onChange={(event) => {
                setUsername(event.target.value)
                if (resultMessage) {
                  setResultMessage('')
                }
              }}
              className="h-10 w-full rounded-lg border border-[#6f8fff]/30 bg-[#111b31]/80 px-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-[#537cff] focus:ring-2 focus:ring-[#537cff]/20"
              placeholder="Nhập username"
            />
          </div>

          <div className="space-y-2.5">
            <label htmlFor="password" className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/90">
              <PasswordIcon />
              <span>Password</span>
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                disabled={isAutoTyping}
                onChange={(event) => {
                  setPassword(event.target.value)
                  if (resultMessage) {
                    setResultMessage('')
                  }
                }}
                className="h-10 w-full rounded-lg border border-[#6f8fff]/30 bg-[#111b31]/80 px-3 pr-10 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-[#537cff] focus:ring-2 focus:ring-[#537cff]/20"
                placeholder="Nhập password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                disabled={isAutoTyping}
                className="absolute right-2 top-1/2 inline-flex h-6 w-6 -translate-y-1/2 items-center justify-center text-white/65 transition hover:text-white"
                aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
              >
                {showPassword ? (
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 3 21 21" />
                    <path d="M10.6 10.7a2 2 0 0 0 2.8 2.8" />
                    <path d="M9.4 5.2A10.8 10.8 0 0 1 12 5c6 0 9.8 7 9.8 7a17.1 17.1 0 0 1-4.1 4.7" />
                    <path d="M6.2 6.4A17 17 0 0 0 2.2 12s3.8 7 9.8 7a11.3 11.3 0 0 0 4.1-.8" />
                  </svg>
                ) : (
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2.2 12s3.8-7 9.8-7 9.8 7 9.8 7-3.8 7-9.8 7-9.8-7-9.8-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || isAutoTyping}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#3a66ff] text-sm font-semibold text-white transition hover:bg-[#3058e6] disabled:cursor-not-allowed disabled:opacity-70"
          >
            <LoginIcon />
            {isAutoTyping ? 'Đang tự điền...' : isSubmitting ? 'Đang đăng nhập...' : 'Đăng Nhập'}
          </button>

          {resultMessage ? (
            <p className={`text-center text-sm font-medium ${isSuccess ? 'text-emerald-300' : 'text-red-300'}`}>
              {resultMessage}
            </p>
          ) : null}
        </form>
      </div>
    </div>
  )
}
