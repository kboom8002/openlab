'use client';

import { useState } from 'react';
import Link from 'next/link';
import { safeRoute } from '@/lib/routes';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main id="main">
      <section style={{ padding: '5rem 0 4rem', background: 'linear-gradient(180deg, var(--company-mist), #fff)' }}>
        <div style={{ maxWidth: '76rem', margin: '0 auto', padding: '0 1.25rem' }}>
          <div style={{ color: 'var(--company-muted)', fontSize: '0.875rem', marginBottom: '1rem' }}>
            <Link href={safeRoute('/company')} style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
            <span style={{ margin: '0 0.5rem' }}>/</span>
            <span style={{ color: 'var(--company-ink)' }}>Contact</span>
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--company-ink)', marginBottom: '1.5rem', wordBreak: 'keep-all' }}>
            Contact Us
          </h1>
        </div>
      </section>

      <section style={{ padding: '2rem 0 6rem', background: '#fff' }}>
        <div style={{ maxWidth: '76rem', margin: '0 auto', padding: '0 1.25rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
            <div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--company-ink)', marginBottom: '1.5rem' }}>
                함께 논의할 수 있는 주제
              </h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 3rem 0' }}>
                {['기업·기관 AX', 'Jeju-to-global', '지역·공공 협력', 'AI 교육과 소셜 임팩트'].map((item, i) => (
                  <li key={i} style={{ padding: '1rem 0', borderBottom: '1px solid var(--company-line)', color: 'var(--company-ink)', fontWeight: 500 }}>
                    {item}
                  </li>
                ))}
              </ul>
              <div>
                <p style={{ color: 'var(--company-muted)', marginBottom: '0.5rem' }}>이메일</p>
                <p style={{ fontWeight: 600, color: 'var(--company-ink)', fontSize: '1.125rem' }}>contact@wellb.company</p>
              </div>
            </div>

            <div style={{ background: 'var(--company-mist)', padding: '2.5rem', borderRadius: 'var(--company-radius)' }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--company-forest)', marginBottom: '1rem' }}>문의가 접수되었습니다.</h3>
                  <p style={{ color: 'var(--company-muted)' }}>확인 후 빠르게 연락드리겠습니다.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: 'var(--company-ink)' }}>이름</label>
                    <input type="text" required style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--company-line)', borderRadius: '0.5rem' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: 'var(--company-ink)' }}>이메일</label>
                    <input type="email" required style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--company-line)', borderRadius: '0.5rem' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: 'var(--company-ink)' }}>소속</label>
                    <input type="text" style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--company-line)', borderRadius: '0.5rem' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: 'var(--company-ink)' }}>문의 유형</label>
                    <select style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--company-line)', borderRadius: '0.5rem' }}>
                      <option>기업·기관 AX</option>
                      <option>Jeju-to-global</option>
                      <option>지역·공공 협력</option>
                      <option>기타</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: 'var(--company-ink)' }}>문의 내용</label>
                    <textarea required rows={5} style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--company-line)', borderRadius: '0.5rem', resize: 'vertical' }}></textarea>
                  </div>
                  <button type="submit" style={{ background: 'var(--company-forest)', color: '#fff', padding: '1rem', border: 'none', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer', marginTop: '1rem' }}>
                    보내기
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
