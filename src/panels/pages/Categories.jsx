import PropTypes from "prop-types";
import data from "../../data.json";
import { useState } from "react";
import {
  CardGrid,
  Group,
  Panel,
  ContentCard,
  View,
} from "@vkontakte/vkui";
import mainCard from '../../img/main_picture.png'

import DetailCategory from "./DetailCategory";

const Categories = () => {
  const [activeSection, setActiveSection] = useState("default");
  return (
    <Group>
      <CardGrid size="l">
        <View activePanel={activeSection}>
          <Panel id="default">
          <img className="mx-auto" src={mainCard} />
            {data.map((category, i) => {
              return (
                <ContentCard
                  className="shadow"
                  key={category.section_id}
                  header={category.name}
                  caption={category.description}
                  onClick={() => setActiveSection(category.section_id)}
                />
              );
            })}
          </Panel>
          {data.map((category, i) => (
            <Panel id={category.section_id} key={i}>
              <DetailCategory
                returnBack={() => setActiveSection("default")}
                category={category}
              />
            </Panel>
          ))}
        </View>
      </CardGrid>
    </Group>
  );
};

export default Categories;
