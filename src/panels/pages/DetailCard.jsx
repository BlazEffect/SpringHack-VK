import { ContentCard, Group, Title, Switch, Text } from "@vkontakte/vkui";
import { Icon12ArrowUpRightOutSquareOutline } from "@vkontakte/icons";
import { useRef, useEffect, useState } from "react";
import bridge from "@vkontakte/vk-bridge";
import videos from "../../Videos";

const DetailCard = ({ lesson }) => {
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
        link: "https://vk.com/vkappsdev",
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
        {/*  todo delete hardcode */}
        <video
          loop
          ref={video}
          className="relative video"
          autoPlay
          src={videos[lesson.video]}
        >
          <source type="video/mp4" />
        </video>

        <div className="icon flex mt-1">
          <Text class="text-right">Замедлить видео</Text>
          <Switch className="ml-4" onClick={changeSpeed} />
        </div>
      </div>
      <ContentCard
        header={lesson.name}
        className="detail-card shadow in-card mt-3"
        text={lesson.description}
      />
      {/* 
      todo: add share i don't know how))
      <Icon12ArrowUpRightOutSquareOutline
        onClick={shareCard}
        width={20}
        height={20}
      /> */}
    </>
  );
};

export default DetailCard;
