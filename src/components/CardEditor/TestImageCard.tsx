import React, { useState } from 'react';

type OwnProps = {
  blankUrl: string;
  cardUrl: string;
};
const TestImageCard = ({ blankUrl, cardUrl }: OwnProps) => {
  const showImages = Boolean(blankUrl.length);

  return showImages ? (
    <div className="space-y-2">
      <img src={blankUrl} className="w-[200px]" />
      <img src={cardUrl} className="w-[200px]" />
    </div>
  ) : null;
};

export default TestImageCard;
