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

import DetailCategory from "./DetailCategory";

const Categories = () => {
  const [activeSection, setActiveSection] = useState("default");
  return (
    <Group>
      <CardGrid size="l">
        <View activePanel={activeSection}>
          <Panel id="default">
            {data.map((category, i) => {
              return (
                <ContentCard
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
              <DetailCategory returnBack={() => setActiveSection('default')} category={category} />
            </Panel>
          ))}
        </View>
      </CardGrid>
    </Group>
  );
};

export default Categories;
