import PropTypes from "prop-types";
import data from "../../data.json";
import { Fragment, useState } from "react";
import {
  CardGrid,
  Tappable,
  Group,
  Text,
  Title,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  View,
} from "@vkontakte/vkui";
import DetailCard from "../pages/DetailCard";

const Categories = () => {
  const [activeSection, setActiveSection] = useState("default");
  return (
    <div>
      <Group>
        <CardGrid size="l">
          <View activePanel={activeSection}>
            <Panel id="default">
              {data.map((category, i) => {
                return (
                  <Fragment key={i}>
                    <Tappable
                      marginHeight="50"
                      onClick={() => setActiveSection(category.section_id)}
                    >
                      <Title level="2">{category.name}</Title>
                      <Text>{category.description}</Text>
                    </Tappable>
                  </Fragment>
                );
              })}
            </Panel>
            {data.map((category, i) => (
              <Panel id={category.section_id} key={i}>
                <DetailCard category={category} />
              </Panel>
            ))}
          </View>
        </CardGrid>
      </Group>
    </div>
  );
};

Categories.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Categories;
