import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get('url')

  if (!url) {
    return NextResponse.json({ error: 'Missing target URL' }, { status: 400 })
  }

  try {
    const apiResponse = await fetch(url)
    if (!apiResponse.ok) {
      return NextResponse.json({ error: 'External API error' }, { status: apiResponse.status })
    }
    const data = await apiResponse.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
  }
}