import { ContentCard, Switch, Text } from "@vkontakte/vkui";
import { Icon12ArrowUpRightOutSquareOutline } from "@vkontakte/icons";
import { useRef, useEffect, useState } from "react";
import bridge from "@vkontakte/vk-bridge";

const DetailCard = ({ lesson }) => {
  const videoLessonPath = require('../../videos/' + lesson.video + '.mp4');
  const video = useRef();
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    video.current.playbackRate = speed;
  }, [speed]);

  const changeSpeed = () => {
    speed === 1 ? setSpeed(0.5) : setSpeed(1);
  };

  const shareCard = async () => {
    bridge
      .send("VKWebAppShare", {
        link: "https://vk.com/app51584191",
      })
      .then((data) => {
        if (data.result) {
          // Запись размещена
        }
      })
      .catch((error) => {
        // Ошибка
        console.log(error);
      });
  };

  return (
    <>
      <div className="flex flex-col w-full items-center justify-center relative">
        <video
          loop
          ref={video}
          className="relative video"
          autoPlay
          src={videoLessonPath}
        >
          <source type="video/mp4" />
        </video>

        <div className="icon flex mt-1">
          <Text className="text-right">Замедлить видео</Text>
          <Switch className="ml-4" onClick={changeSpeed} />
          
          <Icon12ArrowUpRightOutSquareOutline
            onClick={shareCard}
            width={20}
            height={20}
          />
        </div>
      </div>
      <ContentCard
        header={lesson.name}
        className="detail-card shadow in-card mt-3"
        text={lesson.description}
      />
    </>
  );
};

export default DetailCard;
