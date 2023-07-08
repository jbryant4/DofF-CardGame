import { useState } from 'react';
import YouTube from 'react-youtube';
import Cog from '~/icons/Cog';
import { CardDocument, LessonType } from '~/models/Card';
import { Container, Wrapper } from './Lesson.styles';
type OwnProps = {
  lesson: LessonType;
  title: string;
};
function extractYouTubeVideoId(url) {
  const videoIdMatch = url.match(
    /(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?\s]+)/
  );

  return videoIdMatch ? videoIdMatch[1] : '';
}

function editShortUrl(url) {
  if (url.includes('youtube.com/shorts/')) {
    url = url.replace('youtube.com/shorts/', 'youtube.com/embed/');
  } else if (url.includes('youtu.be/shorts/')) {
    url = url.replace('youtu.be/shorts/', 'youtube.com/embed/');
  }

  return url;
}

const getVideoComponenet = (url: string) => {
  switch (true) {
    case url.includes('youtube') && url.includes('short'):
      const newUrl = editShortUrl(url);

      return (
        <div>
          <iframe
            width="315"
            height="560"
            src={newUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      );
    case url.includes('youtube'):
      const videoId = extractYouTubeVideoId(url);

      return (
        <div key={url}>
          <YouTube videoId={videoId} />
        </div>
      );
    case url.includes('tiktok'):
      return (
        <div key={url}>
          <video controls className="h-auto w-full">
            <source src={url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      );
    default:
      return null;
  }
};
const Lesson = ({ lesson, title }: OwnProps) => {
  const { mediaLinks, quickNotes } = lesson;
  const nothingToShow = mediaLinks.length === 0 && quickNotes.length === 0;
  const [activate, setActivate] = useState(false);

  return nothingToShow ? (
    <div>Nothing to Show</div>
  ) : (
    <Container className="border border-black border-solid grid grid-cols-[3fr,2fr] p-24 rounded w-full">
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
          <ul className="px-24 text-20">
            {quickNotes.map((note, index) => (
              <li key={index} className="flex gap-8 items-start">
                <img src="/quill.png" className="w-24" />
                <div>{note}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>{mediaLinks.map(url => getVideoComponenet(url))}</div>
    </Container>
  );
};

export default Lesson;
