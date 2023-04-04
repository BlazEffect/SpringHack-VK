import React from "react";
import { useState } from "react";
import { CardGrid, Button, Group, Panel, ContentCard, View } from "@vkontakte/vkui";
import mainCard from "../assets/image/main_picture.png";
import tests from "../data/tests.json";
import DetailTest from "./DetailTest";

const Tests = () => {
  const [activePanel, setActivePanel] = useState("default_tests");

  return (
    <Group>
      <CardGrid size="l">
        <View activePanel={activePanel}>
          <Panel id="default_tests">
            <img className="mx-auto" src={mainCard} />
            {tests.map((test) => (
              <ContentCard
                className="shadow"
                key={test.id}
                header={test.name}
                caption={test.description}
                onClick={() => setActivePanel(test.id)}
              />
            ))}
          </Panel>
          {tests.map((test) => (
            <Panel id={test.id} key={test.id}>
              <DetailTest test={test} />
            </Panel>
          ))}
        </View>
      </CardGrid>
    </Group>
  );
};

export default Tests;
