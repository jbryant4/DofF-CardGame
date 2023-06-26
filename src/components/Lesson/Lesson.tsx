import { useState } from 'react';
import YouTube from 'react-youtube';
import { CardDocument, LessonType } from '~/models/Card';
import { Container, Wrapper } from './Lesson.styles';
type OwnProps = {
  lesson: LessonType;
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
const Lesson = ({ lesson }: OwnProps) => {
  const { mediaLinks, quickNotes } = lesson;
  const nothingToShow = mediaLinks.length === 0 && quickNotes.length === 0;

  return nothingToShow ? (
    <div>Nothing to Show</div>
  ) : (
    <Container>
      <Wrapper className="w-3/4">
        {mediaLinks.map(url => getVideoComponenet(url))}
      </Wrapper>
    </Container>
  );
};

export default Lesson;
