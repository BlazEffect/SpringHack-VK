import { ContentCard, Group, Title } from "@vkontakte/vkui";
import { Icon12ArrowUpRightOutSquareOutline, Icon24Settings } from "@vkontakte/icons";
import { useRef, useEffect, useState } from "react";
import bridge from "@vkontakte/vk-bridge";

const DetailCard = ({ lesson }) => {
  const video = useRef();
  const [speed, setSpeed] = useState(1);
  
  /* useEffect(() => {
    video.current.playbackRate = speed;
  }, [speed]); */

  const changeSpeed = () => {
    speed === 0.25 ? '' : setSpeed(speed - 0.25);
  }

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
      <div className="flex w-full items-center justify-center relative">
        {/*  todo delete hardcode */}
        <video
          loop
          ref={video}
          className="relative"
          autoPlay
          src={''}
        >
          <source type="video/mp4" />
        </video>
        
        <div className="icon absolute -bottom-4 z-20 right-[600px]" onClick={changeSpeed}>
          <Icon24Settings width={20} height={20}  />
        </div>

      </div>
      <ContentCard
        header={lesson.name}
        className="detail-card shadow"
        text={lesson.description}
      />
      <Icon12ArrowUpRightOutSquareOutline
        onClick={shareCard}
        width={20}
        height={20}
      />
    </>
  );
};

export default DetailCard;
