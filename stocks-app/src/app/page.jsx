'use client'
import './page.scss'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const tickers = ['AAPL', 'GOOG', 'TSLA', 'AMZN', 'MSFT', 'V', 'NVDA', 'XOM']
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export default function HomePage() {

  const [stocks, setStocks] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchAllStocks = async () => {

      const cached = localStorage.getItem('cachedStocks')

      if (cached) {
        setStocks(JSON.parse(cached))
      }

      try {
        const fetchedData = {}

        for (const ticker of tickers) {
          const response = await fetch(`${BASE_URL}/stocks/${ticker}`)
          if (!response.ok) throw new Error(`Failed to fetch ${ticker}`)

          const data = await response.json()
          fetchedData[ticker] = data
        }

        // store fresh data
        localStorage.setItem('cachedStocks', JSON.stringify(fetchedData))
        setStocks(fetchedData)

      } catch (err) {
        if (Object.keys(cachedData).length > 0) {
          setStocks(cachedData)
        } else {
          setError('No data available.')
        }

      } finally {
        setLoading(false)
      }
    }

    fetchAllStocks()
  }, [])

  const Card = ({ ticker }) => {
    const stock = stocks?.[ticker]

    return (
      <Link
        href={`/stock/${ticker}`}
        data-testid={`stock-link-${ticker}`}
        className="stock__item"
      >
        {stock ? (
          <>
            <p className="stock__name">{stock.shortName}</p>
            <p className="stock__ticker">{ticker}</p>
            <p className="stock__price"><span>Price:</span> ${stock.price}</p>
          </>
        ) : (
          <>
            <p className="stock__ticker">{ticker}</p>
            <p className="stock__price">Cached data</p>
          </>
        )}
      </Link>
    )
  }

  return (
    <main className="page__container">
      <div data-testid="hydrated-marker">
        <div className="stock-list">
          {tickers.map((ticker) => (
            <Card key={ticker} ticker={ticker} />
          ))}
        </div>
      </div>
    </main>
  )
}