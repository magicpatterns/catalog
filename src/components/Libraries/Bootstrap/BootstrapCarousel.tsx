import Carousel from 'react-bootstrap/Carousel'

import { TComponentData } from '@/types'

export function BootstrapCarousel() {
  return (
    <Carousel>
      <Carousel.Item>
        <div>Slide 1 </div>
        <Carousel.Caption>
          <div>Label 1</div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div>Slide 1 </div>
        <Carousel.Caption>
          <div>Label 2</div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div>Slide 3 </div>
        <Carousel.Caption>
          <div>Label 3</div>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}

export const bootstrapCarouselData: TComponentData = {
  name: 'Carousel',
  library: 'bootstrap',
  component: <BootstrapCarousel />,
  tags: ['bootstrap', 'carousel'],
  docsLink: 'https://react-bootstrap.netlify.app/docs/components/carousel',
}
