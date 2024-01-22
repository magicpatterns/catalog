import { Carousel } from 'antd'

import { TComponentData } from '@/types'

const contentStyle: React.CSSProperties = {
  margin: 0,
  color: '#fff',
  textAlign: 'center',
  backgroundColor: '#364d79',
  height: 100,
}

export function AntCarousel() {
  return (
    <Carousel>
      <div>
        <h3 style={contentStyle}>1</h3>
      </div>
      <div>
        <h3 style={contentStyle}>2</h3>
      </div>
      <div>
        <h3 style={contentStyle}>3</h3>
      </div>
      <div>
        <h3 style={contentStyle}>4</h3>
      </div>
    </Carousel>
  )
}

export const antCarouselData: TComponentData = {
  name: 'Carousel',
  library: 'ant',
  component: <AntCarousel />,
  tags: ['ant', 'carousel', 'photos'],
  docsLink: 'https://ant.design/components/carousel',
}
