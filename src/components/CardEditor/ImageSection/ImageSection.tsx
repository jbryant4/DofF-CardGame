import React, { useState } from 'react';
import { Container, ImageWrapper } from './ImageSection.styles';

type OwnProps = {
  blankUrl: string;
  cardUrl: string;
};
const ImageSection = ({ blankUrl, cardUrl }: OwnProps) => {
  const showImages = Boolean(blankUrl.length);

  return showImages ? (
    <Container>
      <h2 className="font-bold text-2xl">Images</h2>
      <div className="text-blue-800 text-sm">
        * aim for a 3/4 aspect ratio on the cards
      </div>
      <div>
        Blank Img
        <ImageWrapper>
          <img src={blankUrl} className="w-[180px]" />
        </ImageWrapper>
      </div>
      <div>
        Physical Card Img
        <ImageWrapper>
          <img src={cardUrl} className="w-[180px]" />
        </ImageWrapper>
      </div>
    </Container>
  ) : null;
};

export default ImageSection;
