import { useState } from 'react';
import BlueBtn from '@/Global/BlueBtn';
import Cog from '~/icons/Cog';
import { LessonType } from '~/models/Card';
import { Container } from './Lesson.styles';

type OwnProps = {
  lesson: LessonType;
};

function editShortUrl(url) {
  if (url.includes('youtube.com/shorts/')) {
    url = url.replace('youtube.com/shorts/', 'youtube.com/embed/');
  } else if (url.includes('youtu.be/shorts/')) {
    url = url.replace('youtu.be/shorts/', 'youtube.com/embed/');
  }

  return url;
}

const getVideoComponent = (url: string) => {
  if (url.includes('youtube') && url.includes('shorts')) {
    const newUrl = editShortUrl(url);

    return (
      <div>
        <iframe
          width="282"
          height="500"
          src={newUrl}
          title="YouTube video player"
          allow="encrypted-media;"
        ></iframe>
      </div>
    );
  }

  return (
    <div className="font-bold text-center text-red-800">
      Not a Youtube Short Url!! <br />
      Please update on admin page
    </div>
  );
};
const Lesson = ({ lesson }: OwnProps) => {
  const { mediaLinks, quickNotes } = lesson;
  const nothingToShow = mediaLinks.length === 0 && quickNotes.length === 0;
  const [activate, setActivate] = useState(false);
  const [mediaIndex, setMediaIndex] = useState(0);

  const numberArray = Array.from(
    { length: mediaLinks.length },
    (_, index) => index + 1
  );

  return nothingToShow ? (
    <div>Nothing to Show</div>
  ) : (
    <Container className="border border-black border-solid grid grid-cols-[1fr,1fr] p-24 rounded w-full">
      <div>
        <div className="flex h-fit items-center mb-12 mx-auto relative w-fit">
          <Cog
            timeCog
            positiveRotation={false}
            size={150}
            activate={activate}
          />
          <div className="-ml-56 font-bold text-48 text-white w-fit whitespace-nowrap">
            History Lesson
          </div>
        </div>
        <div className="font-serif">
          <ul className="px-24 text-18">
            {quickNotes.map((note, index) => (
              <li key={index} className="flex gap-8 items-start">
                <img src="/quill.png" className="w-24" />
                <div>{note}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {mediaLinks.length !== 0 ? (
        <div className="flex items-center justify-around">
          <div>{getVideoComponent(mediaLinks[mediaIndex])}</div>
          <div className="flex flex-col gap-12">
            {numberArray.map(num => (
              <BlueBtn
                active={num - 1 === mediaIndex}
                key={num}
                onClick={() => setMediaIndex(num - 1)}
              >
                {num}
              </BlueBtn>
            ))}
          </div>
        </div>
      ) : (
        <div>No Media Links in DB</div>
      )}
    </Container>
  );
};

export default Lesson;
