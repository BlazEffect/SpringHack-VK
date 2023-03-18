import {
  ContentCard,
  Title,
  Panel,
  CardGrid,
  PanelHeader,
  Group,
  Button,
  View,
} from "@vkontakte/vkui";
import { Fragment, useEffect, useState } from "react";

import DetailCard from "./DetailCard";
import ButtonBack from '../components/ButtonBack'

const DetailCategory = ({ category, returnBack }) => {
  const [activePanel, setActivePanel] = useState("default_category");
  const returnToCategory = () => setActivePanel("default_category");
  useEffect(() => {
    console.log(activePanel);
  }, [activePanel]);
  return (
    <>
      {category.text ? (
        /* есть текст - рендерим только его */
        <Panel id="default_category">
          <Group>
            <ContentCard header={category.name} text={category.text} />
          </Group>
          <ButtonBack returnBack={returnBack} />
        </Panel>
      ) : (
        <View activePanel={activePanel}>
          <Panel id="default_category">
            {category.items.map((lesson, i) => (
              <ContentCard
                className="mb-1"
                key={i}
                header={lesson.name}
                marginHeight={20}
                onClick={() => setActivePanel(lesson.id)}
              />
            ))}
            <ButtonBack returnBack={returnBack} />
          </Panel>
          {category.items.map((lesson, i) => (
            <Panel id={lesson.id}>
              <DetailCard lesson={lesson} />
              <ButtonBack returnBack={returnToCategory} />
            </Panel>
          ))}
        </View>
      )}
    </>
  );
};

export default DetailCategory;
