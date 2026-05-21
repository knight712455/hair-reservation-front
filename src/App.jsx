import { useState } from 'react'
import './App.css'

export default function App() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    service: '컷트',
    date: '',
    time: '',
  })

  const [reservations, setReservations] = useState([])
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const validatePhone = (phone) => {
    return /^010-\d{4}-\d{4}$/.test(phone)
  }

  const validateForm = () => {
    const newErrors = {}

    if (!form.name.trim()) {
      newErrors.name = '고객명을 입력해주세요.'
    }

    if (!form.email.trim()) {
      newErrors.email = '이메일을 입력해주세요.'
    } else if (!validateEmail(form.email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다.'
    }

    if (!form.password.trim()) {
      newErrors.password = '비밀번호를 입력해주세요.'
    } else if (form.password.length < 8) {
      newErrors.password = '비밀번호는 8자 이상이어야 합니다.'
    }

    if (!form.phone.trim()) {
      newErrors.phone = '전화번호를 입력해주세요.'
    } else if (!validatePhone(form.phone)) {
      newErrors.phone = '전화번호는 010-1234-5678 형식으로 입력해주세요.'
    }

    if (!form.date) {
      newErrors.date = '예약 날짜를 선택해주세요.'
    }

    if (!form.time) {
      newErrors.time = '예약 시간을 선택해주세요.'
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    setForm({
      ...form,
      [name]: value,
    })

    setErrors({
      ...errors,
      [name]: '',
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (isSubmitting) return

    const isValid = validateForm()

    if (!isValid) return

    setIsSubmitting(true)

    const newReservation = {
      id: Date.now(),
      ...form,
    }

    setReservations([newReservation, ...reservations])

    setForm({
      name: '',
      email: '',
      password: '',
      phone: '',
      service: '컷트',
      date: '',
      time: '',
    })

    setErrors({})

    setTimeout(() => {
      setIsSubmitting(false)
    }, 800)
  }

  const handleDelete = (id) => {
    setReservations(reservations.filter((item) => item.id !== id))
  }

  return (
    <div className="app">
      <header className="header">
        <div>
          <p className="badge">Hair Reservation</p>
          <h1>헤어샵 예약 관리</h1>
          <p className="description">
            고객 예약 정보를 등록하고, 예약 목록을 빠르게 확인할 수 있습니다.
          </p>
        </div>
      </header>

      <main className="container">
        <section className="card">
          <h2>예약 등록</h2>

          <form className="form" onSubmit={handleSubmit}>
            <div className="field">
              <label>고객명</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="예: 박지현"
              />
              {errors.name && <p className="error">{errors.name}</p>}
            </div>

            <div className="field">
              <label>이메일</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="예: test@example.com"
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>

            <div className="field">
              <label>비밀번호</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="8자 이상 입력"
              />
              {errors.password && <p className="error">{errors.password}</p>}
            </div>

            <div className="field">
              <label>연락처</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="예: 010-1234-5678"
              />
              {errors.phone && <p className="error">{errors.phone}</p>}
            </div>

            <div className="field">
              <label>시술 선택</label>
              <select name="service" value={form.service} onChange={handleChange}>
                <option>컷트</option>
                <option>염색</option>
                <option>펌</option>
                <option>클리닉</option>
              </select>
            </div>

            <div className="row">
              <div className="field">
                <label>예약 날짜</label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                />
                {errors.date && <p className="error">{errors.date}</p>}
              </div>

              <div className="field">
                <label>예약 시간</label>
                <input
                  type="time"
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                />
                {errors.time && <p className="error">{errors.time}</p>}
              </div>
            </div>

            <button
              className="submit-button"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? '등록 중...' : '예약 등록하기'}
            </button>
          </form>
        </section>

        <section className="card">
          <div className="list-header">
            <h2>예약 목록</h2>
            <span>{reservations.length}건</span>
          </div>

          {reservations.length === 0 ? (
            <div className="empty">
              아직 등록된 예약이 없습니다.
            </div>
          ) : (
            <div className="reservation-list">
              {reservations.map((item) => (
                <div className="reservation-item" key={item.id}>
                  <div>
                    <strong>{item.name}</strong>
                    <p>{item.service} · {item.date} {item.time}</p>
                    <p className="phone">{item.phone}</p>
                    <p className="email">{item.email}</p>
                  </div>

                  <button onClick={() => handleDelete(item.id)}>
                    삭제
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}