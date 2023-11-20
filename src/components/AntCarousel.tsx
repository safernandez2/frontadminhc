import React from 'react';
import { Carousel } from 'antd';

const contentStyle: React.CSSProperties = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const AntCarousel: React.FC = () => (
  <Carousel autoplay>
    <div>
      <h3 style={contentStyle}>one</h3>
    </div>
    <div>
      <h3 style={contentStyle}>two</h3>
    </div>
    <div>
      <h3 style={contentStyle}>three</h3>
    </div>
    <div>
      <h3 style={contentStyle}>four</h3>
    </div>
  </Carousel>
);

export default AntCarousel;
