'use client'

import {
  Box,
  Container,
  Flex,
  Heading,
  Section,
  Text,
  Theme,
} from '@radix-ui/themes'
import { Inter } from 'next/font/google'
import { usePathname, useSearchParams } from 'next/navigation'
import React, { Suspense, useEffect, useState } from 'react'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

import { ComponentCard } from '@/components/ComponentCard'
import { ALL_COMPONENT_DATA } from '@/components/constants'
import { DefaultContainer } from '@/components/DefaultContainer'
import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import { searchComponents } from '@/components/utils/searchComponents'
import { TComponentData } from '@/types'

const inter = Inter({ subsets: ['latin'] })

function SearchResultsContainer({ children }: { children: React.ReactNode }) {
  return (
    <Container size="3">
      <Box mt="9">
        <Heading size="7">Search Results</Heading>

        {children}
      </Box>
    </Container>
  )
}

function SearchData() {
  const [filteredData, setFilteredData] = useState<TComponentData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const search = useSearchParams().get('keyword')
  useEffect(() => {
    if (search) {
      const results = searchComponents(search, ALL_COMPONENT_DATA)
      setFilteredData(results)
    }
    setIsLoading(false)
  }, [search])

  let searchContent = null

  if (isLoading) {
    searchContent = (
      <SearchResultsContainer>
        <Text size="4" color="gray" mt="4">
          Loading...
        </Text>
      </SearchResultsContainer>
    )
  } else if (filteredData.length > 0) {
    searchContent = (
      <SearchResultsContainer>
        <Text size="4" color="gray" mt="4" mb="4">
          {`(${filteredData.length} result${
            filteredData.length > 1 ? 's' : ''
          })`}
        </Text>
        <ResponsiveMasonry>
          <Masonry gutter="18px" style={{ marginTop: 18 }}>
            {filteredData.map((data) => {
              return (
                <ComponentCard
                  key={`${data.library}-${data.name}`}
                  name={data.name}
                  library={data.library}
                  docsLink={data.docsLink ?? ''}
                >
                  {data.component}
                </ComponentCard>
              )
            })}
          </Masonry>
        </ResponsiveMasonry>
      </SearchResultsContainer>
    )
  } else {
    searchContent = (
      <SearchResultsContainer>
        <Text size="4" color="gray" mt="4">
          No results found. Please try another search query.
        </Text>
      </SearchResultsContainer>
    )
  }
  return <>{searchContent}</>
}

export default function SearchPage() {
  return (
    <Theme accentColor="indigo" panelBackground="translucent">
      <Navbar />
      <DefaultContainer py="6">
        <Suspense fallback={<></>}>
          <SearchData />
        </Suspense>
      </DefaultContainer>
      <Footer />
    </Theme>
  )
}
